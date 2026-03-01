package com.example.demo.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class PassengerInfo {
    private String name;
    private int age;
    private String gender;
}
