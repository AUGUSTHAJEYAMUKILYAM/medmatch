package com.example.demo.repository;

import com.example.demo.model.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {

    List<Pharmacy> findByCityContainingIgnoreCaseOrPincode(
            String city,
            String pincode
    );
}