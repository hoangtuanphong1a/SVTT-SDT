package org.example.backend.module.savedjob.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.response.ApiResponse;
import org.example.backend.module.savedjob.service.SavedJobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/saved-jobs")
@RequiredArgsConstructor
public class SavedJobController {
    
    private final SavedJobService savedJobService;
    
    @PostMapping("/{jobId}")
    public ResponseEntity<ApiResponse<Void>> saveJob(
            @PathVariable Long jobId,
            @RequestParam Long userId) {
        savedJobService.saveJob(userId, jobId);
        return ResponseEntity.ok(ApiResponse.success("Job saved successfully", null));
    }
    
    @DeleteMapping("/{jobId}")
    public ResponseEntity<ApiResponse<Void>> unsaveJob(
            @PathVariable Long jobId,
            @RequestParam Long userId) {
        savedJobService.unsaveJob(userId, jobId);
        return ResponseEntity.ok(ApiResponse.success("Job removed from saved list", null));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<Long>>> getSavedJobs(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Long> savedJobIds = savedJobService.getSavedJobIdsByUserId(userId, pageable);
        return ResponseEntity.ok(ApiResponse.success(savedJobIds));
    }
    
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Long>>> getAllSavedJobs(@RequestParam Long userId) {
        List<Long> savedJobIds = savedJobService.getSavedJobIdsByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(savedJobIds));
    }
    
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getSavedJobsCount(@RequestParam Long userId) {
        long count = savedJobService.countSavedJobsByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(Map.of("count", count)));
    }
    
    @GetMapping("/{jobId}/status")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> isJobSaved(
            @PathVariable Long jobId,
            @RequestParam Long userId) {
        boolean isSaved = savedJobService.isJobSaved(userId, jobId);
        return ResponseEntity.ok(ApiResponse.success(Map.of("isSaved", isSaved)));
    }
}