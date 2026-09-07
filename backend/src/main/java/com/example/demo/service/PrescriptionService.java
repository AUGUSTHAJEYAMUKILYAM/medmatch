package com.example.demo.service;

import com.example.demo.model.Prescription;
import com.example.demo.model.User;
import com.example.demo.repository.PrescriptionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    // Get prescriptions belonging to the logged-in user
    public List<Prescription> getPrescriptions(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + username));

        return prescriptionRepository.findByUser(user);
    }

    // Save prescription for the logged-in user
    public Prescription savePrescription(
            String fileUrl,
            String notes,
            String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + username));

        // Make sure we are using the existing database user
        if (user.getId() == null) {
            throw new RuntimeException(
                    "User has no database ID: " + username);
        }

        Prescription prescription = new Prescription();

        prescription.setFileUrl(fileUrl);
        prescription.setNotes(notes);
        prescription.setUploadDate(LocalDateTime.now());

        // Attach the existing persisted user
        prescription.setUser(user);

        return prescriptionRepository.save(prescription);
    }

    // Delete only the prescription belonging to the logged-in user
    public void deletePrescription(Long id, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + username));

        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Prescription not found"));

        if (!prescription.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "You are not allowed to delete this prescription");
        }

        prescriptionRepository.delete(prescription);
    }
}