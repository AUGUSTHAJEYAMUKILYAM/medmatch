package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity@Table(name="users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User{
    @Id
    @GeneratedValue)()
}