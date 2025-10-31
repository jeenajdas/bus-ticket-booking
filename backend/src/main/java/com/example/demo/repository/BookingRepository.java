package com.example.demo.repository;

import com.example.demo.model.Booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    @Query("SELECT s FROM Booking b JOIN b.seatNumbers s WHERE b.busRoute.id = :busId AND DATE(b.bookingTime) = :date")
    List<String> findBookedSeatsByBusRouteAndDate(@Param("busId") Long busId, @Param("date") LocalDate date);
}

