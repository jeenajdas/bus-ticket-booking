package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bus_route_id", nullable = false)
    private BusRoute busRoute;

    private LocalDate tripDate;

    private boolean isCancelled = false;

    public Trip() {}

    // Getters
    public Long getId() { return id; }
    public BusRoute getBusRoute() { return busRoute; }
    public LocalDate getTripDate() { return tripDate; }
    public boolean isCancelled() { return isCancelled; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setBusRoute(BusRoute busRoute) { this.busRoute = busRoute; }
    public void setTripDate(LocalDate tripDate) { this.tripDate = tripDate; }
    public void setCancelled(boolean cancelled) { this.isCancelled = cancelled; }
}