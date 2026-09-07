package com.example.demo.controller;

import com.example.demo.model.Prescription;
import com.example.demo.service.PrescriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService service;

    public PrescriptionController(PrescriptionService service) {
        this.service = service;
    }

    @PostMapping
    public Prescription uploadPrescription(
            @RequestParam String fileUrl,
            @RequestParam(required = false, defaultValue = "") String notes,
            Authentication authentication) {

        String username = authentication.getName();

        return service.savePrescription(fileUrl, notes, username);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(
            @PathVariable Long id) {

        service.deletePrescription(id);

        return ResponseEntity.noContent().build();
    }
}