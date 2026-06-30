package com.example.demo.model;
import jakarta.persistence.*;
import lombok.*;
@Entity@Table(name="interactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {

    @ID
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
}