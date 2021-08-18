package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TicketTypeRepository extends JpaRepository<TicketType, String>, JpaSpecificationExecutor<TicketType> {

}