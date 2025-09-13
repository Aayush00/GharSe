package com.example.GharSe.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OTPService {

    private static final String ACCOUNT_SID = "ACed60f4bf504596b947b91180da9f145f";
    private static final String AUTH_TOKEN = "196fa4515c4afef797f65bb90882ce93";
    private static final String TWILIO_NUMBER = "+17622200869"; // Twilio sender number

    // Store OTPs in memory (phoneNumber -> OTPDetails)
    private final ConcurrentHashMap<String, String> otpStoreMap = new ConcurrentHashMap<>();

    static {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    /**
     * Generate a random OTP, store it with expiry, and send via Twilio
     */
    public String generateOTP(String phoneNumber) {
        // Generate a random 6-digit OTP
        String otp = String.valueOf(100000 + new Random().nextInt(900000));

        // Store with 5 minutes expiry
        otpStoreMap.put(phoneNumber, otp);

        // Send OTP via Twilio SMS
        Message message = Message.creator(
                new PhoneNumber("+917974844628"),      // recipient
                new PhoneNumber(TWILIO_NUMBER),    // Twilio sender number
                "Your OTP code is: " + otp + " (valid for 5 mins)"
        ).create();

        System.out.println("OTP sent to " + phoneNumber + " | Message SID: " + message.getSid());
        return otp; // return for testing; remove in production
    }

    /**
     * Verify OTP entered by user
     */
    public boolean verifyOTP(String phoneNumber, String otp) {
        String details = otpStoreMap.get(phoneNumber);
        System.out.println(details);

        if (details == null) {
            return false; // no OTP generated for this number
        }

        // Check OTP value and expiry
   /*     if (details.getOtp().equals(otp) && details.getExpiryTime() > System.currentTimeMillis()) {
            otpStoreMap.remove(phoneNumber); // remove after successful verification
            return true;
        }*/

        return false;
    }

    /**
     * Helper class to store OTP and its expiry
     */
    static class OTPDetails {
        private final String otp;
     //   private final long expiryTime;

        public OTPDetails(String otp, long expiryTime) {
            this.otp = otp;
         //   this.expiryTime = expiryTime;
        }

        public String getOtp() {
            return otp;
        }

    //    public long getExpiryTime() {
       //     return expiryTime;
        }
    }

