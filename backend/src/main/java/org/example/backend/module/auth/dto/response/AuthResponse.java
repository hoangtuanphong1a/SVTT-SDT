package org.example.backend.module.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private Long id;
    private String uuid;
    private String token;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private Boolean isVerified;
}
