package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "EmployerSubscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EmployerSubscriptionId")
    private Long id;

@ManyToOne
@JoinColumn(name = "EmployerProfileId", nullable = false)
private EmployerProfile employerProfile;

    @ManyToOne
    @JoinColumn(name = "PlanId", nullable = false)
    private SubscriptionPlan plan;

    @Column(name = "StartedAt")
    private LocalDateTime startedAt;

    @Column(name = "ExpiresAt")
    private LocalDateTime expiresAt;

    @Column(name = "IsActive")
    private Boolean isActive;
}