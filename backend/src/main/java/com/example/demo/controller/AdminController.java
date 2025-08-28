package com.example.demo.controller;

import com.example.demo.model.BusRoute;
import com.example.demo.repository.BookingRepository;
import com.example.demo.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final BookingRepository bookingRepository;

    public AdminController(AdminService adminService,BookingRepository bookingRepository) {
        this.adminService = adminService;
        this.bookingRepository = bookingRepository;
    }
    

    // Add a new bus route
    @PostMapping("/bus-routes")
    public ResponseEntity<BusRoute> addBusRoute(@RequestBody BusRoute busRoute) {
        return ResponseEntity.ok(adminService.addBusRoute(busRoute));
    }

    // Update an existing bus route
    @PutMapping("/bus-routes/{id}")
    public ResponseEntity<BusRoute> updateBusRoute(@PathVariable Long id, @RequestBody BusRoute updatedBusRoute) {
        return adminService.updateBusRoute(id, updatedBusRoute)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a bus route
    @DeleteMapping("/bus-routes/{id}")
    public ResponseEntity<String> deleteBusRoute(@PathVariable Long id) {
        return adminService.deleteBusRoute(id)
                ? ResponseEntity.ok("Bus route deleted successfully")
                : ResponseEntity.notFound().build();
    }

    // Disable a bus route
    @PutMapping("/bus-routes/disable/{id}")
    public ResponseEntity<String> disableBusRoute(@PathVariable Long id) {
        return adminService.disableBusRoute(id)
                .map(route -> ResponseEntity.ok("Bus route disabled successfully"))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/bus-routes/toggle/{id}")
    public ResponseEntity<String> toggleBusRoute(@PathVariable Long id) {
        return adminService.toggleBusRouteStatus(id)
                .map(route -> ResponseEntity.ok("Bus route status updated successfully"))
                .orElse(ResponseEntity.notFound().build());
    }


    //  Dashboard: Total Buses
    @GetMapping("/buses")
    public ResponseEntity<Long> getTotalBuses() {
        return ResponseEntity.ok(adminService.getTotalBuses());
    }

    //  Dashboard: Total Bookings
    @GetMapping("/bookings")
    public ResponseEntity<Long> getTotalBookings() {
        return ResponseEntity.ok(adminService.getTotalBookings());
    }

    //  Reports: Total Collection
    @GetMapping("/report/total-collection")
    public ResponseEntity<Double> getTotalCollection() {
        return ResponseEntity.ok(adminService.getTotalCollection());
    }

    //  Reports: Collection by Bus ID
    @GetMapping("/report/collection/{id}")
    public ResponseEntity<Double> getBusCollection(@PathVariable Long id) {
        return adminService.getBusCollection(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
 //  Get all bookings (for Admin to view list)
    @GetMapping("/all-bookings")
    public ResponseEntity<?> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }

}
