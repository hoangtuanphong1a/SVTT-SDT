package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "EmployerProfiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EmployerProfileId")
    private Long id;

    @OneToOne
    @JoinColumn(name = "UserId", nullable = false, unique = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "CompanyId", nullable = false)
    private Company company;

    @Column(name = "Title")
    private String title;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "postedByUser", cascade = CascadeType.ALL)
    private Set<Job> postedJobs;

@OneToMany(mappedBy = "employerProfile", cascade = CascadeType.ALL)
private Set<EmployerSubscription> subscriptions;
}