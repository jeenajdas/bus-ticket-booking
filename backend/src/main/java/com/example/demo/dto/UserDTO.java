package com.example.demo.dto;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private boolean banned;

    public UserDTO(Long id, String name, String email, String phone, String role, boolean banned) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.banned = banned;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getRole() {
        return role;
    }

    public boolean isBanned() {
        return banned;
    }
}