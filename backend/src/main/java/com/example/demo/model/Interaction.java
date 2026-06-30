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
   private Medicine medicineOne;
   @ManyToOne
   @JoinColumn(name = "medicine_two_id")
   private Medicine medicineTwo;

   @Column(nullable = false)
   private String 
   @Column(length = 1000)
   private String warningMessage;

}