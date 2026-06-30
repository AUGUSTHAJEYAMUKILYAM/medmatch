package com.example.demo.model;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="medicine")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class medicine{
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(nu)
}