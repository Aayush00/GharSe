package com.example.GharSe.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "customerss") // good practice to explicitly name the table
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "\"customerName\"")
    private String customerName;

    @Column(name = "\"customerMobileNumber\"")
    private String customerMobileNumber;

    @Column(name = "\"customerEmail\"")
    private String customerEmail;

    @Column(name = "\"customerPasswordHash\"")
    private String customerPasswordHash;

    @Column(name = "\"onboardingStage\"")
    private String onboardingStage; // e.g. PhoneVerified, ProfileCompleted

    @Column(name = "\"createdAt\"")
    private LocalDateTime createdAt;

}
