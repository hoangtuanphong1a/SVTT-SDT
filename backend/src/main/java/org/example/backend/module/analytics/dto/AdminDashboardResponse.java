package org.example.backend.module.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {
    
    private Long totalUsers;
    private Long totalJobs;
    private Long totalApplications;
    private Long totalCompanies;
    private Long totalCVs;
    
    private Map<String, Long> usersByRole;
    private Map<String, Long> jobsByType;
    private Map<String, Long> applicationsByStatus;
    
    private Long newUsersToday;
    private Long newJobsToday;
    private Long newApplicationsToday;
    
    private Map<String, Double> usersTrend;
    private Map<String, Double> jobsTrend;
}