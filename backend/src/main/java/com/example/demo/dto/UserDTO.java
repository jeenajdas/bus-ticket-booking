package com.example.demo.dto;

public class UserDTO {
	private Long id;
    private String name;
    private String email;
    private String phone;

    public UserDTO(Long id, String name, String email, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    // Getters (no setters needed unless you want mutability)
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }

}
