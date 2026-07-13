package com.example.demo.controller;

import com.example.demo.model.Prescription;
import com.example.demo.model.User;
import com.example.demo.service.PrescriptionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService service;

    public PrescriptionController(PrescriptionService service) {
        this.service = service;
    }

    @PostMapping
    public Prescription uploadPrescription(@RequestParam String fileUrl,
                                           @RequestParam String notes) {

        // Temporary user until authentication is added
        User user = new User();

        return service.savePrescription(fileUrl, notes, user);
    }

    @DeleteMapping("/{id}")
    public void deletePrescription(@PathVariable Long id) {
        service.deletePrescription(id);
    }
}