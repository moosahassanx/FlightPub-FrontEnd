package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.PlaneType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PlaneTypeRepository extends JpaRepository<PlaneType, String>, JpaSpecificationExecutor<PlaneType> {

}