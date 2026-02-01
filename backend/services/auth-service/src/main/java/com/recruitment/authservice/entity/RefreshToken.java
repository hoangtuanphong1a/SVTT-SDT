package com.recruitment.authservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "RefreshTokens")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RefreshTokenId")
    private Integer refreshTokenId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserId", nullable = false)
    private User user;

    @Column(name = "TokenHash", nullable = false, length = 512)
    private String tokenHash;

    @Column(name = "DeviceInfo", length = 300)
    private String deviceInfo;

    @Column(name = "IpAddress", length = 100)
    private String ipAddress;

    @Column(name = "ExpiresAt", nullable = false)
    private java.util.Date expiresAt;

    @Column(name = "RevokedAt")
    private LocalDateTime revokedAt;

    @CreatedDate
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public boolean isExpired() {
        return new java.util.Date().after(expiresAt);
    }

    public boolean isRevoked() {
        return revokedAt != null;
    }

    public void revoke() {
        this.revokedAt = LocalDateTime.now();
    }
}
