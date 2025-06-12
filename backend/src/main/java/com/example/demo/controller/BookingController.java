package com.example.demo.controller;

import com.example.demo.dto.BookingDTO;
import com.example.demo.model.Booking;
import com.example.demo.model.User;
import com.example.demo.repository.BookingRepository;
import com.example.demo.service.BookingService;
import com.example.demo.service.EmailService;
import com.example.demo.service.PDFGeneratorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings") // Base URL for all booking-related APIs
public class BookingController {

    private final BookingService bookingService;
    private final EmailService emailService;
    private final PDFGeneratorService pdfGeneratorService;
    @Autowired
   

    // Constructor-based dependency injection for required services
    public BookingController(BookingService bookingService, EmailService emailService, PDFGeneratorService pdfGeneratorService) {
        this.bookingService = bookingService;
        this.emailService = emailService;
        this.pdfGeneratorService = pdfGeneratorService;
    }

    /**
     * Endpoint to book a bus ticket.
     * It extracts the authenticated user from SecurityContext, retrieves the user details,
     * validates the request parameters, and books a ticket.
     * 
     * @param bookingRequest - A JSON object containing "routeId" and "seats".
     * @return ResponseEntity containing booking details or an error message.
     */
    @PostMapping("/book")
    public ResponseEntity<?> bookTicket(@RequestBody Map<String, Object> bookingRequest) {
        try {
            // Get authentication details from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized: No authenticated user found."));
            }

            // Ensure the authenticated principal is a valid UserDetails object
            Object principal = authentication.getPrincipal();
            if (!(principal instanceof UserDetails)) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized: Invalid authentication details."));
            }

            // Retrieve the username (email) from authenticated user
            String username = ((UserDetails) principal).getUsername();
            User user = bookingService.getUserByUsername(username); // Get full User object from the service

            // Validate request body to ensure it contains the required fields
            if (!bookingRequest.containsKey("routeId") || !bookingRequest.containsKey("seats")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields: routeId or seats."));
            }

            // Extract booking details from request
            Long routeId = Long.valueOf(bookingRequest.get("routeId").toString());
            List<String> selectedSeats = (List<String>) bookingRequest.get("selectedSeats");
            int seats = selectedSeats.size();

            // Book the ticket and get the Booking object
            Booking booking = bookingService.bookTicket(user, routeId, seats, selectedSeats);
 // Pass User instead of just userId

            // Send email confirmation with booking details
            emailService.sendBookingConfirmation(user.getEmail(), String.valueOf(booking.getId()),
                    "Route: " + booking.getBusRoute().getBusName() + ", Seats: " + seats);

            // Return booking confirmation details in response
            return ResponseEntity.ok(new BookingDTO(booking));
        } catch (Exception e) {
            // Handle unexpected errors
            return ResponseEntity.status(500).body(Map.of("error", "An unexpected error occurred."));
        }
    }

    /**
     * Endpoint to retrieve all past bookings for a given user.
     * 
     * @param userId - ID of the user whose bookings need to be fetched.
     * @return List of BookingDTOs or a 204 No Content response if no bookings are found.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<List<BookingDTO>> getUserBookings(@PathVariable Long userId) {
        List<BookingDTO> bookings = bookingService.getUserBookings(userId);
        return bookings.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(bookings);
    }

    /**
     * Endpoint to generate and download a bus ticket in PDF format.
     * The ticket contains booking details and a QR code.
     * 
     * @param bookingId - ID of the booking whose ticket needs to be downloaded.
     * @return A ResponseEntity containing the PDF file as a byte array.
     */
    @GetMapping("/download-ticket/{bookingId}")
    public ResponseEntity<byte[]> downloadTicket(@PathVariable Long bookingId) {
        // Generate the ticket PDF as a byte array
        byte[] pdfBytes = pdfGeneratorService.generateTicketPDF(bookingService.getBookingById(bookingId));

        // Return the generated PDF as a downloadable file
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ticket_" + bookingId + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
    @GetMapping("/booked-seats")
    public ResponseEntity<List<String>> getBookedSeats(
            @RequestParam Long busId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

    	List<String> bookedSeats = bookingService.getBookedSeatsForBusAndDate(busId, date);

        return ResponseEntity.ok(bookedSeats);
    }
    
}
