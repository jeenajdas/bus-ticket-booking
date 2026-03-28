package com.example.demo.service;

import com.example.demo.dto.booking.BookingResponseDTO;
import com.example.demo.dto.booking.BookingRequestDTO;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.*;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.BusRouteRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.model.BookingStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BusRouteRepository busRouteRepository;
    private final TripService tripService;
    private final EmailService emailService;

    public BookingService(BookingRepository bookingRepository,
            UserRepository userRepository,
            BusRouteRepository busRouteRepository,
            TripService tripService,
            EmailService emailService) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.busRouteRepository = busRouteRepository;
        this.tripService = tripService;
        this.emailService = emailService;
    }

    // CREATE BOOKING (Confirmed directly)
    public BookingResponseDTO createBooking(Long userId, BookingRequestDTO request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        BusRoute busRoute = busRouteRepository.findById(request.getBusId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus route not found"));

        if (!busRoute.isActive()) {
            throw new BadRequestException("Bus route is inactive");
        }

        LocalDate travelDate = request.getTravelDate();

        Trip trip = tripService.getOrCreateTrip(busRoute.getId(), travelDate);

        // Check if any selected seat is already booked
        List<String> alreadyBookedSeats = bookingRepository.findBookedSeatsByTripId(trip.getId());

        for (String seat : request.getSeatNumbers()) {
            if (alreadyBookedSeats.contains(seat)) {
                throw new BadRequestException("Seat already booked: " + seat);
            }
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBusRoute(busRoute);
        booking.setTrip(trip);
        booking.setNumberOfSeats(request.getSeatNumbers().size());
        booking.setSeatNumbers(request.getSeatNumbers());
        booking.setPassengers(request.getPassengers());
        booking.setTotalFare(request.getTotalFare());
        booking.setStatus(BookingStatus.CONFIRMED);

        bookingRepository.save(booking);

        // Send confirmation email
        String details = "Bus: " + busRoute.getBusName()
                + ", Date: " + trip.getTripDate()
                + ", Seats: " + booking.getSeatNumbers()
                + ", Total Fare: ₹" + booking.getTotalFare();

        emailService.sendBookingConfirmation(
                user.getEmail(),
                String.valueOf(booking.getId()),
                details);

        return new BookingResponseDTO(booking);
    }

    // GET BOOKED SEATS
    public List<String> getBookedSeatsForTrip(Long busId, LocalDate date) {
        Trip trip = tripService.getOrCreateTrip(busId, date);
        return bookingRepository.findBookedSeatsByTripId(trip.getId());
    }

    // GET USER BOOKINGS
    public List<BookingResponseDTO> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(BookingResponseDTO::new)
                .toList();
    }

    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }
}