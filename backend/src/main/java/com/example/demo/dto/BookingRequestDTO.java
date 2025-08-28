// BookingRequestDTO.java
package com.example.demo.dto;

import com.example.demo.model.PassengerInfo;

import java.util.List;

public class BookingRequestDTO {
    private Long busId;
    private List<String> seatNumbers;
    private List<PassengerInfo> passengers;
    private double totalFare;

    // Getters and setters
    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public List<String> getSeatNumbers() { return seatNumbers; }
    public void setSeatNumbers(List<String> seatNumbers) { this.seatNumbers = seatNumbers; }

    public List<PassengerInfo> getPassengers() { return passengers; }
    public void setPassengers(List<PassengerInfo> passengers) { this.passengers = passengers; }

    public double getTotalFare() { return totalFare; }
    public void setTotalFare(double totalFare) { this.totalFare = totalFare; }
}
