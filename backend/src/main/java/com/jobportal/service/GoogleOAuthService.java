package com.jobportal.service;

import com.jobportal.entity.Role;
import com.jobportal.entity.User;
import com.jobportal.repository.RoleRepository;
import com.jobportal.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;

@Service
public class GoogleOAuthService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleOAuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserService userService;

    @Value("${google.oauth.client-id:}")
    private String googleClientId;

    public User authenticateGoogleUser(String idTokenString) {
        try {
            // Google OAuth verification requires Google API client library
            // For now, we'll implement a basic structure
            // In production, you need to:
            // 1. Add Google API client dependencies
            // 2. Verify the ID token using GoogleIdTokenVerifier
            // 3. Extract user information from the verified token
            
            logger.warn("Google OAuth is not fully configured. Please configure google.oauth.client-id in application.properties");
            logger.info("Received Google ID token (length: {})", idTokenString != null ? idTokenString.length() : 0);
            
            // Placeholder implementation - in production, verify the token properly
            throw new RuntimeException("Google OAuth is not configured. Please set google.oauth.client-id in application.properties and add Google API dependencies.");
            
            /* Production implementation would look like:
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) {
                throw new RuntimeException("Invalid Google ID token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String googleId = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");

            // Check if user exists by Google ID
            Optional<User> userOpt = userRepository.findByGoogleId(googleId);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setLastLoginAt(java.time.LocalDateTime.now());
                return userRepository.save(user);
            }

            // Check if user exists by email
            userOpt = userRepository.findByEmail(email);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setGoogleId(googleId);
                if (user.getAvatarUrl() == null && pictureUrl != null) {
                    user.setAvatarUrl(pictureUrl);
                }
                user.setLastLoginAt(java.time.LocalDateTime.now());
                return userRepository.save(user);
            }

            // Create new user
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setGoogleId(googleId);
            newUser.setDisplayName(name != null ? name : email);
            newUser.setAvatarUrl(pictureUrl);
            newUser.setIsEmailConfirmed(true);
            newUser.setIsActive(true);
            newUser.setIsDeleted(false);
            newUser.setCreatedAt(java.time.LocalDateTime.now());
            newUser.setLastLoginAt(java.time.LocalDateTime.now());

            // Assign default role
            Optional<Role> defaultRole = roleRepository.findByName("ROLE_CANDIDATE");
            if (defaultRole.isEmpty()) {
                defaultRole = roleRepository.findByName("ROLE_USER");
            }
            if (defaultRole.isPresent()) {
                newUser.setRoles(new HashSet<>());
                newUser.getRoles().add(defaultRole.get());
            }

            return userService.saveUser(newUser);
            */
        } catch (Exception e) {
            throw new RuntimeException("Google authentication failed: " + e.getMessage(), e);
        }
    }
}
