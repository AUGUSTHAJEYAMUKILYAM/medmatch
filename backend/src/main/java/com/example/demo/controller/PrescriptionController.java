package com.example.demo.controller;

import com.example.demo.model.Prescription;
import com.example.demo.service.PrescriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService service;

    public PrescriptionController(PrescriptionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Prescription> getPrescriptions(
            Authentication authentication) {

        String username = authentication.getName();

        return service.getPrescriptions(username);
    }

    @PostMapping
    public Prescription uploadPrescription(
            @RequestParam("fileUrl") String fileUrl,
            @RequestParam(value = "notes", required = false, defaultValue = "") String notes,
            Authentication authentication) {

        String username = authentication.getName();

        return service.savePrescription(
                fileUrl,
                notes,
                username
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();

        service.deletePrescription(id, username);

        return ResponseEntity.noContent().build();
    }
}