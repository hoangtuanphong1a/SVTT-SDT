package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "CVs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CV {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CVId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "JobSeekerProfileId", nullable = false)
    private JobSeekerProfile jobSeekerProfile;

    @ManyToOne
    @JoinColumn(name = "CVTemplateId")
    private CVTemplate cvTemplate;

    @Column(name = "Title")
    private String title;

    @Column(name = "StructuredData")
    private String structuredData;

    @Column(name = "FileUrl")
    private String fileUrl;

    @Column(name = "IsPrimary")
    private Boolean isPrimary;

    @Column(name = "IsPublic")
    private Boolean isPublic;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL)
    private Set<CVView> cvViews;

    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL)
    private Set<JobApplication> jobApplications;
}