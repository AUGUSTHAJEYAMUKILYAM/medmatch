package com.example.demo.controller;

import com.example.demo.model.Prescription;
import com.example.demo.model.User;
import com.example.demo.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService service;

    @GetMapping
    public ResponseEntity<List<Prescription>> getPrescriptions(
            @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(
                service.getPrescriptionsByUser(user));
    }

    @PostMapping
    public ResponseEntity<Prescription> savePrescription(
            @RequestParam String fileUrl,
            @RequestParam String notes,
            @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(
                service.savePrescription(fileUrl, notes, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(
            @PathVariable Long id) {

        service.deletePrescription(id);
        return ResponseEntity.noContent().build();
    }
}