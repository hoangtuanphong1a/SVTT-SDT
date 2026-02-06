package org.example.backend.module.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.common.enums.ApplicationStatus;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationResponse {
    
    private Long id;
    
    private Long jobId;
    
    private Long userId;
    
    private ApplicationStatus status;
    
    private String coverLetter;
    
    private String cvUrl;
    
    private String portfolioUrl;
    
    private Long expectedSalary;
    
    private String availableFrom;
    
    private String notes;
    
    private String reviewNotes;
    
    private String interviewDate;
    
    private String interviewLocation;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    // Job info
    private String jobTitle;
    private String companyName;
    private String jobLocation;
    
    // User info
    private String applicantName;
    private String applicantEmail;
}