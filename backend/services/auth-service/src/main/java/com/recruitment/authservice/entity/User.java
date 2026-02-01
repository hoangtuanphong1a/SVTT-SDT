package com.recruitment.authservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Users")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId")
    private Integer userId;

    @Column(name = "Email", nullable = false, unique = true, length = 256)
    private String email;

    @Column(name = "PasswordHash", length = 512)
    private String passwordHash;

    @Column(name = "IsEmailConfirmed", nullable = false)
    private Boolean isEmailConfirmed = false;

    @CreatedDate
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "LastLoginAt")
    private LocalDateTime lastLoginAt;

    @Column(name = "IsActive", nullable = false)
    private Boolean isActive = true;

    @Column(name = "IsDeleted", nullable = false)
    private Boolean isDeleted = false;

    @Column(name = "DisplayName", length = 200)
    private String displayName;

    @Column(name = "AvatarUrl", length = 1000)
    private String avatarUrl;

    @Column(name = "PreferredLocale", length = 20)
    private String preferredLocale;

    @Column(name = "GoogleId", length = 200)
    private String googleId;

    @Column(name = "LinkedInId", length = 200)
    private String linkedInId;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "UserRoles",
        joinColumns = @JoinColumn(name = "UserId"),
        inverseJoinColumns = @JoinColumn(name = "RoleId")
    )
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    // Helper methods
    public void addRole(Role role) {
        this.roles.add(role);
    }

    public void removeRole(Role role) {
        this.roles.remove(role);
    }
}
