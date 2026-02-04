package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "SavedJobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavedJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SavedJobId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "JobSeekerProfileId", nullable = false)
    private JobSeekerProfile jobSeekerProfile;

    @ManyToOne
    @JoinColumn(name = "JobId", nullable = false)
    private Job job;

    @Column(name = "SavedAt")
    private LocalDateTime savedAt;

    @Column(name = "IsDeleted")
    private Boolean isDeleted;
}