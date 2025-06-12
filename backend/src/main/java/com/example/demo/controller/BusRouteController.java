package com.example.demo.controller;

import com.example.demo.dto.BusRouteDTO;
import com.example.demo.model.BusRoute;
import com.example.demo.repository.BusRouteRepository;
import com.example.demo.service.BusRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/bus-routes")
public class BusRouteController {

    @Autowired
    private BusRouteService busRouteService;
    @Autowired
    private BusRouteRepository busRouteRepository;

    // ✅ Get all active bus routes
    @GetMapping("/active")
    public List<BusRouteDTO> getActiveBusRoutes() {
        return busRouteService.getAllActiveRoutes();
    }

    // ✅ New grouped search: selected date + next 2 days
    @GetMapping("/search")
    public ResponseEntity<Map<LocalDate, List<BusRouteDTO>>> searchGroupedRoutes(
            @RequestParam String startLocation,
            @RequestParam String endLocation,
            @RequestParam(required = false) String departureTime
    ) {
        LocalDateTime depTime;

        try {
            depTime = (departureTime != null) ? LocalDateTime.parse(departureTime) : LocalDateTime.now();
        } catch (Exception e) {
        	return ResponseEntity.badRequest().body(Map.of()); // Invalid date format
        }

        try {
            Map<LocalDate, List<BusRouteDTO>> result = busRouteService.searchGroupedRoutes(startLocation, endLocation, depTime);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException ex) {
        	return ResponseEntity.badRequest().body(Map.of()); // Past date handling
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<BusRouteDTO> getBusRouteById(@PathVariable Long id) {
        BusRouteDTO dto = busRouteService.getRouteById(id);
        return ResponseEntity.ok(dto);
    }
}
