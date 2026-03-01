package com.example.demo.dto.booking;

import com.example.demo.model.Booking;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class BookingResponseDTO {

    private Long id;

    private String userName;
    private String userEmail;

    private String busName;
    private String startLocation;
    private String endLocation;

    private LocalDate travelDate;
    private LocalDateTime departureTime;

    private double amount;
    private List<String> seatNumbers;

    private String status;

    // Custom constructor
    public BookingResponseDTO(Booking booking) {

        this.id = booking.getId();

        // User info
        if (booking.getUser() != null) {
            this.userName = booking.getUser().getName();
            this.userEmail = booking.getUser().getEmail();
        }

        // Trip info (🔥 IMPORTANT)
        if (booking.getTrip() != null) {
            this.travelDate = booking.getTrip().getTripDate();

            if (booking.getTrip().getBusRoute() != null) {
                this.busName = booking.getTrip().getBusRoute().getBusName();
                this.startLocation = booking.getTrip().getBusRoute().getStartLocation();
                this.endLocation = booking.getTrip().getBusRoute().getEndLocation();
                this.departureTime = booking.getTrip().getBusRoute().getStartDateTime();
            }
        }

        // Booking info
        this.amount = booking.getTotalFare();
        this.seatNumbers = booking.getSeatNumbers();

        this.status = booking.getStatus() != null
                ? booking.getStatus().name()
                : "PAYMENT_PENDING";
    }
}
