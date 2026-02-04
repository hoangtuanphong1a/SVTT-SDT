package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements org.springframework.security.core.userdetails.UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId")
    private Long id;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name = "PasswordHash")
    private String passwordHash;

    @Column(name = "IsEmailConfirmed")
    private Boolean isEmailConfirmed;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "LastLoginAt")
    private LocalDateTime lastLoginAt;

    @Column(name = "IsActive")
    private Boolean isActive;

    @Column(name = "IsDeleted")
    private Boolean isDeleted;

    @Column(name = "DisplayName")
    private String displayName;

    @Column(name = "AvatarUrl")
    private String avatarUrl;

    @Column(name = "PreferredLocale")
    private String preferredLocale;

    @Column(name = "Bio")
    private String bio;

    @Column(name = "GoogleId")
    private String googleId;

    @Column(name = "LinkedInId")
    private String linkedInId;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "UserRoles",
        joinColumns = @JoinColumn(name = "UserId"),
        inverseJoinColumns = @JoinColumn(name = "RoleId")
    )
    private Set<Role> roles;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private JobSeekerProfile jobSeekerProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private EmployerProfile employerProfile;

    @Override
    public Collection<? extends org.springframework.security.core.GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }
}
