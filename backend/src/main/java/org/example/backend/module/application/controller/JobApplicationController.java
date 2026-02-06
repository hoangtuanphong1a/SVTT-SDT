package org.example.backend.module.application.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.enums.ApplicationStatus;
import org.example.backend.common.response.ApiResponse;
import org.example.backend.module.application.dto.request.JobApplicationRequest;
import org.example.backend.module.application.dto.response.JobApplicationResponse;
import org.example.backend.module.application.service.JobApplicationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class JobApplicationController {
    
    private final JobApplicationService applicationService;
    
    // ========== CANDIDATE APIS ==========
    
    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> applyForJob(
            @RequestParam Long userId,
            @RequestBody JobApplicationRequest request) {
        JobApplicationResponse response = applicationService.applyForJob(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Application submitted successfully", response));
    }
    
    @GetMapping("/my-applications")
    public ResponseEntity<ApiResponse<Page<JobApplicationResponse>>> getMyApplications(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<JobApplicationResponse> applications = applicationService.getApplicationsByUserId(userId, pageable);
        return ResponseEntity.ok(ApiResponse.success(applications));
    }
    
    @GetMapping("/my-applications/all")
    public ResponseEntity<ApiResponse<List<JobApplicationResponse>>> getAllMyApplications(
            @RequestParam Long userId) {
        List<JobApplicationResponse> applications = applicationService.getApplicationsByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(applications));
    }
    
    @DeleteMapping("/{applicationId}/withdraw")
    public ResponseEntity<ApiResponse<Void>> withdrawApplication(
            @PathVariable Long applicationId,
            @RequestParam Long userId) {
        applicationService.withdrawApplication(applicationId, userId);
        return ResponseEntity.ok(ApiResponse.success("Application withdrawn successfully", null));
    }
    
    @GetMapping("/{applicationId}")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> getApplication(
            @PathVariable Long applicationId) {
        JobApplicationResponse application = applicationService.getApplicationById(applicationId);
        return ResponseEntity.ok(ApiResponse.success(application));
    }
    
    // ========== EMPLOYER APIS ==========
    
    @GetMapping("/job/{jobId}")
    public ResponseEntity<ApiResponse<Page<JobApplicationResponse>>> getApplicationsByJob(
            @PathVariable Long jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<JobApplicationResponse> applications = applicationService.getApplicationsByJobId(jobId, pageable);
        return ResponseEntity.ok(ApiResponse.success(applications));
    }
    
    @GetMapping("/job/{jobId}/status/{status}")
    public ResponseEntity<ApiResponse<Page<JobApplicationResponse>>> getApplicationsByJobAndStatus(
            @PathVariable Long jobId,
            @PathVariable ApplicationStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<JobApplicationResponse> applications = applicationService.getApplicationsByJobIdAndStatus(jobId, status, pageable);
        return ResponseEntity.ok(ApiResponse.success(applications));
    }
    
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam Long employerId,
            @RequestBody Map<String, String> request) {
        ApplicationStatus status = ApplicationStatus.valueOf(request.get("status"));
        String reviewNotes = request.get("reviewNotes");
        String interviewDate = request.get("interviewDate");
        String interviewLocation = request.get("interviewLocation");
        
        JobApplicationResponse response = applicationService.updateApplicationStatus(
                applicationId, employerId, status, reviewNotes, interviewDate, interviewLocation);
        return ResponseEntity.ok(ApiResponse.success("Application status updated", response));
    }
    
    @GetMapping("/job/{jobId}/count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> countApplicationsByJob(@PathVariable Long jobId) {
        long total = applicationService.countApplicationsByJobId(jobId);
        return ResponseEntity.ok(ApiResponse.success(Map.of("totalApplications", total)));
    }
}