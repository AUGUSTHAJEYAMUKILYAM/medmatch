package com.example.demo.service;

import com.example.demo.model.Prescription;
import com.example.demo.model.User;
import com.example.demo.repository.PrescriptionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(readOnly = true)
    public List<Prescription> getPrescriptions(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + username));

        return prescriptionRepository.findByUser(user);
    }

    @Transactional
    public Prescription savePrescription(
            String fileUrl,
            String notes,
            String username) {

        // Get the EXISTING user from the database
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + username));

        System.out.println(
                "Saving prescription for user: "
                        + user.getUsername()
                        + " | ID: "
                        + user.getId()
        );

        Prescription prescription = new Prescription();

        prescription.setFileUrl(fileUrl);
        prescription.setNotes(notes);
        prescription.setUploadDate(LocalDateTime.now());

        // Attach the existing managed user
        prescription.setUser(user);

        return prescriptionRepository.save(prescription);
    }

    @Transactional
    public void deletePrescription(Long id, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + username));

        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Prescription not found"));

        if (prescription.getUser() == null ||
                !prescription.getUser().getId().equals(user.getId())) {

            throw new RuntimeException(
                    "You are not allowed to delete this prescription"
            );
        }

        prescriptionRepository.delete(prescription);
    }
}