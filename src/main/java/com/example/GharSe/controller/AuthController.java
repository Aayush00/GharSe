package com.example.GharSe.controller;

import com.example.GharSe.model.Customer;
import com.example.GharSe.repo.CustomerRepository;
import com.example.GharSe.service.JwtService;
import com.example.GharSe.service.OTPService;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private OTPService otpService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomerRepository customerRepo;


    // --- Request OTP ---
    @PostMapping("/request-otp")
    public String requestOtp(@RequestParam String phoneNumber) {
        // Lazy onboarding: create customer if not exists
        Optional<Customer> customerOpt = customerRepo.findByCustomerMobileNumber(phoneNumber);
        if (customerOpt.isEmpty()) {
            Customer c = new Customer();
            c.setCustomerMobileNumber(phoneNumber);
            c.setOnboardingStage("PhoneVerified");
            customerRepo.save(c);
        }

        otpService.generateOTP(phoneNumber);
        return "OTP sent to phone number";
    }

    // --- Verify OTP ---
    @PostMapping("/verify-otp")
    public Object verifyOtp(@RequestParam String phoneNumber, @RequestParam String otp) {

        boolean otpResult=otpService.verifyOTP(phoneNumber,otp);

        if(!otpResult) return "Invalid otp";
        Customer customer = customerRepo.findByCustomerMobileNumber(phoneNumber).get();
        String accessToken = jwtService.generateToken(customer.getId(), 60 * 60 * 1000); // 1 hour
        String refreshToken = jwtService.generateToken(customer.getId(), 7 * 24 * 60 * 60 * 1000); // 7 days

        return new AuthResponse(customer.getId(), customer.getOnboardingStage(), accessToken, refreshToken);
    }

    static class AuthResponse {
        public Long customerId;
        public String onboardingStage;
        public String accessToken;
        public String refreshToken;

        public AuthResponse(Long customerId, String onboardingStage, String accessToken, String refreshToken) {
            this.customerId = customerId;
            this.onboardingStage = onboardingStage;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }
}

