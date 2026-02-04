package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "JobSeekerProfiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobSeekerProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "JobSeekerProfileId")
    private Long id;

    @OneToOne
    @JoinColumn(name = "UserId", nullable = false, unique = true)
    private User user;

    @Column(name = "FullName")
    private String fullName;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "DOB")
    private String dob;

    @Column(name = "Location")
    private String location;

    @Column(name = "Summary")
    private String summary;

    @Column(name = "CurrentTitle")
    private String currentTitle;

    @Column(name = "YearsExperience")
    private Integer yearsExperience;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "jobSeekerProfile", cascade = CascadeType.ALL)
    private Set<CV> cvs;

    @OneToMany(mappedBy = "jobSeekerProfile", cascade = CascadeType.ALL)
    private Set<JobApplication> jobApplications;

    @OneToMany(mappedBy = "jobSeekerProfile", cascade = CascadeType.ALL)
    private Set<SavedJob> savedJobs;
}