package com.example.demo.model;
import jakarta.persistence.*;
import lombok.*;
@Entity@Table(name="interactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Interaction{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
   @ManyToOne
   @JoinColumn(name = "medicine_one_id")
   private  user;

}