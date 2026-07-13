package com.example.demo.service;

import com.example.demo.model.FavoriteMedicine;
import com.example.demo.model.Medicine;
import com.example.demo.model.User;
import com.example.demo.repository.FavoriteMedicineRepository;
import com.example.demo.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteMedicineRepository repository;
    private final MedicineRepository medicineRepository;

    public FavoriteService(FavoriteMedicineRepository repository,
                           MedicineRepository medicineRepository) {
        this.repository = repository;
        this.medicineRepository = medicineRepository;
    }

    public List<FavoriteMedicine> getFavoritesByUser(User user) {
        return repository.findByUser(user);
    }

    public FavoriteMedicine addFavorite(Long medicineId, User user) {

        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        if (repository.findByUserAndMedicine(user, medicine).isPresent()) {
            throw new RuntimeException("Already in favorites");
        }

        FavoriteMedicine favorite = new FavoriteMedicine();
        favorite.setUser(user);
        favorite.setMedicine(medicine);

        return repository.save(favorite);
    }

    public void removeFavorite(Long id) {
        repository.deleteById(id);
    }
}