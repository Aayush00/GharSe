package com.example.GharSe.service;

import com.example.GharSe.model.ChefDetails;
import com.example.GharSe.model.ChefMenu;
import com.example.GharSe.repo.ChefDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

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
        //chefDetails.setChefId(UUID.randomUUID().toString());
        chefDetails.setChefId(String.valueOf("Chef 1"));
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

/*    isChefOverride
:
        false
    isManuallyAvailable
:
        false*/  //disable

/*    isChefOverride
:
        false
    isManuallyAvailable  Quantity
:
        true*/  //time + quatity available

/*    isChefOverride
:
        true
    isManuallyAvailable
:
        true*/   //  time exccesed + quantity >0 +both true enable


    @Override
    public void chefMenuList(ChefMenu req) {
        ChefMenu chefMenu= new ChefMenu();
        chefMenu.setMenuName(req.getMenuName());
        chefMenu.setDescription(req.getDescription());
        chefMenu.setMenuType(req.getMenuType());
        chefMenu.setPrice(req.getPrice());
        chefMenu.setEndTime(req.getEndTime());
        chefMenu.setStartTime(req.getStartTime());
        if(chefMenu.isChefAvailable()){
            chefMenu.setAvailable(true);
        }
        chefMenu.setAvailable(false);
        chefMenu.setChefId(req.getChefId());
        chefMenu.setPrice(req.getPrice());
    }

}
