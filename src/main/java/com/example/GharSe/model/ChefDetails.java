package com.example.GharSe.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

@Data
@Table(name = "ChefDetails")
@Entity

public class ChefDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name ="\"chefId\"" )
    private String chefId;

    @Column(name = "\"chefName\"")
    private String chefName;

    @Column(name = "\"chefMobileNumber\"")
    private String chefMobileNumber;

    @Column(name = "\"chefEmailId\"")
    private String chefEmailId;

    @Column(name = "\"chefPasswordHash\"")
    private String chefPasswordHash;

    @Column(name = "\"speciality\"")
    private String speciality;

    @Column(name = "\"rating\"")
    private int rating;

    @Column(name = "\"isActive\"")
    private boolean isActive;

    @Column(name = "\"createdAt\"")
    private LocalDateTime createdAt;

    @Column(name = "\"startTime\"")
    private LocalTime startTime;

    @Column(name = "\"endTime\"")
    private LocalTime endTime;

    @Column(name ="\"onboardingStage\"" )
    private String onboardingStage;

    @Column(name ="\"bankAccountDetails\"" )
    private String bankAccountDetails;


}
