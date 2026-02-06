package org.example.backend.module.analytics.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.response.ApiResponse;
import org.example.backend.module.analytics.dto.AdminDashboardResponse;
import org.example.backend.module.analytics.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    
    private final AnalyticsService analyticsService;
    
    @GetMapping("/admin/dashboard")
    public ResponseEntity<ApiResponse<AdminDashboardResponse>> getAdminDashboard() {
        AdminDashboardResponse stats = analyticsService.getAdminDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
    
    @GetMapping("/employer/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getEmployerDashboard(
            @RequestParam Long companyId) {
        Map<String, Object> stats = analyticsService.getEmployerDashboardStats(companyId);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
    
    @GetMapping("/jobseeker/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getJobSeekerDashboard(
            @RequestParam Long userId) {
        Map<String, Object> stats = analyticsService.getJobSeekerDashboardStats(userId);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}