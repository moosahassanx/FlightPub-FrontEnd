/*
    FlightRepository.java
        - Extends JPARepo and allows access to DB
*/

package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.Flights;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlightsRepository extends JpaRepository<Flights, String>, JpaSpecificationExecutor<Flights> {

    // returns a list of the flights that match the destination code
    // that gets passed in from the user, can easily add date restriction after the query
    @Query(value = "SELECT * " +
            "from flights " +
            "JOIN (select destinations.destination_code " +
            "FROM destinations " +
            "WHERE destination_code = ?1) " +
            "as ref on ref.destination_code=flights.destination_code " +
            " WHERE flights.departure_time between ?2 AND ?3", nativeQuery = true)
    List<Flights> getTrendingFlights(String code, String firstDate, String secondDate);
//    total_price, price.airline_code, price.flight_number, Departure_Time, arrival_time, departure_code, destination_code, price.ticket_code

//    "SELECT * " +
//            "FROM flights " +
//            "JOIN price " +
//            "ON flights.flight_number = price.flight_number " +
//            "WHERE flights.departure_Code = ?1 " +
//            "AND flights.destination_Code = ?2 " +
//            "AND datediff(day, flights.departure_time, ?3) = 0"

    @Query(value = "SELECT * " +
                    "FROM flights " +
                    "WHERE flights.departure_Code = ?1 " +
                    "AND flights.destination_Code = ?2 " +
                    "AND datediff(day, flights.departure_time, ?3) = 0", nativeQuery = true)
    List<Flights> findFlights(String from, String to, String date);
//    List<String> searchFlightByDestinationAndDates(String depart, String arrival,
//                                                   String departDate, String arriveDate);
    @Query(value = "SELECT TOP 1 * " +
                    "FROM flights " +
                    "WHERE airline_code = ?1 " +
                    "AND destination_Code = ?2 " +
                    "AND departure_time BETWEEN ?3 AND ?4", nativeQuery = true)
    List<Flights> findFlight(String airline_code, String destination_code, String date_from, String date_to);
    
    
    @Query(value = "SELECT TOP 1 flight_number " +
                    "FROM flights " +
                    "WHERE airline_code = ?1 " +
                    "AND destination_Code = ?2 " +
                    "AND departure_time BETWEEN ?3 AND ?4", nativeQuery = true)
    String findFlightNumber(String airline_code, String destination_code, String date_from, String date_to);
}
