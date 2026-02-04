package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "Jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "JobId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "CompanyId", nullable = false)
    private Company company;

    @ManyToOne
    @JoinColumn(name = "PostedByUserId")
    private EmployerProfile postedByUser;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Slug", nullable = false, unique = true)
    private String slug;

    @Column(name = "ShortDescription")
    private String shortDescription;

    @Column(name = "Description")
    private String description;

    @Column(name = "Requirements")
    private String requirements;

    @Column(name = "Benefits")
    private String benefits;

    @Column(name = "SalaryMin")
    private Integer salaryMin;

    @Column(name = "SalaryMax")
    private Integer salaryMax;

    @Column(name = "Currency")
    private String currency;

    @Column(name = "JobType")
    private String jobType;

    @Column(name = "Location")
    private String location;

    @ManyToOne
    @JoinColumn(name = "CategoryId")
    private JobCategory category;

    @Column(name = "Status", nullable = false)
    private String status;

    @Column(name = "ViewsCount")
    private Integer viewsCount;

    @Column(name = "PostedAt")
    private LocalDateTime postedAt;

    @Column(name = "ExpiresAt")
    private LocalDateTime expiresAt;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private Set<JobSkill> jobSkills = new HashSet<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private Set<JobJobTag> jobJobTags = new HashSet<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private Set<JobApplication> jobApplications = new HashSet<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private Set<JobView> jobViews = new HashSet<>();
}