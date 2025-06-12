// ✅ Updated BusRouteService.java

package com.example.demo.service;

import com.example.demo.dto.BusRouteDTO;
import com.example.demo.model.BusRoute;
import com.example.demo.repository.BusRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BusRouteService {

    @Autowired
    private BusRouteRepository busRouteRepository;
    
    public List<BusRouteDTO> getAllActiveRoutes() {
        List<BusRoute> routes = busRouteRepository.findByIsActiveTrue();
        return routes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Map<LocalDate, List<BusRouteDTO>> searchGroupedRoutes(String startLocation, String endLocation, LocalDateTime departureTime) {
        if (departureTime.toLocalDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Cannot search for buses in the past.");
        }

        List<BusRoute> allRoutes = busRouteRepository.findByStartLocationAndEndLocationAndIsActiveTrue(startLocation, endLocation);

        Map<LocalDate, List<BusRouteDTO>> grouped = new LinkedHashMap<>();
        LocalDate selected = departureTime.toLocalDate();

        for (int i = 0; i <= 2; i++) {
            LocalDate date = selected.plusDays(i);
            List<BusRouteDTO> dayRoutes = allRoutes.stream()
                    .filter(r -> r.getStartDateTime().toLocalDate().equals(date))
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            if (!dayRoutes.isEmpty()) grouped.put(date, dayRoutes);
        }

        return grouped;
    }
    
    public BusRouteDTO getRouteById(Long id) {
        BusRoute busRoute = busRouteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Bus not found"));
        return convertToDTO(busRoute);
    }

    private BusRouteDTO convertToDTO(BusRoute busRoute) {
        return new BusRouteDTO(
                busRoute.getId(),
                busRoute.getStartLocation(),
                busRoute.getEndLocation(),
                busRoute.getStartDateTime(),
                busRoute.getEndDateTime(),
                busRoute.getFare(),
                busRoute.getBusType(),
                busRoute.getSeatType(),
                busRoute.getBusName(),
                busRoute.getBoardingPoints(),
                busRoute.getDroppingPoints()
        );
    }
}
