package com.example.demo.controller;

import com.example.demo.model.Prescription;
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
    public Prescription uploadPrescription(@RequestBody Prescription prescription) {
        return service.savePrescription(prescription);
    }
}