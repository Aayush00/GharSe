package com.example.GharSe.controller;

import com.example.GharSe.model.ChefDetails;
import com.example.GharSe.model.Customer;
import com.example.GharSe.repo.ChefDetailRepo;
import com.example.GharSe.service.ChefImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class ChefController {


    @Autowired
    ChefImplementation chefImplementation;

    @Autowired
    ChefDetailRepo chefDetails;

    @PostMapping("/chefRegistration")
    public String chefRegistration(@RequestBody ChefDetails req) {
       return chefImplementation.chefRegistration(req);
    }

    @PostMapping("/request-otp")
    public String requestOtp(@RequestParam String phoneNumber) {
        // Lazy onboarding: create customer if not exists
        Optional<Customer> customerOpt = chefDetails.findIdBychefMobileNumber(phoneNumber);

        if(customerOpt.isEmpty()){
            return "Chef is not registered! Please register first to process";
        }else{
            chefImplementation.generateOTP(phoneNumber );
            return "OTP sent to phone number";
        }


    }

}
