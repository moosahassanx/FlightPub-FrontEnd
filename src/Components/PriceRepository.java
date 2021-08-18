package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PriceRepository extends JpaRepository<Price, String>, JpaSpecificationExecutor<Price> {
//    "AND  CAST(?2 as datetime) BETWEEN start_date AND end_date"
    //add class check so the lowest price for the selected class is displayed
    //try to fix the airline code to stop it from displaying null
    @Query(value=   "SELECT min(total_price) " +
                    "FROM price "+
                    "WHERE flight_number = ?1 " +
                    "AND class_code = ?2 " +
                    "AND  CAST(?3 AS DATETIME2) BETWEEN start_date AND end_date", nativeQuery = true)
    double getLowPrice(String flightNum, String classCode, String dates);

    @Query(value= "SELECT * " +
            "FROM price "+
            "WHERE flight_number = ?1 " +
            "AND class_code = ?2 " +
            "AND  CAST(?3 AS DATETIME2) BETWEEN start_date AND end_date", nativeQuery = true)
    List<Price> getTicketPrice(String newFlightNum, String newClassCode, String newDates);
}
