package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class BusRoute {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startLocation;
    private String endLocation;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private int availableSeats;
    private double fare;
    private boolean isActive = true;
    private String seatType;
    private String busType;
    private String busName;
    
    @ElementCollection  // ✅ Add this annotation to store list of strings
    private List<String> boardingPoints;
    
    @ElementCollection
    private List<String> droppingPoints; // ✅ New Field Added



    // ✅ Explicit Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public void setEndLocation(String endLocation) {
        this.endLocation = endLocation;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getSeatType() {  // ✅ Fixed seatType getter
        return seatType;
    }

    public void setSeatType(String seatType) {  // ✅ Fixed seatType setter
        this.seatType = seatType;
    }

    public String getBusType() {  // ✅ New busType getter
        return busType;
    }

    public void setBusType(String busType) {  // ✅ New busType setter
        this.busType = busType;
    }

    public String getBusName() {
        return busName;
    }

    public void setBusName(String busName) {
        this.busName = busName;
    }
    public List<String> getBoardingPoints() {
        return boardingPoints;
    }

    public void setBoardingPoints(List<String> boardingPoints) {
        this.boardingPoints = boardingPoints;
    }
    public List<String> getDroppingPoints() {
        return droppingPoints;
    }

    public void setDroppingPoints(List<String> droppingPoints) {
        this.droppingPoints = droppingPoints;
    }
}
