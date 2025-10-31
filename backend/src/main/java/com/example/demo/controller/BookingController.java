package com.example.demo.controller;

import com.example.demo.dto.BookingDTO;
import com.example.demo.dto.BookingRequestDTO;
import com.example.demo.model.Booking;
import com.example.demo.model.User;
import com.example.demo.service.BookingService;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import com.example.demo.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final EmailService emailService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public BookingController(
            BookingService bookingService,
            EmailService emailService,
            UserService userService,
            JwtUtil jwtUtil) {
        this.bookingService = bookingService;
        this.emailService = emailService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookTicket(@RequestBody Map<String, Object> bookingRequest) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized: No authenticated user found."));
            }

            Object principal = authentication.getPrincipal();
            if (!(principal instanceof UserDetails)) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized: Invalid authentication details."));
            }

            String username = ((UserDetails) principal).getUsername();
            User user = bookingService.getUserByUsername(username);

            if (!bookingRequest.containsKey("routeId") || !bookingRequest.containsKey("seats")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields: routeId or seats."));
            }

            Long routeId = Long.valueOf(bookingRequest.get("routeId").toString());
            List<String> selectedSeats = (List<String>) bookingRequest.get("selectedSeats");
            int seats = selectedSeats.size();

            Booking booking = bookingService.bookTicket(user, routeId, seats, selectedSeats);

            emailService.sendBookingConfirmation(user.getEmail(), String.valueOf(booking.getId()),
                    "Route: " + booking.getBusRoute().getBusName() + ", Seats: " + seats);

            return ResponseEntity.ok(new BookingDTO(booking));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "An unexpected error occurred."));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<BookingDTO>> getUserBookings(@PathVariable Long userId) {
        List<BookingDTO> bookings = bookingService.getUserBookings(userId);
        return bookings.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/view/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long bookingId) {
        Booking booking = bookingService.getBookingById(bookingId);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new BookingDTO(booking));
    }


    @GetMapping("/my")
    public ResponseEntity<?> getMyBookings(@RequestHeader("Authorization") String token) {
        String email = jwtUtil.extractEmail(token.substring(7));
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<BookingDTO> bookings = bookingService.getUserBookings(user.getId());
        return bookings.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(bookings);
    }

    @GetMapping("/booked-seats")
    public ResponseEntity<List<String>> getBookedSeats(
            @RequestParam Long busId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<String> bookedSeats = bookingService.getBookedSeatsForBusAndDate(busId, date);
        return ResponseEntity.ok(bookedSeats);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequestDTO request, @RequestHeader("Authorization") String token) {
        String email = jwtUtil.extractEmail(token.substring(7));
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingService.createBooking(user.getId(), request);
        return ResponseEntity.ok(new BookingDTO(booking));
    }
}
