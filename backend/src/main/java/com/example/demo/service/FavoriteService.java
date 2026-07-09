package com.example.demo.service;

import com.example.demo.model.FavoriteMedicine;
import com.example.demo.model.Medicine;
import com.example.demo.model.User;
import com.example.demo.repository.FavoriteMedicineRepository;
import com.example.demo.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteMedicineRepository favoriteRepository;
    private final MedicineRepository medicineRepository;

    public List<FavoriteMedicine> getFavoritesByUser(User user) {
        return favoriteRepository.findByUser(user);
    }

    public FavoriteMedicine addFavorite(Long medicineId, User user) {

        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() ->
                        new RuntimeException("Medicine not found"));

        if (favoriteRepository
                .findByUserAndMedicine(user, medicine)
                .isPresent()) {
            throw new RuntimeException("Already in favorites");
        }

        FavoriteMedicine favorite = FavoriteMedicine.builder()
                .user(user)
                .medicine(medicine)
                .build();

        return favoriteRepository.save(favorite);
    }

    public void removeFavorite(Long id) {
        favoriteRepository.deleteById(id);
    }
}