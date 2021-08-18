package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.Distances;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DistancesRepository extends JpaRepository<Distances, String>, JpaSpecificationExecutor<Distances> {

}