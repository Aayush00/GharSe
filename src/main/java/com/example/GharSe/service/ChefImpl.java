package com.example.GharSe.service;

import com.example.GharSe.model.ChefDetails;
import com.example.GharSe.model.ChefMenu;
import com.example.GharSe.repo.ChefDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ChefImpl implements ChefImplementation{

    @Autowired
    ChefDetailRepo chefDetailRepo;

    public String chefRegistration( ChefDetails req){
        ChefDetails chefDetails=new ChefDetails();
        LocalDateTime nowDateTime = LocalDateTime.now();
        chefDetails.setChefName(req.getChefName());
        chefDetails.setChefEmailId(req.getChefEmailId());
        chefDetails.setChefPasswordHash(req.getChefPasswordHash());
        chefDetails.setActive(true);
        chefDetails.setCreatedAt(nowDateTime);
        chefDetails.setChefMobileNumber(req.getChefMobileNumber());
        chefDetails.setStartTime(req.getStartTime());
        chefDetails.setEndTime(req.getEndTime());
        chefDetails.setChefId(String.valueOf(req.getChefEmailId()+req.getChefMobileNumber()));
        //chefDetails.setOnboardingStage("Registration Completed");
        chefDetails.setBankAccountDetails(req.getBankAccountDetails());
        chefDetails.setLocation(req.getLocation());

        chefDetailRepo.save(chefDetails);
        return "Chef Register Successfully :-)";
    }

    @Override
    public void generateOTP(String phoneNumber) {
        //token

    }


    @Override
    public void chefMenuList(ChefMenu req) {
        ChefMenu chefMenu= new ChefMenu();
        chefMenu.setAvailable(true);
        chefMenu.setMenuName(req.getMenuName());
        chefMenu.setDescription(req.getDescription());
        chefMenu.setMenuType(req.getMenuType());
        chefMenu.setPrice(req.getPrice());
        chefMenu.setEndTime(req.getEndTime());
        chefMenu.setStartTime(req.getStartTime());
        //token login
        //chefMenu.setChefId();
        chefMenu.setPrice(req.getPrice());
        //token
        //chefMenu.setCreatedBy();
    }

}
