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
   @ManyToOne
   @JoinColumn(name = "user_id")
   private User user;

   @ManyToOne
   @JoinColumn(name = "medicine_id")
   private Medicine 

}