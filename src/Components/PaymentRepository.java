package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepository extends JpaRepository<Payment, Long>, JpaSpecificationExecutor<Payment> {
    @Query(value = "INSERT INTO payment" +
            "(payment.price,payment.user_id) " +
            "OUTPUT Inserted.payment_id " +
            "VALUES (?1, ?2)", nativeQuery = true)
    int makeRPayment(double price, int userId);


    @Query(value = "INSERT INTO payment" +
            "(payment.price,payment.guest_user_id) " +
            "OUTPUT Inserted.payment_id " +
            "VALUES (?1, ?2)", nativeQuery = true)
    int makeGPayment(double price, int guestUserId);
}