package com.example.demo.repository;

import com.example.demo.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {

    Optional<Trip> findByBusRouteIdAndTripDate(Long busRouteId, LocalDate tripDate);

    List<Trip> findByTripDate(LocalDate tripDate);
}
