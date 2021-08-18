/*
    DestinationsRepository.java
        - Extends JPARepo allows access to DB
*/

package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.Destinations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DestinationsRepository extends JpaRepository<Destinations, String>, JpaSpecificationExecutor<Destinations> {

    // getting all of the destinations in the db
    @Query(value = "SELECT * FROM destinations ", nativeQuery = true)
    List<Destinations> findDestinations();

    // Selects the top 10 destinations that have been books more than once
    // Orders by highest to lowers
    // removed "WHERE destinations.times_booked > 0 ORDER BY destinations.times_booked DESC" from query
    @Query(value = "SELECT TOP 10 airport FROM destinations ", nativeQuery = true)
    List<String> findDestinationName();

    @Query(value = "update destinations set destinations.times_booked = destinations.times_booked + 1 OUTPUT Inserted.times_booked  where destination_code = ?1 ", nativeQuery = true)
    int updateTimesBooked(String whatever);

    // blacklisting or unblacklisting a destination based on administrator user input
    @Query(value = "update destinations set destinations.COVID = ?2 OUTPUT Inserted.times_booked  where destinations.destination_code = ?1 ", nativeQuery = true)
    int changeStatus(String destCode, int trueOrFalse);

    // get top 2 trending 
    @Query(value = "SELECT TOP 2 * FROM destinations ORDER BY times_booked DESC", nativeQuery = true)
    List<Destinations> findTrending();
}
