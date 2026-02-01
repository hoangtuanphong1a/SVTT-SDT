package com.recruitment.authservice.controller;

import com.recruitment.authservice.dto.AuthRequest;
import com.recruitment.authservice.dto.AuthResponse;
import com.recruitment.authservice.dto.RegisterRequest;
import com.recruitment.authservice.dto.RefreshTokenRequest;
import com.recruitment.authservice.entity.RefreshToken;
import com.recruitment.authservice.entity.User;
import com.recruitment.authservice.repository.RefreshTokenRepository;
import com.recruitment.authservice.repository.UserRepository;
import com.recruitment.authservice.security.JwtTokenProvider;
import com.recruitment.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);
            String refreshToken = tokenProvider.generateRefreshToken(authentication);

            // Save refresh token
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            RefreshToken token = new RefreshToken();
            token.setUser(user);
            token.setTokenHash(refreshToken);
            token.setExpiresAt(new Date(tokenProvider.getExpirationDateFromToken(refreshToken).getTime()));
            refreshTokenRepository.save(token);

            AuthResponse response = new AuthResponse();
            response.setAccessToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpiresIn(tokenProvider.getExpirationDateFromToken(jwt).getTime() - System.currentTimeMillis());
            response.setUser(userService.convertToDto(user));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid email or password");
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            var userDto = userService.registerUser(registerRequest);
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
        try {
            String refreshToken = request.getRefreshToken();

            if (tokenProvider.validateToken(refreshToken)) {
                Long userId = tokenProvider.getUserIdFromToken(refreshToken);

                Optional<RefreshToken> tokenOpt = refreshTokenRepository.findByTokenHash(refreshToken);
                if (tokenOpt.isPresent()) {
                    RefreshToken token = tokenOpt.get();
                    if (!token.isExpired() && !token.isRevoked()) {
                        User user = token.getUser();
                        Authentication authentication = new UsernamePasswordAuthenticationToken(
                                user.getEmail(), null, user.getRoles().stream()
                                        .map(role -> new org.springframework.security.core.authority.SimpleGrantedAuthority(role.getRoleName()))
                                        .collect(java.util.stream.Collectors.toList())
                        );

                        String newAccessToken = tokenProvider.generateToken(authentication);

                        AuthResponse response = new AuthResponse();
                        response.setAccessToken(newAccessToken);
                        response.setRefreshToken(refreshToken);
                        response.setExpiresIn(tokenProvider.getExpirationDateFromToken(newAccessToken).getTime() - System.currentTimeMillis());
                        response.setUser(userService.convertToDto(user));

                        return ResponseEntity.ok(response);
                    }
                }
            }

            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid refresh token");
            return ResponseEntity.badRequest().body(error);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Token refresh failed");
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                
                Optional<RefreshToken> tokenOpt = refreshTokenRepository.findByTokenHash(token);
                if (tokenOpt.isPresent()) {
                    RefreshToken refreshToken = tokenOpt.get();
                    refreshToken.revoke();
                    refreshTokenRepository.save(refreshToken);
                }
            }

            Map<String, String> response = new HashMap<>();
            response.put("message", "Logged out successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Logout failed");
            return ResponseEntity.badRequest().body(error);
        }
    }
}