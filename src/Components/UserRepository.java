/*
    UserRepository.java
        - Extends JPARepo and allows access to the DB
*/

package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    @Modifying
    @Query(value = "UPDATE user_account " +
                   "SET password_hash = ?2 " +
                   "WHERE user_name = ?1", nativeQuery = true)
    void updateUserPassword(String user, String password);

    @Modifying
    @Query(value = "UPDATE user_account " +
                   "SET user_name = ?1, " +
                   "first_name = ?2, " +
                   "last_name = ?3, " +
                   "phone_number = ?5, " +
                   "address = ?6 " +
                   "WHERE user_name = ?1", nativeQuery = true)
    void updateUserDetails(String user, String firstName, String lastName, String phoneNumber, String address);

    @Modifying
    @Query(value = "UPDATE user_account " +
            "SET account_type = ?1 " +
            "WHERE user_name = ?2", nativeQuery = true)
    void promoteUser(String newType, String username);

    @Query(value = "SELECT * " +
                   "FROM user_account " +
                   "WHERE user_name = ?1", nativeQuery = true)
    User getDetailsByUserName(String userName);

    @Query(value = "SELECT * " +
            "FROM user_account " +
            "WHERE user_name = ?1", nativeQuery = true)
    List<User> getDetailsByUserName1(String userName);

    @Query(value = "SELECT * " +
            "FROM user_account ", nativeQuery = true)
    List<User> getAllUsers();

    @Query(value = "SELECT * " +
            "FROM user_account " +
            "WHERE user_name = ?1", nativeQuery = true)
    List<User> findByUserNameAndPasswordHash(String userName, String password);

    boolean existsByUserName(String user_name);
    
    @Query(value = "SELECT last_location " +
                   "FROM user_account " +
                   "WHERE id = ?1", nativeQuery = true)
    List<String> getVisitedLocations(int id);


    @Query(value = "UPDATE user_account " +
            "SET last_location = ?1 " +
            "OUTPUT Inserted.ID " +
            "WHERE id = ?2", nativeQuery = true)
    int updateLastLocation(String location, int id);

    @Modifying
    @Query(value = "DELETE FROM user_account " +
            "WHERE user_name = ?1", nativeQuery = true)
    void removeUser(String username);

}
