package com.example.demo.repository;

import com.example.demo.model.FavoriteMedicine;
import com.example.demo.model.Medicine;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteMedicineRepository extends JpaRepository<FavoriteMedicine, Long> {

    List<FavoriteMedicine> findByUser(User user);

    Optional<FavoriteMedicine> findByUserAndMedicine(User user, Medicine medicine);
}