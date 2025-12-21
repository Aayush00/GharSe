package com.example.GharSe.controller;

import com.example.GharSe.model.ChefDetails;
import com.example.GharSe.model.ChefMenu;
import com.example.GharSe.model.Customer;
import com.example.GharSe.repo.ChefDetailRepo;
import com.example.GharSe.service.ChefImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/chef")
public class ChefController {

    @Autowired
    ChefImplementation chefImplementation;

    @Autowired
    ChefDetailRepo chefDetails;

    @PostMapping("/chefRegistration")
    public ResponseEntity<Map<String, String>> chefRegistration(@RequestBody ChefDetails req) {
        chefImplementation.chefRegistration(req);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Chef Register Successfully :-), Pending with Admin Approval !!!");
        response.put("chefId",req.getChefId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/chefMenuList")
    public ResponseEntity<Map<String, String>> chefMenuList(@RequestBody ChefMenu req) {
        chefImplementation.chefMenuList(req);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Chef Register Successfully :-), Pending with Admin Approval !!!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/request-otp")
    public ResponseEntity<Map<String, String>> requestOtp(@RequestParam String phoneNumber) {
        Optional<Customer> customerOpt = chefDetails.findIdBychefMobileNumber(phoneNumber);

        Map<String, String> response = new HashMap<>();
        if (customerOpt.isEmpty()) {
            response.put("message", "Chef is not registered! Please register first to process");
        } else {
            chefImplementation.generateOTP(phoneNumber);
            response.put("message", "OTP sent to phone number");
        }

        return ResponseEntity.ok(response);
    }
}
