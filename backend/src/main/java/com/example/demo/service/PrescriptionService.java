package com.example.demo.service;

import com.example.demo.model.Prescription;
import com.example.demo.model.User;
import com.example.demo.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository repository;

    public PrescriptionService(PrescriptionRepository repository) {
        this.repository = repository;
    }

    public List<Prescription> getPrescriptionsByUser(User user) {
        return repository.findByUser(user);
    }

    public Prescription savePrescription(String fileUrl,
                                         String notes,
                                         User user) {

        Prescription prescription = new Prescription();

        prescription.setFileUrl(fileUrl);
        prescription.setNotes(notes);
        prescription.setUploadDate(LocalDateTime.now());
        prescription.setUser(user);

        return repository.save(prescription);
    }

    public void deletePrescription(Long id) {
        repository.deleteById(id);
    }
}