package com.example.demo.dto;
import java.time.LocalDateTime;
import java.util.List;

public class BusRouteDTO {
	private Long id;
    private String startLocation;
    private String endLocation;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private double fare;
    private String busType;
    private String seatType;
    private String busName;
    private List<String> boardingPoints;
    private List<String> droppingPoints; // ✅ New Field

    // ✅ Update Constructor
    public BusRouteDTO(Long id, String startLocation, String endLocation, LocalDateTime startDateTime,
                       LocalDateTime endDateTime, double fare, String busType, String seatType,
                       String busName, List<String> boardingPoints, List<String> droppingPoints) {
        this.id = id;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.fare = fare;
        this.busType = busType;
        this.seatType = seatType;
        this.busName = busName;
        this.boardingPoints = boardingPoints;
        this.droppingPoints = droppingPoints;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStartLocation() { return startLocation; }
    public void setStartLocation(String startLocation) { this.startLocation = startLocation; }

    public String getEndLocation() { return endLocation; }
    public void setEndLocation(String endLocation) { this.endLocation = endLocation; }

    public LocalDateTime getStartDateTime() { return startDateTime; }
    public void setStartDateTime(LocalDateTime startDateTime) { this.startDateTime = startDateTime; }

    public LocalDateTime getEndDateTime() { return endDateTime; }
    public void setEndDateTime(LocalDateTime endDateTime) { this.endDateTime = endDateTime; }

    public double getFare() { return fare; }
    public void setFare(double fare) { this.fare = fare; }

    public String getBusType() { return busType; }
    public void setBusType(String busType) { this.busType = busType; }

    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }

    public String getBusName() { return busName; }
    public void setBusName(String busName) { this.busName = busName; }

    public List<String> getBoardingPoints() { return boardingPoints; }
    public void setBoardingPoints(List<String> boardingPoints) { this.boardingPoints = boardingPoints; }
    
    public List<String> getDroppingPoints() { return droppingPoints; }
    public void setDroppingPoints(List<String> droppingPoints) { this.droppingPoints = droppingPoints; }
    
    
    
    }


