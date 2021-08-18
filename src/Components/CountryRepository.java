package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CountryRepository extends JpaRepository<Country, String>, JpaSpecificationExecutor<Country> {

}