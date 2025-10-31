package com.example.demo.repository;

import com.example.demo.model.BusRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRouteRepository extends JpaRepository<BusRoute, Long> {

    List<BusRoute> findByIsActiveTrue();

    List<BusRoute> findByStartLocationAndEndLocationAndIsActiveTrue(String startLocation, String endLocation);
}
