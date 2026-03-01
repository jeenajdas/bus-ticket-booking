package com.example.demo.service;

import com.example.demo.dto.BusRouteDTO;
import com.example.demo.model.BusRoute;
import com.example.demo.model.Frequency;
import com.example.demo.repository.BusRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class BusRouteService {

    @Autowired
    private BusRouteRepository busRouteRepository;

    // Get all ACTIVE routes
    public List<BusRouteDTO> getAllActiveRoutes() {
        return busRouteRepository.findByIsActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    // Get all routes (Admin)
    public List<BusRouteDTO> getAllRoutes() {
        return busRouteRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    // SEARCH LOGIC (Recurring Support)
    public Map<LocalDate, List<BusRouteDTO>> searchGroupedRoutes(
            String startLocation,
            String endLocation,
            LocalDateTime departureTime) {

        if (departureTime.toLocalDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Cannot search for buses in the past.");
        }

        List<BusRoute> routes = busRouteRepository
                .findByStartLocationAndEndLocationAndIsActiveTrue(
                        startLocation, endLocation);

        Map<LocalDate, List<BusRouteDTO>> grouped = new LinkedHashMap<>();
        LocalDate selectedDate = departureTime.toLocalDate();

        // Show selected date + next 2 days
        for (int i = 0; i <= 2; i++) {

            LocalDate date = selectedDate.plusDays(i);

            List<BusRouteDTO> dayRoutes = routes.stream()
                    .filter(route -> isRouteRunningOnDate(route, date))
                    .map(this::convertToDTO)
                    .toList();

            if (!dayRoutes.isEmpty()) {
                grouped.put(date, dayRoutes);
            }
        }

        return grouped;
    }

    // Core Recurring Logic
    private boolean isRouteRunningOnDate(BusRoute route, LocalDate date) {

        Frequency frequency = route.getFrequency();

        if (frequency == null)
            return false;

        // ONE TIME BUS
        if (frequency == Frequency.ONE_TIME) {
            return route.getStartDateTime() != null &&
                    route.getStartDateTime().toLocalDate().equals(date);
        }

        // Recurring buses need date range
        if (route.getRecurringStartDate() == null ||
                route.getRecurringEndDate() == null) {
            return false;
        }

        boolean withinRange = !date.isBefore(route.getRecurringStartDate()) &&
                !date.isAfter(route.getRecurringEndDate());

        if (!withinRange)
            return false;

        switch (frequency) {

            case DAILY:
                return true;

            case WEEKENDS:
                return date.getDayOfWeek().getValue() >= 6;

            case MONDAY_FRIDAY:
                return date.getDayOfWeek().getValue() <= 5;

            default:
                return false;
        }
    }

    // Get Route By ID
    public BusRouteDTO getRouteById(Long id) {
        BusRoute route = busRouteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bus not found"));
        return convertToDTO(route);
    }

    public BusRouteDTO createRoute(BusRouteDTO dto) {

        BusRoute busRoute = new BusRoute();

        busRoute.setStartLocation(dto.getStartLocation());
        busRoute.setEndLocation(dto.getEndLocation());
        busRoute.setStartDateTime(dto.getStartDateTime());
        busRoute.setEndDateTime(dto.getEndDateTime());
        busRoute.setFare(dto.getFare());
        busRoute.setBusType(dto.getBusType());
        busRoute.setSeatType(dto.getSeatType());
        busRoute.setBusName(dto.getBusName());
        busRoute.setActive(dto.isActive());
        busRoute.setFrequency(dto.getFrequency());
        busRoute.setAvailableSeats(40);

        busRoute.setRecurringStartDate(dto.getRecurringStartDate());
        busRoute.setRecurringEndDate(dto.getRecurringEndDate());
        System.out.println("DTO Start Date: " + dto.getRecurringStartDate());
        System.out.println("DTO End Date: " + dto.getRecurringEndDate());

        BusRoute saved = busRouteRepository.save(busRoute);

        return new BusRouteDTO(saved);
    }

    // Convert Entity -> DTO
    private BusRouteDTO convertToDTO(BusRoute route) {
        return new BusRouteDTO(
                route.getId(),
                route.getStartLocation(),
                route.getEndLocation(),
                route.getStartDateTime(),
                route.getEndDateTime(),
                route.getFare(),
                route.getBusType(),
                route.getSeatType(),
                route.getBusName(),
                route.isActive(),
                route.getBoardingPoints(),
                route.getDroppingPoints(),
                route.getFrequency(),
                route.getRecurringStartDate(),
                route.getRecurringEndDate());
    }
}
