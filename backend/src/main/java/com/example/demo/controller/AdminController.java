package com.example.demo.controller;

import com.example.demo.model.BusRoute;

import com.example.demo.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")

public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
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
    
    // Reports: Total Collection
    @GetMapping("/report/total-collection")
    public ResponseEntity<Double> getTotalCollection() {
        return ResponseEntity.ok(adminService.getTotalCollection());
    }
    
    // Reports: Collection by Bus ID
    @GetMapping("/report/collection/{id}")
    public ResponseEntity<Double> getBusCollection(@PathVariable Long id) {
        return adminService.getBusCollection(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
