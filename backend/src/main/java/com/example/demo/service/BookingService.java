package com.example.demo.service;

import com.example.demo.dto.BookingDTO;
import com.example.demo.model.Booking;
import com.example.demo.model.BusRoute;
import com.example.demo.model.User;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.BusRouteRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BusRouteRepository busRouteRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, BusRouteRepository busRouteRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.busRouteRepository = busRouteRepository;
    }

    public Booking bookTicket(User user, Long routeId, int numberOfSeats, List<String> seatNumbers)
 {
        if (user == null || routeId == null || numberOfSeats <= 0) {
            throw new IllegalArgumentException("Invalid booking request.");
        }

        BusRoute busRoute = busRouteRepository.findById(routeId)
                .orElseThrow(() -> new RuntimeException("Bus route with ID " + routeId + " not found!"));

        if (!busRoute.isActive()) {
            throw new IllegalArgumentException("Bus route is inactive and cannot be booked.");
        }

        if (busRoute.getAvailableSeats() < numberOfSeats) {
            throw new IllegalArgumentException("Not enough seats available.");
        }

        double totalFare = numberOfSeats * busRoute.getFare();
        Booking booking = new Booking(user, busRoute, numberOfSeats, totalFare, seatNumbers);


        busRoute.setAvailableSeats(busRoute.getAvailableSeats() - numberOfSeats);
        busRouteRepository.save(busRoute);

        return bookingRepository.save(booking);
    }


    public User getUserByUsername(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found!"));
    }

    public List<BookingDTO> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(BookingDTO::new)
                .toList();
    }
 // ✅ New: Get booked seats for a bus on a specific date
    public List<String> getBookedSeatsForBusAndDate(Long busId, LocalDate date) {
        return bookingRepository.findBookedSeatsByBusRouteAndDate(busId, date);
    }
}
