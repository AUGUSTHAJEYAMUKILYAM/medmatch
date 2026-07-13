package com.example.demo.controller;

import com.example.demo.dto.AuthenticationResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public AuthenticationResponse register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LoginRequest request) {
        return service.login(request);
    }
}