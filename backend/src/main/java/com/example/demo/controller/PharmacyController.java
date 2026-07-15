package com.example.demo.controller;

import com.example.demo.model.Pharmacy;
import com.example.demo.service.PharmacyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacies")
public class PharmacyController {

    private final PharmacyService service;

    public PharmacyController(PharmacyService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pharmacy> getAllPharmacies() {
        return service.getAllPharmacies();
    }

    @GetMapping("/{id}")
    public Pharmacy getPharmacy(@PathVariable Long id) {
        return service.getPharmacyById(id);
    }

    @PostMapping
    public Pharmacy addPharmacy(@RequestBody Pharmacy pharmacy) {
        return service.savePharmacy(pharmacy);
    }

    @PutMapping("/{id}")
    public Pharmacy updatePharmacy(
            @PathVariable Long id,
            @RequestBody Pharmacy pharmacy) {

        return service.updatePharmacy(id, pharmacy);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePharmacy(@PathVariable Long id) {

        service.deletePharmacy(id);

        return ResponseEntity.noContent().build();
    }
}