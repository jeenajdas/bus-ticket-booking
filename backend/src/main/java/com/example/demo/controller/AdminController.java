package com.example.demo.controller;

import com.example.demo.dto.booking.BookingResponseDTO;
import com.example.demo.model.BusRoute;
import com.example.demo.service.AdminService;
import com.example.demo.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final BookingService bookingService;

    public AdminController(AdminService adminService, BookingService bookingService) {
        this.adminService = adminService;
        this.bookingService = bookingService;
    }

    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {
        List<BookingResponseDTO> bookings = adminService.getAllBookings()
                .stream()
                .map(BookingResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/bus-routes")
    public ResponseEntity<BusRoute> addBusRoute(@RequestBody BusRoute busRoute) {
        return ResponseEntity.ok(adminService.addBusRoute(busRoute));
    }

    @PutMapping("/bus-routes/{id}")
    public ResponseEntity<BusRoute> updateBusRoute(
            @PathVariable Long id,
            @RequestBody BusRoute updatedBusRoute) {
        return ResponseEntity.ok(adminService.updateBusRoute(id, updatedBusRoute));
    }

    @DeleteMapping("/bus-routes/{id}")
    public ResponseEntity<String> deleteBusRoute(@PathVariable Long id) {
        adminService.deleteBusRoute(id);
        return ResponseEntity.ok("Bus route deleted successfully");
    }

    @PutMapping("/bus-routes/disable/{id}")
    public ResponseEntity<String> disableBusRoute(@PathVariable Long id) {
        adminService.disableBusRoute(id);
        return ResponseEntity.ok("Bus route disabled successfully");
    }

    // Toggle bus route status

    @PutMapping("/bus-routes/toggle/{id}")
    public ResponseEntity<String> toggleBusRoute(@PathVariable Long id) {
        adminService.toggleBusRouteStatus(id);
        return ResponseEntity.ok("Bus route status updated successfully");
    }

    // Dashboard: Total Buses

    @GetMapping("/buses")
    public ResponseEntity<Long> getTotalBuses() {
        return ResponseEntity.ok(adminService.getTotalBuses());
    }

    // Dashboard: Total Bookings count

    @GetMapping("/bookings")
    public ResponseEntity<Long> getTotalBookings() {
        return ResponseEntity.ok(adminService.getTotalBookings());
    }

    @GetMapping("/report/total-collection")
    public ResponseEntity<Double> getTotalCollection() {
        return ResponseEntity.ok(adminService.getTotalCollection());
    }

    @GetMapping("/report/collection/{id}")
    public ResponseEntity<Double> getBusCollection(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getBusCollection(id));
    }
}