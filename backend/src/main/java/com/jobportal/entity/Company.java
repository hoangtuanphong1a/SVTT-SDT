package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "Companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CompanyId")
    private Long id;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Slug", nullable = false, unique = true)
    private String slug;

    @Column(name = "LogoUrl")
    private String logoUrl;

    @Column(name = "BannerUrl")
    private String bannerUrl;

    @Column(name = "Industry")
    private String industry;

    @Column(name = "CompanySize")
    private String companySize;

    @Column(name = "Website")
    private String website;

    @Column(name = "Location")
    private String location;

    @Column(name = "Description")
    private String description;

    @Column(name = "IsVerified")
    private Boolean isVerified;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private Set<Job> jobs;

    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL)
    private EmployerProfile employerProfile;
}