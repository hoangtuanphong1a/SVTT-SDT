package com.jobportal.service;

import com.jobportal.entity.PasswordResetToken;
import com.jobportal.entity.User;
import com.jobportal.repository.PasswordResetTokenRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    private static final int TOKEN_EXPIRATION_HOURS = 1;
    private static final SecureRandom secureRandom = new SecureRandom();

    public String generateResetToken(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            // Don't reveal if user exists or not for security
            return null;
        }

        User user = userOpt.get();
        
        // Delete any existing tokens for this user
        tokenRepository.deleteByUserId(user.getId());

        // Generate a secure random token
        byte[] tokenBytes = new byte[32];
        secureRandom.nextBytes(tokenBytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);

        // Store token hash (using SHA-256 would be better, but for simplicity we'll store directly)
        // In production, consider using a separate lookup table or SHA-256 hash
        String tokenHash = token; // For now, store directly. In production, use proper hashing

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUser(user);
        resetToken.setTokenHash(tokenHash);
        resetToken.setExpiresAt(LocalDateTime.now().plusHours(TOKEN_EXPIRATION_HOURS));
        resetToken.setCreatedAt(LocalDateTime.now());

        tokenRepository.save(resetToken);

        // Send email with the plain token (not hashed)
        emailService.sendPasswordResetEmail(user.getEmail(), token);

        return token;
    }

    @Transactional
    public boolean resetPassword(String token, String newPassword) {
        // Find token directly (in production, use proper hashing)
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findValidToken(token, LocalDateTime.now());
        
        if (tokenOpt.isEmpty()) {
            return false;
        }

        PasswordResetToken validToken = tokenOpt.get();
        User user = validToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        validToken.setUsedAt(LocalDateTime.now());
        tokenRepository.save(validToken);

        return true;
    }
}
