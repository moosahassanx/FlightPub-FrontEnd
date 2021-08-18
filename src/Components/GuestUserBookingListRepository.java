/*
    UserRepository.java
        - Extends JPARepo and allows access to the DB
*/

package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.GuestUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface GuestUserBookingListRepository extends JpaRepository<GuestUser, Long>, JpaSpecificationExecutor<GuestUser> {

    @Query(value = "INSERT INTO guest_user_account_booking_list " +
            "(guest_user_id, booking_list_book_id, booking_list_flight_airline_code, booking_list_flight_departure_time, booking_list_flight_flight_number) " +
            "OUTPUT Inserted.guest_user_id " +
            "VALUES (?1, ?2, ?3, CAST(?4 AS DATETIME2), ?5)", nativeQuery = true)
    int updateGuestBookingList(int guestUserId, int bookingId, String flightAirlineCode, String flightDepTime, String flightFlightNumber);



}