package org.example.backend.module.job.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.example.backend.common.base.BaseEntity;
import org.example.backend.common.enums.ExperienceLevel;
import org.example.backend.common.enums.JobType;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "jobs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Job extends BaseEntity {
    
    @Column(name = "company_id", nullable = false)
    private Long companyId;
    
    @Column(name = "title", nullable = false)
    private String title;
    
    @Column(name = "description", nullable = false, length = 1000)
    private String description;
    
    @Column(name = "requirements", length = 1000)
    private String requirements;
    
    @Column(name = "responsibilities", length = 1000)
    private String responsibilities;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", nullable = false)
    private JobType jobType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "experience_level", nullable = false)
    private ExperienceLevel experienceLevel;
    
    @Column(name = "salary_min")
    private java.math.BigDecimal salaryMin;
    
    @Column(name = "salary_max")
    private java.math.BigDecimal salaryMax;
    
    @Column(name = "location")
    private String location;
    
    @Column(name = "is_remote")
    private Boolean isRemote = false;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
}