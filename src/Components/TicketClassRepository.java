package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.TicketClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TicketClassRepository extends JpaRepository<TicketClass, String>, JpaSpecificationExecutor<TicketClass> {

}