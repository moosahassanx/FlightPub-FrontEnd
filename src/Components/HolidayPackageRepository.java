/*
    HolidayPackageRepository.java
        - Extends JPARepo allows access to DB
*/

package com.seng3150.flightpub.repository;

import com.seng3150.flightpub.models.HolidayPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HolidayPackageRepository extends JpaRepository<HolidayPackage, String>, JpaSpecificationExecutor<HolidayPackage> {

    // Selects all holiday packages
    @Query(value = "SELECT * FROM holiday_package ", nativeQuery = true)
    List<HolidayPackage> findHolidayPackages();

    // Selects all holiday packages targeted at solo travellers
    @Query(value = "SELECT * FROM holiday_package WHERE target_user = 'solo' ", nativeQuery = true)
    List<HolidayPackage> findSoloHolidayPackages();

    // Selects all holiday packages targeted at family travellers
    @Query(value = "SELECT * FROM holiday_package WHERE target_user = 'family' ", nativeQuery = true)
    List<HolidayPackage> findFamilyHolidayPackages();

    // Selects all holiday packages targeted at senior travellers
    @Query(value = "SELECT * FROM holiday_package WHERE target_user = 'senior' ", nativeQuery = true)
    List<HolidayPackage> findSeniorHolidayPackages();  
    
    // Selects all holiday packages targeted at business travellers
    @Query(value = "SELECT * FROM holiday_package WHERE target_user = 'business' ", nativeQuery = true)
    List<HolidayPackage> findBusinessHolidayPackages(); 

    // Selects all recommended holiday packages
    @Query(value = "SELECT * FROM holiday_package WHERE destination_code = ?1 OR destination_code = ?2 ", nativeQuery = true)
    List<HolidayPackage> findRecommendedHolidayPackages(String rd1, String rd2);

    @Query(value = "SELECT * FROM holiday_package WHERE target_user = 'all' ", nativeQuery = true)
    List<HolidayPackage> findRecommended(); 

}