package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;

import com.example.demo.service.UserService;
import com.example.demo.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity
                    .status(201) // Created
                    .body(Map.of("message", "User registered successfully!"));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Signup failed: " + e.getMessage()));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Optional<User> foundUser = userService.getUserByEmail(user.getEmail());

        if (foundUser.isPresent() &&
            userService.verifyPassword(user.getPassword(), foundUser.get().getPassword())) {

            String token = jwtUtil.generateToken(foundUser.get().getEmail(), foundUser.get().getRole());

            UserDTO userDTO = new UserDTO(
                foundUser.get().getId(),
                foundUser.get().getName(),
                foundUser.get().getEmail(),
                foundUser.get().getphoneNumber()
            );

            return ResponseEntity.ok(Map.of(
                "token", token,
                "role", foundUser.get().getRole(),
                "user", userDTO
            ));
        }

        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }
}
