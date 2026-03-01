package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startLocation;
    private String endLocation;

    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;

    private LocalDate recurringStartDate;
    private LocalDate recurringEndDate;

    @Enumerated(EnumType.STRING)
    private Frequency frequency;

    private int availableSeats;
    private double fare;

    private boolean isActive = true;

    private String seatType;
    private String busType;
    private String busName;

    @ElementCollection
    private List<String> boardingPoints;

    @ElementCollection
    private List<String> droppingPoints;
}
