/*
    AirlinesRepository.java
        - Extends JPARepo and allows access to the DB
*/

package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.Airlines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AirlinesRepository extends JpaRepository<Airlines, String>, JpaSpecificationExecutor<Airlines> {

    // getting all of the destinations in the db
    @Query(value = "SELECT * FROM airlines ", nativeQuery = true)
    List<Airlines> findAirlines();

    // updating status of if an airlines is sponsored or not depending on the feed parameter airlineCode
    @Modifying
    @Query(value = "UPDATE airlines " +
            " SET airlines.sponsored = ?2 " +
            " WHERE airlines.airline_code = ?1 ", nativeQuery = true)
    void changeStatus(String airlineCode, int trueOrFalse);
}