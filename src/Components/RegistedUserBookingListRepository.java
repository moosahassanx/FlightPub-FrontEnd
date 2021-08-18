/*
    UserRepository.java
        - Extends JPARepo and allows access to the DB
*/

package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface RegistedUserBookingListRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    @Query(value = "INSERT INTO user_account_booking_list " +
            "(user_id, booking_list_book_id, booking_list_flight_airline_code, booking_list_flight_departure_time, booking_list_flight_flight_number) " +
            "OUTPUT Inserted.user_id " +
            "VALUES (?1, ?2, ?3, CAST(?4 AS DATETIME2), ?5)", nativeQuery = true)
    int updateRegistedBookingList(int userId, int bookingId, String flightAirlineCode, String flightDepTime, String flightFlightNumber);
}
