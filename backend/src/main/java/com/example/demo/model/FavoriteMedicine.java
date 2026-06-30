package com.example.demo.model;
import jakarta.persistence.*;
import lombok.*;
@Entity@Table(name="favorite_medicines")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteMedicine{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private String fullName;
    @Column(unique = true,nullable = false)
    private String email;

}