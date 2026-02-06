package org.example.backend.module.job.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.response.ApiResponse;
import org.example.backend.module.job.dto.request.JobRequest;
import org.example.backend.module.job.dto.response.JobResponse;
import org.example.backend.module.job.service.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {
    
    private final JobService jobService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<JobResponse>> createJob(@RequestBody JobRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long companyId = ((org.example.backend.common.security.SecurityUser) authentication.getPrincipal()).getId();
        
        JobResponse response = jobService.createJob(request, companyId);
        return ResponseEntity.ok(ApiResponse.success("Job created successfully", response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> getJobById(@PathVariable Long id) {
        JobResponse response = jobService.getJobById(id);
        return ResponseEntity.ok(ApiResponse.success("Job retrieved successfully", response));
    }
    
    @GetMapping("/company/my")
    public ResponseEntity<ApiResponse<Page<JobResponse>>> getMyJobs(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long companyId = ((org.example.backend.common.security.SecurityUser) authentication.getPrincipal()).getId();
        
        Page<JobResponse> response = jobService.getJobsByCompanyId(companyId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Jobs retrieved successfully", response));
    }
    
    @GetMapping("/public")
    public ResponseEntity<ApiResponse<Page<JobResponse>>> getActiveJobs(Pageable pageable) {
        Page<JobResponse> response = jobService.getActiveJobs(pageable);
        return ResponseEntity.ok(ApiResponse.success("Active jobs retrieved successfully", response));
    }
    
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<JobResponse>>> searchJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String experienceLevel,
            @RequestParam(required = false) Double minSalary,
            Pageable pageable) {
        
        Page<JobResponse> response = jobService.searchJobs(title, location, jobType, experienceLevel, minSalary, pageable);
        return ResponseEntity.ok(ApiResponse.success("Jobs found successfully", response));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> updateJob(@PathVariable Long id, @RequestBody JobRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long companyId = ((org.example.backend.common.security.SecurityUser) authentication.getPrincipal()).getId();
        
        JobResponse response = jobService.updateJob(id, request, companyId);
        return ResponseEntity.ok(ApiResponse.success("Job updated successfully", response));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long companyId = ((org.example.backend.common.security.SecurityUser) authentication.getPrincipal()).getId();
        
        jobService.deleteJob(id, companyId);
        return ResponseEntity.ok(ApiResponse.success("Job deleted successfully", null));
    }
    
    @PutMapping("/{id}/activate")
    public ResponseEntity<ApiResponse<Void>> activateJob(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long companyId = ((org.example.backend.common.security.SecurityUser) authentication.getPrincipal()).getId();
        
        jobService.activateJob(id, companyId);
        return ResponseEntity.ok(ApiResponse.success("Job activated successfully", null));
    }
    
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<ApiResponse<Void>> deactivateJob(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long companyId = ((org.example.backend.common.security.SecurityUser) authentication.getPrincipal()).getId();
        
        jobService.deactivateJob(id, companyId);
        return ResponseEntity.ok(ApiResponse.success("Job deactivated successfully", null));
    }
}