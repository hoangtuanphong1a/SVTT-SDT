package org.example.backend.module.auth.service;

import org.example.backend.module.auth.dto.request.AuthRequest;
import org.example.backend.module.auth.dto.response.AuthResponse;
import org.example.backend.module.auth.dto.response.RegisterRequest;

public interface AuthService {
    
    AuthResponse login(AuthRequest request);
    
    AuthResponse register(RegisterRequest request);
    
    boolean validateToken(String token);
    
    void forgotPassword(String email);
    
    void resetPassword(String email, String otp, String newPassword);
    
    void changePassword(String username, String currentPassword, String newPassword);
    
    void verifyEmail(String email, String otp);
    
    void logout();
}
