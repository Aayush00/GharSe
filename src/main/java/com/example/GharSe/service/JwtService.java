package com.example.GharSe.service;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY = "your_jwt_secret";

    public String generateToken(Long customerId, long expirationMs) {
        return Jwts.builder()
                .claim("customerId", customerId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}

