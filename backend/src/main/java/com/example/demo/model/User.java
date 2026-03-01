package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    @JsonProperty("phone")
    private String phoneNumber;
    private String role; // ADMIN or USER
    private String resetToken;
    private LocalDateTime resetTokenExpiry;
    private boolean banned = false;

}
