package org.example.backend.module.application.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.module.application.dto.request.JobApplicationRequest;
import org.example.backend.module.application.dto.response.JobApplicationResponse;
import org.example.backend.module.application.entity.JobApplication;
import org.example.backend.module.application.repository.JobApplicationRepository;
import org.example.backend.common.enums.ApplicationStatus;
import org.example.backend.module.notification.service.NotificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobApplicationService {
    
    private final JobApplicationRepository applicationRepository;
    private final NotificationService notificationService;
    
    @Transactional
    public JobApplicationResponse applyForJob(Long userId, JobApplicationRequest request) {
        // Check if already applied
        if (applicationRepository.existsByJobIdAndUserId(request.getJobId(), userId)) {
            throw new RuntimeException("You have already applied for this job");
        }
        
        JobApplication application = JobApplication.builder()
                .jobId(request.getJobId())
                .userId(userId)
                .coverLetter(request.getCoverLetter())
                .cvUrl(request.getCvUrl())
                .portfolioUrl(request.getPortfolioUrl())
                .expectedSalary(request.getExpectedSalary())
                .availableFrom(request.getAvailableFrom())
                .notes(request.getNotes())
                .status(ApplicationStatus.PENDING)
                .build();
        
        JobApplication saved = applicationRepository.save(application);
        
        // TODO: Send notification to job owner about new application
        
        return mapToResponse(saved);
    }
    
    public List<JobApplicationResponse> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public Page<JobApplicationResponse> getApplicationsByUserId(Long userId, Pageable pageable) {
        return applicationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable)
                .map(this::mapToResponse);
    }
    
    public List<JobApplicationResponse> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobIdOrderByCreatedAtDesc(jobId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public Page<JobApplicationResponse> getApplicationsByJobId(Long jobId, Pageable pageable) {
        return applicationRepository.findByJobIdOrderByCreatedAtDesc(jobId, pageable)
                .map(this::mapToResponse);
    }
    
    public Page<JobApplicationResponse> getApplicationsByJobIdAndStatus(Long jobId, ApplicationStatus status, Pageable pageable) {
        return applicationRepository.findByJobIdAndStatus(jobId, status, pageable)
                .map(this::mapToResponse);
    }
    
    public JobApplicationResponse getApplicationById(Long applicationId) {
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        return mapToResponse(application);
    }
    
    @Transactional
    public JobApplicationResponse updateApplicationStatus(Long applicationId, Long employerId, 
                                                        ApplicationStatus status, String reviewNotes,
                                                        String interviewDate, String interviewLocation) {
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        application.setStatus(status);
        application.setReviewNotes(reviewNotes);
        application.setInterviewDate(interviewDate);
        application.setInterviewLocation(interviewLocation);
        
        JobApplication saved = applicationRepository.save(application);
        
        // Send notification to applicant
        // Note: Commented out due to missing notification module dependency
        // notificationService.createNotification(
        //         application.getUserId(),
        //         getNotificationTitle(status),
        //         getNotificationMessage(status),
        //         org.example.backend.module.notification.enums.NotificationType.APPLICATION_UPDATED,
        //         applicationId,
        //         "JOB_APPLICATION"
        // );
        
        return mapToResponse(saved);
    }
    
    private JobApplicationResponse mapToResponse(JobApplication application) {
        return JobApplicationResponse.builder()
                .id(application.getId())
                .jobId(application.getJobId())
                .userId(application.getUserId())
                .status(application.getStatus())
                .coverLetter(application.getCoverLetter())
                .cvUrl(application.getCvUrl())
                .portfolioUrl(application.getPortfolioUrl())
                .expectedSalary(application.getExpectedSalary())
                .availableFrom(application.getAvailableFrom())
                .notes(application.getNotes())
                .reviewNotes(application.getReviewNotes())
                .interviewDate(application.getInterviewDate())
                .interviewLocation(application.getInterviewLocation())
                .createdAt(application.getCreatedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }
    
    private String getNotificationTitle(ApplicationStatus status) {
        switch (status) {
            case UNDER_REVIEW:
                return "Application Under Review";
            case INTERVIEW:
                return "Interview Invitation";
            case ACCEPTED:
                return "Application Accepted";
            case REJECTED:
                return "Application Not Selected";
            default:
                return "Application Updated";
        }
    }
    
    private String getNotificationMessage(ApplicationStatus status) {
        switch (status) {
            case UNDER_REVIEW:
                return "Your application is now being reviewed by the hiring team.";
            case INTERVIEW:
                return "Congratulations! You have been invited for an interview.";
            case ACCEPTED:
                return "Congratulations! Your application has been accepted.";
            case REJECTED:
                return "Thank you for your interest. Unfortunately, your application was not selected.";
            default:
                return "Your application status has been updated.";
        }
    }
    
    @Transactional
    public void withdrawApplication(Long applicationId, Long userId) {
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        if (!application.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to withdraw this application");
        }
        
        application.setStatus(ApplicationStatus.REJECTED);
        applicationRepository.save(application);
    }
    
    public long countApplicationsByJobId(Long jobId) {
        return applicationRepository.countByJobId(jobId);
    }
}
