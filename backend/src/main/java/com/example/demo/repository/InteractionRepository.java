package com.example.demo.repository;

import com.example.demo.model.Interaction;
import com.example.demo.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface InteractionRepository extends JpaRepository<Interaction, Long> {

    @Query("""
        SELECT i FROM Interaction i
        WHERE (i.medicineOne = :m1 AND i.medicineTwo = :m2)
           OR (i.medicineOne = :m2 AND i.medicineTwo = :m1)
    """)
    Optional<Interaction> findInteractionBetween(
            @Param("m1") Medicine m1,
            @Param("m2") Medicine m2
    );
}