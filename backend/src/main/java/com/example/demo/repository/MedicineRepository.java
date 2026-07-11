package com.example.demo.repository;

import com.example.demo.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(
            String name,
            String genericName
    );

    @Query("SELECT m FROM Medicine m WHERE m.inStock = true")
    List<Medicine> findAvailableMedicines();
}