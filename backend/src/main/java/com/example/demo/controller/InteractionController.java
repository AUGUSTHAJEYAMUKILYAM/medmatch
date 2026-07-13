package com.example.demo.controller;

import com.example.demo.dto.InteractionCheckRequest;
import com.example.demo.model.Interaction;
import com.example.demo.service.InteractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interactions")
@RequiredArgsConstructor
public class InteractionController {

    private final InteractionService service;

    @PostMapping("/check")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Interaction>> checkInteractions(
            @RequestBody InteractionCheckRequest request) {

        return ResponseEntity.ok(
                service.checkInteractions(request.getMedicineIds()));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Interaction> saveInteraction(
            @RequestBody Interaction interaction) {

        return ResponseEntity.ok(service.saveInteraction(interaction));
    }
}