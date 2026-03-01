package com.example.demo.repository;

import com.example.demo.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    @Query("""
                SELECT s FROM Booking b
                JOIN b.seatNumbers s
                WHERE b.trip.id = :tripId
                AND b.status = com.example.demo.model.BookingStatus.CONFIRMED
            """)
    List<String> findBookedSeatsByTripId(@Param("tripId") Long tripId);

    // fetches all bookings with user, trip, busRoute
    @Query("""
                SELECT b FROM Booking b
                LEFT JOIN FETCH b.user
                LEFT JOIN FETCH b.trip t
                LEFT JOIN FETCH t.busRoute
            """)
    List<Booking> findAllWithDetails();
}