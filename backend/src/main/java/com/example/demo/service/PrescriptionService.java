package com.example.demo.service;

import com.example.demo.model.Prescription;
import com.example.demo.model.User;
import com.example.demo.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository repository;

    public List<Prescription> getPrescriptionsByUser(User user) {
        return repository.findByUser(user);
    }

    public Prescription savePrescription(
            String fileUrl,
            String notes,
            User user
    ) {

        Prescription prescription = Prescription.builder()
                .fileUrl(fileUrl)
                .notes(notes)
                .uploadDate(LocalDateTime.now())
                .user(user)
                .build();

        return repository.save(prescription);
    }

    public void deletePrescription(Long id) {
        repository.deleteById(id);
    }
}