package org.example.backend.module.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.common.enums.CompanySize;
import org.example.backend.common.enums.UserRole;
import org.example.backend.common.exception.AlreadyExistsException;
import org.example.backend.common.exception.AuthenticationException;
import org.example.backend.common.exception.ResourceNotFoundException;
import org.example.backend.common.security.SecurityUser;
import org.example.backend.common.security.jwt.JwtService;
import org.example.backend.module.auth.dto.request.AuthRequest;
import org.example.backend.module.auth.dto.response.AuthResponse;
import org.example.backend.module.auth.dto.response.RegisterRequest;
import org.example.backend.module.auth.entity.User;
import org.example.backend.module.auth.repository.UserRepository;
import org.example.backend.module.company.entity.Company;
import org.example.backend.module.company.repository.CompanyRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final JavaMailSender mailSender;
    
    private final SecureRandom random = new SecureRandom();
    
    @Override
    public AuthResponse login(AuthRequest request) {
        try {
            // Support login with either username or email
            String loginId = request.getUsername();
            String username = loginId;
            
            // If loginId contains '@', treat it as email
            if (loginId != null && loginId.contains("@")) {
                User user = userRepository.findByEmail(loginId)
                        .orElseThrow(() -> new AuthenticationException("Invalid email or password"));
                username = user.getUsername();
            }
            
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            username,
                            request.getPassword()
                    )
            );
            
            SecurityUser userDetails = (SecurityUser) authentication.getPrincipal();
            String jwt = jwtService.generateToken(userDetails);
            
            return AuthResponse.builder()
                    .token(jwt)
                    .username(userDetails.getUsername())
                    .email(userDetails.getEmail())
                    .role(userDetails.getRole().name())
                    .build();
                    
        } catch (Exception e) {
            throw new AuthenticationException("Invalid username/email or password");
        }
    }
    
    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AlreadyExistsException("User", "username", request.getUsername());
        }
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AlreadyExistsException("User", "email", request.getEmail());
        }
        
        // Determine user role from request
        UserRole userRole = UserRole.JOB_SEEKER;
        if (request.getRole() != null && "EMPLOYER".equalsIgnoreCase(request.getRole())) {
            userRole = UserRole.EMPLOYER;
        }
        
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(userRole)
                .isVerified(false)
                .isActive(true)
                .build();
        
        // Save user first
        User savedUser = userRepository.save(user);
        
        // Create company if employer
        if (userRole == UserRole.EMPLOYER && request.getCompanyInfo() != null) {
            RegisterRequest.CompanyInfoDto companyInfo = request.getCompanyInfo();
            Company company = Company.builder()
                    .userId(savedUser.getId())
                    .companyName(companyInfo.getCompanyName())
                    .phone(companyInfo.getCompanyPhone())
                    .address(companyInfo.getCompanyAddress())
                    .websiteUrl(companyInfo.getCompanyWebsite())
                    .industry(companyInfo.getIndustry())
                    .companySize(parseCompanySize(companyInfo.getCompanySize()))
                    .email(savedUser.getEmail())
                    .isVerified(false)
                    .isActive(true)
                    .build();
            
            Company savedCompany = companyRepository.save(company);
            log.info("Created company {} for employer user {}", savedCompany.getId(), savedUser.getId());
        }
        
        // Generate OTP for email verification
        String otp = generateOTP();
        savedUser.setOtp(otp);
        savedUser.setOtpExpiry(LocalDateTime.now().plusMinutes(15));
        savedUser = userRepository.save(savedUser);
        
        // Send verification email (catch exception to allow registration even if email fails)
        try {
            sendVerificationEmail(savedUser);
        } catch (Exception e) {
            log.warn("Failed to send verification email for user {}: {}", savedUser.getEmail(), e.getMessage());
        }
        
        SecurityUser securityUser = SecurityUser.builder()
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .password(savedUser.getPassword())
                .role(savedUser.getRole())
                .isActive(savedUser.getIsActive())
                .build();
        
        String jwt = jwtService.generateToken(securityUser);
        
        return AuthResponse.builder()
                .id(savedUser.getId())
                .uuid(savedUser.getUuid())
                .token(jwt)
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .role(savedUser.getRole().name())
                .isVerified(savedUser.getIsVerified())
                .build();
    }
    
    private CompanySize parseCompanySize(String size) {
        if (size == null || size.isEmpty()) {
            return null;
        }
        try {
            return CompanySize.valueOf(size.toUpperCase());
        } catch (IllegalArgumentException e) {
            log.warn("Invalid company size: {}", size);
            return null;
        }
    }
    
    @Override
    public boolean validateToken(String token) {
        try {
            String username = jwtService.extractUsername(token);
            SecurityUser userDetails = (SecurityUser) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();
            
            return jwtService.validateToken(token, userDetails);
        } catch (Exception e) {
            return false;
        }
    }
    
    @Override
    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        
        // Generate OTP
        String otp = generateOTP();
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);
        
        // Send OTP email
        sendOTPEmail(user, otp);
    }
    
    @Override
    public void resetPassword(String email, String otp, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        
        if (!user.getOtp().equals(otp)) {
            throw new AuthenticationException("Invalid OTP");
        }
        
        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new AuthenticationException("OTP has expired");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
    }
    
    @Override
    public void changePassword(String username, String currentPassword, String newPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new AuthenticationException("Current password is incorrect");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
    
    @Override
    public void verifyEmail(String email, String otp) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        
        if (!user.getOtp().equals(otp)) {
            throw new AuthenticationException("Invalid OTP");
        }
        
        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new AuthenticationException("OTP has expired");
        }
        
        user.setIsVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
    }
    
    @Override
    public void logout() {
        SecurityContextHolder.clearContext();
    }
    
    @Async
    private void sendVerificationEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Verify Your Email Address");
        message.setText("Please verify your email address by clicking the link below:\n\n" +
                       "http://localhost:3000/verify-email?email=" + user.getEmail() + 
                       "&otp=" + user.getOtp());
        message.setFrom("noreply@jobportal.com");
        
        mailSender.send(message);
    }
    
    @Async
    private void sendOTPEmail(User user, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Password Reset OTP");
        message.setText("Your OTP for password reset is: " + otp + "\n\n" +
                       "This OTP will expire in 15 minutes.");
        message.setFrom("noreply@jobportal.com");
        
        mailSender.send(message);
    }
    
    private String generateOTP() {
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}