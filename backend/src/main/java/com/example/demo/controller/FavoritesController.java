package com.example.demo.controller;

import com.example.demo.model.FavoriteMedicine;
import com.example.demo.model.User;
import com.example.demo.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoritesController {

    private final FavoriteService service;

    @GetMapping
    public ResponseEntity<List<FavoriteMedicine>> getFavorites(
            @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(service.getFavoritesByUser(user));
    }

    @PostMapping("/{medicineId}")
    public ResponseEntity<FavoriteMedicine> addFavorite(
            @PathVariable Long medicineId,
            @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(service.addFavorite(medicineId, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long id) {

        service.removeFavorite(id);
        return ResponseEntity.noContent().build();
    }
}