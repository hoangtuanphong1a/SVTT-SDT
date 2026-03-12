 package org.example.backend.module.jobseeker.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.response.ApiResponse;
import org.example.backend.module.jobseeker.dto.request.UpdateJobSeekerProfileRequest;
import org.example.backend.module.jobseeker.dto.response.JobSeekerProfileResponse;
import org.example.backend.module.jobseeker.service.JobSeekerProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobseeker/profile")
@RequiredArgsConstructor
public class JobSeekerProfileController {
    
    private final JobSeekerProfileService jobSeekerProfileService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<JobSeekerProfileResponse>> getMyProfile(
            @RequestAttribute("userId") Long userId) {
        
        JobSeekerProfileResponse profile = jobSeekerProfileService.getMyProfile(userId);
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", profile));
    }
    
    @PutMapping
    public ResponseEntity<ApiResponse<Void>> updateProfile(
            @RequestAttribute("userId") Long userId,
            @RequestBody UpdateJobSeekerProfileRequest request) {
        
        jobSeekerProfileService.update(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", null));
    }
}