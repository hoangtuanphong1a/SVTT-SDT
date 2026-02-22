package org.example.backend.module.admin.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.response.ApiResponse;
import org.example.backend.module.job.entity.Job;
import org.example.backend.module.job.repository.JobRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/jobs")
@RequiredArgsConstructor
public class AdminJobController {
    
    private final JobRepository jobRepository;
    
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getJobs(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<Job> jobsPage = jobRepository.findAll(
            PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"))
        );
        
        // Filter by status if provided
        List<Job> filteredJobs = jobsPage.getContent();
        if (status != null && !status.isEmpty()) {
            boolean isActive = "active".equalsIgnoreCase(status);
            filteredJobs = filteredJobs.stream()
                .filter(j -> j.getIsActive() == isActive)
                .collect(Collectors.toList());
        }
        
        // Filter by search query
        if (q != null && !q.isEmpty()) {
            String searchQuery = q.toLowerCase();
            filteredJobs = filteredJobs.stream()
                .filter(j -> j.getTitle().toLowerCase().contains(searchQuery))
                .collect(Collectors.toList());
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("jobs", filteredJobs);
        response.put("total", filteredJobs.size());
        response.put("page", page);
        response.put("size", size);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Job>> getJobById(@PathVariable Long id) {
        return jobRepository.findById(id)
            .map(job -> ResponseEntity.ok(ApiResponse.success(job)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<Job>> approveJob(@PathVariable Long id) {
        return jobRepository.findById(id)
            .map(job -> {
                job.setIsActive(true);
                Job updated = jobRepository.save(job);
                return ResponseEntity.ok(ApiResponse.success("Duyệt tin tuyển dụng thành công", updated));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<Job>> rejectJob(@PathVariable Long id) {
        return jobRepository.findById(id)
            .map(job -> {
                job.setIsActive(false);
                Job updated = jobRepository.save(job);
                return ResponseEntity.ok(ApiResponse.success("Từ chối tin tuyển dụng", updated));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteJob(@PathVariable Long id) {
        if (!jobRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        jobRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa tin tuyển dụng thành công", "success"));
    }
}
