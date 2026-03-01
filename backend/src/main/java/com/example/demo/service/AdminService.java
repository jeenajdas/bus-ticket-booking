package com.example.demo.service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Booking;
import com.example.demo.model.BusRoute;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.BusRouteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {

    private final BusRouteRepository busRouteRepository;
    private final BookingRepository bookingRepository;

    public AdminService(BusRouteRepository busRouteRepository,
            BookingRepository bookingRepository) {
        this.busRouteRepository = busRouteRepository;
        this.bookingRepository = bookingRepository;
    }

    // Add a new bus route
    public BusRoute addBusRoute(BusRoute busRoute) {
        return busRouteRepository.save(busRoute);
    }

    // Update existing bus route
    public BusRoute updateBusRoute(Long id, BusRoute updatedBusRoute) {

        BusRoute route = busRouteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus route not found with id: " + id));

        route.setStartLocation(updatedBusRoute.getStartLocation());
        route.setEndLocation(updatedBusRoute.getEndLocation());
        route.setStartDateTime(updatedBusRoute.getStartDateTime());
        route.setEndDateTime(updatedBusRoute.getEndDateTime());
        route.setAvailableSeats(updatedBusRoute.getAvailableSeats());
        route.setFare(updatedBusRoute.getFare());
        route.setBusName(updatedBusRoute.getBusName());
        route.setBusType(updatedBusRoute.getBusType());
        route.setSeatType(updatedBusRoute.getSeatType());
        route.setActive(updatedBusRoute.isActive());
        route.setFrequency(updatedBusRoute.getFrequency());
        route.setRecurringStartDate(updatedBusRoute.getRecurringStartDate());
        route.setRecurringEndDate(updatedBusRoute.getRecurringEndDate());

        if (updatedBusRoute.getBoardingPoints() != null) {
            route.setBoardingPoints(updatedBusRoute.getBoardingPoints());
        }

        if (updatedBusRoute.getDroppingPoints() != null) {
            route.setDroppingPoints(updatedBusRoute.getDroppingPoints());
        }

        return busRouteRepository.save(route);
    }

    // Delete bus route
    public void deleteBusRoute(Long id) {

        if (!busRouteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Bus route not found with id: " + id);
        }

        busRouteRepository.deleteById(id);
    }

    // Disable bus route
    public BusRoute disableBusRoute(Long id) {

        BusRoute route = busRouteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus route not found with id: " + id));

        route.setActive(false);
        return busRouteRepository.save(route);
    }

    // Toggle bus route status
    public BusRoute toggleBusRouteStatus(Long id) {

        BusRoute route = busRouteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus route not found with id: " + id));

        route.setActive(!route.isActive());
        return busRouteRepository.save(route);
    }

    // Dashboard Stats
    public long getTotalBuses() {
        return busRouteRepository.count();
    }

    public long getTotalBookings() {
        return bookingRepository.count();
    }

    @Transactional(readOnly = true)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAllWithDetails();
    }

    // Reports
    public double getTotalCollection() {
        return busRouteRepository.findAll().stream()
                .mapToDouble(route -> route.getFare() * route.getAvailableSeats())
                .sum();
    }

    public double getBusCollection(Long id) {

        BusRoute route = busRouteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus route not found with id: " + id));

        return route.getFare() * route.getAvailableSeats();
    }
}
