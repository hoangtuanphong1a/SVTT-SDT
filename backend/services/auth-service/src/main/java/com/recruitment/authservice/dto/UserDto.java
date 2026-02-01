package com.recruitment.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Integer userId;
    private String email;
    private String displayName;
    private String avatarUrl;
    private Set<String> roles;
    private boolean isEmailConfirmed;
    private boolean isActive;
}