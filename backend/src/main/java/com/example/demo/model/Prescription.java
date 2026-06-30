package com.example.demo.model;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;
@Entity@Table(name="interactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String fileUrl;
    @Column(nullable = false)
    private LocalDateTime uploadData;

    private String notes;
    @ManyToOne
    @JoinColumn(name = "user_id")
    


}