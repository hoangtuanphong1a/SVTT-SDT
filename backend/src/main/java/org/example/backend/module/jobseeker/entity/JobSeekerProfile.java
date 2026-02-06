package org.example.backend.module.jobseeker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.common.base.BaseEntity;
import org.example.backend.module.auth.entity.User;

import java.time.LocalDate;

@Entity
@Table(name = "JobSeekerProfiles")
@Getter
@Setter
public class JobSeekerProfile extends BaseEntity {
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, length = 150)
    private String fullName;

    @Column(nullable = true, length = 20)
    private String phone;

    private LocalDate DOB;
    private String location;
    private String summary;
    private String currentTitle;
    private Integer yearsExperience;
}
