package com.recruitment.authservice.service;

import com.recruitment.authservice.dto.RegisterRequest;
import com.recruitment.authservice.dto.UserDto;
import com.recruitment.authservice.entity.Role;
import com.recruitment.authservice.entity.User;
import com.recruitment.authservice.repository.RoleRepository;
import com.recruitment.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserDto registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Get or create JobSeeker role
        Role jobSeekerRole = roleRepository.findByRoleName("JobSeeker")
                .orElseGet(() -> {
                    Role role = new Role("JobSeeker", "Job seeker / candidate");
                    return roleRepository.save(role);
                });

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .displayName(request.getDisplayName())
                .isActive(true)
                .isDeleted(false)
                .isEmailConfirmed(false)
                .roles(new HashSet<>(Set.of(jobSeekerRole)))
                .build();

        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    public Optional<UserDto> findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::convertToDto);
    }

    public Optional<UserDto> findById(Integer userId) {
        return userRepository.findById(userId)
                .map(this::convertToDto);
    }

    public UserDto convertToDto(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(java.util.stream.Collectors.toSet());

        return UserDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .avatarUrl(user.getAvatarUrl())
                .roles(roles)
                .isEmailConfirmed(user.getIsEmailConfirmed())
                .isActive(user.getIsActive())
                .build();
    }
}