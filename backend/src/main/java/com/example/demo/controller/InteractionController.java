package com.example.demo.controller;

import com.example.demo.dto.InteractionCheckRequest;
import com.example.demo.service.InteractionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interactions")
public class InteractionController {

    private final InteractionService service;

    public InteractionController(InteractionService service) {
        this.service = service;
    }

    @PostMapping("/check")
    public String checkInteractions(@RequestBody InteractionCheckRequest request) {
        return service.checkInteractions(request.getMedicineIds());
    }
}