package com.example.demo.model;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="pharmacy")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pharmacy{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String pincode;

}