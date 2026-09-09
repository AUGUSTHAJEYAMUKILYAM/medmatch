package com.example.demo.service;

import com.example.demo.model.Prescription;
import com.example.demo.model.User;
import com.example.demo.repository.PrescriptionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final UserRepository userRepository;

    public PrescriptionService(
            PrescriptionRepository prescriptionRepository,
            UserRepository userRepository) {

        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Prescription savePrescription(
            String fileUrl,
            String notes,
            String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Prescription prescription = new Prescription();

        prescription.setFileUrl(fileUrl);
        prescription.setNotes(notes);

        // Attach the existing database user
        User existingUser = userRepository.getReferenceById(user.getId());
        prescription.setUser(existingUser);

        return prescriptionRepository.save(prescription);
    }

    @Transactional(readOnly = true)
    public List<Prescription> getPrescriptions(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return prescriptionRepository.findByUser(user);
    }

    @Transactional
    public void deletePrescription(Long id) {
        prescriptionRepository.deleteById(id);
    }
}