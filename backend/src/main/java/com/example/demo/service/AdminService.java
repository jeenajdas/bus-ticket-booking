package com.example.demo.service;

import com.example.demo.model.BusRoute;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.BusRouteRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final BusRouteRepository busRouteRepository;
    private final BookingRepository bookingRepository; 

    public AdminService(BusRouteRepository busRouteRepository, BookingRepository bookingRepository) {
        this.busRouteRepository = busRouteRepository;
        this.bookingRepository = bookingRepository;
    }

    // Add a new bus route
    public BusRoute addBusRoute(BusRoute busRoute) {
        return busRouteRepository.save(busRoute);
    }

    // Update an existing bus route
    public Optional<BusRoute> updateBusRoute(Long id, BusRoute updatedBusRoute) {
        return busRouteRepository.findById(id).map(route -> {
            route.setStartLocation(updatedBusRoute.getStartLocation());
            route.setEndLocation(updatedBusRoute.getEndLocation());
            route.setStartDateTime(updatedBusRoute.getStartDateTime());
            route.setEndDateTime(updatedBusRoute.getEndDateTime());
            route.setAvailableSeats(updatedBusRoute.getAvailableSeats());
            route.setFare(updatedBusRoute.getFare());
            route.setBusName(updatedBusRoute.getBusName()); 
            route.setBusType(updatedBusRoute.getBusType());
         // ✅ Update boarding and dropping points correctly
            route.setBoardingPoints(updatedBusRoute.getBoardingPoints() != null ? updatedBusRoute.getBoardingPoints() : route.getBoardingPoints());
            route.setDroppingPoints(updatedBusRoute.getDroppingPoints() != null ? updatedBusRoute.getDroppingPoints() : route.getDroppingPoints());
            return busRouteRepository.save(route);
        });
    }

    // Delete a bus route
    public boolean deleteBusRoute(Long id) {
        if (busRouteRepository.existsById(id)) {
            busRouteRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Disable a bus route
    public Optional<BusRoute> disableBusRoute(Long id) {
        return busRouteRepository.findById(id).map(route -> {
            route.setActive(false);
            return busRouteRepository.save(route);
        });
    }
    
    public Optional<BusRoute> toggleBusRouteStatus(Long id) {
        return busRouteRepository.findById(id).map(route -> {
            route.setActive(!route.isActive());
            return busRouteRepository.save(route);
        });
    }
    public long getTotalBuses() {
        return busRouteRepository.count();
    }

    public long getTotalBookings() {
        return bookingRepository.count();
    }


    // Get total collection from all buses
    public double getTotalCollection() {
        return busRouteRepository.findAll().stream()
                .mapToDouble(route -> route.getFare() * (route.getAvailableSeats()))
                .sum();
    }

    // Get total collection for a specific bus
    public Optional<Double> getBusCollection(Long id) {
        return busRouteRepository.findById(id)
                .map(route -> route.getFare() * (route.getAvailableSeats()));
    }
}
