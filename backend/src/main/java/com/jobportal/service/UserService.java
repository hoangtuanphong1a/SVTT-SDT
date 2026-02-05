package com.jobportal.service;

import com.jobportal.entity.Role;
import com.jobportal.entity.User;
import com.jobportal.repository.RoleRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public User saveUser(User user) {
        if (user.getPasswordHash() != null && !user.getPasswordHash().startsWith("$2")) {
            // Only encode if not already encoded
            user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        }

        // Assign default role if no roles are assigned
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            Optional<Role> defaultRole = roleRepository.findByName("ROLE_CANDIDATE");
            if (defaultRole.isEmpty()) {
                defaultRole = roleRepository.findByName("ROLE_USER");
            }
            if (defaultRole.isPresent()) {
                if (user.getRoles() == null) {
                    user.setRoles(new java.util.HashSet<>());
                }
                user.getRoles().add(defaultRole.get());
            }
        }

        if (user.getCreatedAt() == null) {
            user.setCreatedAt(java.time.LocalDateTime.now());
        }
        if (user.getIsActive() == null) {
            user.setIsActive(true);
        }
        if (user.getIsDeleted() == null) {
            user.setIsDeleted(false);
        }
        if (user.getIsEmailConfirmed() == null) {
            user.setIsEmailConfirmed(false);
        }

        return userRepository.save(user);
    }

    public User saveUserWithRole(User user, String roleName) {
        if (user.getRoles() == null) {
            user.setRoles(new java.util.HashSet<>());
        }
        Optional<Role> role = roleRepository.findByName(roleName);
        if (role.isPresent()) {
            user.getRoles().clear();
            user.getRoles().add(role.get());
        }
        return saveUser(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findActiveUserByEmail(String email) {
        return userRepository.findActiveUserByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public List<User> findByRoleName(String roleName) {
        return userRepository.findByRoleName(roleName);
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findActiveUserByEmail(email);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }

    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (userDetails.getEmail() != null) {
                user.setEmail(userDetails.getEmail());
            }
            if (userDetails.getPasswordHash() != null) {
                user.setPasswordHash(passwordEncoder.encode(userDetails.getPasswordHash()));
            }
            if (userDetails.getDisplayName() != null) {
                user.setDisplayName(userDetails.getDisplayName());
            }
            if (userDetails.getAvatarUrl() != null) {
                user.setAvatarUrl(userDetails.getAvatarUrl());
            }
            if (userDetails.getPreferredLocale() != null) {
                user.setPreferredLocale(userDetails.getPreferredLocale());
            }
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}