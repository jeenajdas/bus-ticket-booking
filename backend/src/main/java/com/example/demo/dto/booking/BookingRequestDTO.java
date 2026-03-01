package com.example.demo.dto.booking;

import com.example.demo.model.PassengerInfo;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class BookingRequestDTO {

    private Long busId;
    private LocalDate travelDate;
    private List<String> seatNumbers;
    private List<PassengerInfo> passengers;
    private double totalFare;

}
