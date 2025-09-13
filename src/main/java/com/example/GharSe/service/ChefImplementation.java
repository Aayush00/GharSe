package com.example.GharSe.service;

import com.example.GharSe.model.ChefDetails;
import org.springframework.stereotype.Service;

@Service
public interface ChefImplementation {
    public String chefRegistration(ChefDetails req);

    void generateOTP(String phoneNumber);
}
