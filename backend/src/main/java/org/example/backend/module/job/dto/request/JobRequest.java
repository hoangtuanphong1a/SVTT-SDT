package org.example.backend.module.job.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.common.enums.ExperienceLevel;
import org.example.backend.common.enums.JobType;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {
    
    private Long companyId;
    
    @NotBlank(message = "Job title is required")
    @Size(min = 5, max = 200, message = "Job title must be between 5 and 200 characters")
    private String title;
    
    @NotBlank(message = "Job description is required")
    @Size(min = 20, max = 1000, message = "Job description must be between 20 and 1000 characters")
    private String description;
    
    @Size(max = 1000, message = "Requirements cannot exceed 1000 characters")
    private String requirements;
    
    @Size(max = 1000, message = "Responsibilities cannot exceed 1000 characters")
    private String responsibilities;
    
    @NotNull(message = "Job type is required")
    private JobType jobType;
    
    @NotNull(message = "Experience level is required")
    private ExperienceLevel experienceLevel;
    
    @DecimalMin(value = "0.0", message = "Minimum salary must be positive")
    private BigDecimal salaryMin;
    
    @DecimalMin(value = "0.0", message = "Maximum salary must be positive")
    private BigDecimal salaryMax;
    
    @Size(max = 200, message = "Location cannot exceed 200 characters")
    private String location;
    
    private Boolean isRemote = false;
}