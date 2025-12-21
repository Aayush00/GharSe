package com.example.GharSe.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Table(name = "menuitems")
@Entity
public class ChefMenu {



        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @Column(name = "\"quantity\"")
        private long quantity;

        @Column(name ="\"chefId\"" )
        private String chefId;

        @Column(name = "\"menuName\"")
        private String menuName;

        @Column(name = "\"menuType\"")
        private String menuType;

        @Column(name = "\"price\"")
        private Long price;

        @Column(name = "\"createdBy\"")
        private String createdBy;

        @Column(name = "\"createdAt\"")
        private LocalDateTime createdAt;

        @Column(name = "\"updatedAt\"")
        private LocalDateTime updatedAt;

        @Column(name = "\"description\"")
        private String description;

        @Column(name = "\"startTime\"")
        private LocalTime startTime;

        @Column(name = "\"endTime\"")
        private LocalTime endTime;

        /* @Column(name ="\"onboardingStage\"" )
         private String onboardingStage; */

        @Column(name ="\"isAvailable\"" )
        private boolean isAvailable;

        @Column(name = "\"isChefAvailable\"")
    private boolean isChefAvailable;


    }


