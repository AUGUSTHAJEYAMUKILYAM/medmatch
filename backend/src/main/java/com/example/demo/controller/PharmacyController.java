package com.example.demo.controller;

import com.example.demo.model.Pharmacy;
import com.example.demo.service.PharmacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacies")
@RequiredArgsConstructor
public class PharmacyController {

    private final PharmacyService service;

    @GetMapping
    public ResponseEntity<List<Pharmacy>> getAllPharmacies() {
        return ResponseEntity.ok(service.getAllPharmacies());
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<Pharmacy>> searchPharmacies(
            @PathVariable String keyword) {
        return ResponseEntity.ok(service.searchPharmacies(keyword));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Pharmacy> savePharmacy(
            @RequestBody Pharmacy pharmacy) {
        return ResponseEntity.ok(service.savePharmacy(pharmacy));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Pharmacy> updatePharmacy(
            @PathVariable Long id,
            @RequestBody Pharmacy pharmacy) {
        return ResponseEntity.ok(service.updatePharmacy(id, pharmacy));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePharmacy(
            @PathVariable Long id) {

        service.deletePharmacy(id);
        return ResponseEntity.noContent().build();
    }
}