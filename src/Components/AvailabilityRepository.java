package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, String>, JpaSpecificationExecutor<Availability> {
//datediff(day, cast(Availability.departure_time as datetime)
    @Query(value = "SELECT * " +
            "FROM Availability " +
            "WHERE Availability.flight_number = ?2 " +
            "AND datediff(day, Availability.departure_time, ?1) = 0 " +
            "AND Availability.number_available_seats_leg1 >= ?3 " +
            "AND (Availability.number_available_seats_leg2 >= ?3 OR Availability.number_available_seats_leg2 IS NULL) " +
            "AND availability.class_code = ?4", nativeQuery = true)
     List<Availability> findFlightsAvailability(String depTime , String flightNumber, int seats, String classCode);


    @Query(value = "UPDATE availability " +
            "SET availability.number_available_seats_leg1 = availability.number_available_seats_leg1 - 1, " +
            "availability.number_available_seats_leg2 = availability.number_available_seats_leg2 - 1 " +
            "OUTPUT Inserted.number_available_seats_leg1 " +
            "where availability.airline_code = ?1 "+
            "AND availability.flight_number = ?2 " +
            "AND availability.departure_time = ?3 "+
            "AND availability.class_code = ?4 "+
            "AND availability.ticket_code = ?5", nativeQuery = true)
    void updateAvailability(String airlineCode, String flightNumber, String flightDepTime, String classCode, String ticketCode);
}