package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface BookingRepository extends JpaRepository<Booking, Long>, JpaSpecificationExecutor<Booking> {



    @Query(value = "INSERT INTO booking " +
            "(booking.flight_number, booking.payment_complete, booking.payment_id, booking.user_id,booking.guest_user_id, booking.airline_code, booking.flight_departure_time, booking.flight_airline_code, booking.flight_flight_number)" +
            "OUTPUT Inserted.book_id " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, CAST(?7 AS DATETIME2), ?8, ?9)", nativeQuery = true)
    int newBooking(String flightNumber, String paymentComplete, int paymentId, int user_id, int guestUserId, String airlineCode, String flightDepTime, String flightAirlineCode, String flightFlightNumber);


    @Query(value = "INSERT INTO booking " +
         "(booking.flight_number, booking.payment_complete, booking.payment_id, booking.user_id, booking.airline_code, booking.flight_departure_time, booking.flight_airline_code, booking.flight_flight_number)" +
         "OUTPUT Inserted.book_id " +
         "VALUES (?1, ?2, ?3, ?4, ?5, CAST(?6 AS DATETIME2), ?7, ?8)", nativeQuery = true)
    int addRejestedBooking(String flightNumber, String paymentComplete, int paymentId, int userId, String airlineCode, String flightAirlineCode, String flightDepTime, String flightFlightnumber);

    @Query(value = "INSERT INTO booking " +
            "(booking.flight_number, booking.payment_complete, booking.payment_id, booking.guest_user_id, booking.airline_code, booking.flight_departure_time, booking.flight_airline_code, booking.flight_flight_number)" +
            "OUTPUT Inserted.book_id " +
            "VALUES (?1, ?2, ?3, ?4, ?5, CAST(?6 AS DATETIME2), ?7, ?8)", nativeQuery = true)
    int makeGBooking(String flightNumber, String paymentComplete, int paymentId, int guestUserId, String airlineCode, String flightDepTime, String flightAirlineCode, String flightFlightNumber);

    @Query(value = "INSERT INTO booking (flight_number, payment_complete, user_id, airline_code, flight_departure_time, flight_airline_code, flight_flight_number) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)", nativeQuery = true)
    int makeNewBooking(String flight_number, String payment_complete, int userId, String airline_code, String flight_departure_time, String flight_airline_code, String flight_flight_number);
}
