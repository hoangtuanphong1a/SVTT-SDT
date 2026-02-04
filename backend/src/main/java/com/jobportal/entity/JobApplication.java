package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "JobApplications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ApplicationId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "JobId", nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "JobSeekerProfileId", nullable = false)
    private JobSeekerProfile jobSeekerProfile;

    @ManyToOne
    @JoinColumn(name = "CVId")
    private CV cv;

    @Column(name = "CoverLetter")
    private String coverLetter;

    @Column(name = "Status", nullable = false)
    private String status;

    @Column(name = "AppliedAt")
    private LocalDateTime appliedAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @Column(name = "IsDeleted")
    private Boolean isDeleted;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL)
    private Set<ApplicationEvent> applicationEvents;
}