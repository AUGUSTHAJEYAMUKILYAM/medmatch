package com.example.demo.dto;

import com.example.demo.model.Role;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {

    private String token;
    private String username;
    private Role role;
}