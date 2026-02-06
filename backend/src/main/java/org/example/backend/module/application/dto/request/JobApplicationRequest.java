package org.example.backend.module.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationRequest {
    
    private Long jobId;
    
    private String coverLetter;
    
    private String cvUrl;
    
    private String portfolioUrl;
    
    private Long expectedSalary;
    
    private String availableFrom;
    
    private String notes;
}