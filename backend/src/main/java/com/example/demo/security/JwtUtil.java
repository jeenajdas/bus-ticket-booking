package com.example.demo.security;

import io.jsonwebtoken.Claims;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {

    private final SecretKey secretKey;

    public JwtUtil(@Value("${jwt.secret}") String secret) {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
    }


    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role.startsWith("ROLE_") ? role : "ROLE_" + role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(secretKey, SignatureAlgorithm.HS256) // Proper key usage
                .compact();
    }



    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    public List<GrantedAuthority> extractRole(String token) {
        Claims claims = getClaims(token);
        String role = claims.get("role", String.class);

        if (role == null) {
            System.out.println("❌ Role claim missing in JWT!");
            throw new RuntimeException("Role claim is missing from JWT");
        }

        System.out.println("✅ Extracted Role: " + role);
        return Collections.singletonList(new SimpleGrantedAuthority(role));
    }



    public boolean validateToken(String token) {
        try {
            Claims claims = getClaims(token);
            System.out.println("✅ Token Validated: " + claims);
            return !isTokenExpired(token);
        } catch (Exception e) {
            System.out.println("❌ Token validation failed: " + e.getMessage());
            return false;
        }
    }


    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }
}
