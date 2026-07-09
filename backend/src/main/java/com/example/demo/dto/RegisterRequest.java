package com.example.demo.dto;

import com.example.demo.model.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private String username;
    private String password;
    private String email;
    private String fullName;
    private Role role;
}