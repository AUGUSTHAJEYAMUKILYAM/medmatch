package com.example.demo.service;

import com.example.demo.model.Interaction;
import com.example.demo.model.Medicine;
import com.example.demo.repository.InteractionRepository;
import com.example.demo.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InteractionService {

    private final InteractionRepository repository;
    private final MedicineRepository medicineRepository;

    public InteractionService(InteractionRepository repository,
                              MedicineRepository medicineRepository) {
        this.repository = repository;
        this.medicineRepository = medicineRepository;
    }

    public List<Interaction> checkInteractions(List<Long> medicineIds) {

        List<Medicine> medicines = medicineRepository.findAllById(medicineIds);
        List<Interaction> interactions = new ArrayList<>();

        for (int i = 0; i < medicines.size(); i++) {
            for (int j = i + 1; j < medicines.size(); j++) {

                repository.findInteractionBetween(
                        medicines.get(i),
                        medicines.get(j))
                        .ifPresent(interactions::add);
            }
        }

        return interactions;
    }

    public Interaction saveInteraction(Interaction interaction) {
        return repository.save(interaction);
    }
}