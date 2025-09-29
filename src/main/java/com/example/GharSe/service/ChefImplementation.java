package com.example.GharSe.service;

import com.example.GharSe.model.ChefDetails;
import com.example.GharSe.model.ChefMenu;
import org.springframework.stereotype.Service;

@Service
public interface ChefImplementation {
    public String chefRegistration(ChefDetails req);

    void generateOTP(String phoneNumber);

    void chefMenuList(ChefMenu req);
}
