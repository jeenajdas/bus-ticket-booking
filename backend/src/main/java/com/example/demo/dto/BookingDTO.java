package com.example.demo.dto;

import com.example.demo.model.Booking;
import com.example.demo.model.BusRoute;

import java.time.LocalDateTime;
import java.util.List;

public class BookingDTO {

    private Long bookingId;
    private String busName;
    private int numberOfSeats;
    private double totalFare;
    private LocalDateTime bookingTime;
    private List<String> seatNumbers;
    private BusRouteDTO busRoute;


    public BookingDTO(Booking booking) {
        this.bookingId = booking.getId();
        this.busName = booking.getBusRoute().getBusName();
        this.numberOfSeats = booking.getNumberOfSeats();
        this.totalFare = booking.getTotalFare();
        this.bookingTime = booking.getBookingTime();
        this.seatNumbers = booking.getSeatNumbers();
    
    

    BusRoute route = booking.getBusRoute();
    this.busRoute = new BusRouteDTO(
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
        route.getDroppingPoints(),
        route.getBoardingPoints()
    );
    }

    // Getters
    public Long getBookingId() {
        return bookingId;
    }

    public String getBusName() {
        return busName;
    }

    public int getNumberOfSeats() {
        return numberOfSeats;
    }

    public double getTotalFare() {
        return totalFare;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public List<String> getSeatNumbers() {
        return seatNumbers;
    }

    // Setters (if needed)
    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public void setBusName(String busName) {
        this.busName = busName;
    }

    public void setNumberOfSeats(int numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }

    public void setTotalFare(double totalFare) {
        this.totalFare = totalFare;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public void setSeatNumbers(List<String> seatNumbers) {
        this.seatNumbers = seatNumbers;
    }
    public BusRouteDTO getBusRoute() {
        return busRoute;
    }

}
