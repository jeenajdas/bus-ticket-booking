package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final BusRouteRepository busRouteRepository;

    public TripService(TripRepository tripRepository,
            BusRouteRepository busRouteRepository) {

        this.tripRepository = tripRepository;
        this.busRouteRepository = busRouteRepository;
    }

    public Trip getOrCreateTrip(Long busRouteId, LocalDate date) {

        return tripRepository
                .findByBusRouteIdAndTripDate(busRouteId, date)
                .orElseGet(() -> {

                    BusRoute route = busRouteRepository.findById(busRouteId)
                            .orElseThrow(() -> new RuntimeException("Bus route not found"));

                    Trip trip = new Trip();
                    trip.setBusRoute(route);
                    trip.setTripDate(date);
                    trip.setCancelled(false);

                    return tripRepository.save(trip);
                });
    }
}