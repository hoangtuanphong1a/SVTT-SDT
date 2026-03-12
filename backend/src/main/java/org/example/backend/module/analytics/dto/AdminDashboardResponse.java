package org.example.backend.module.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
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
    
    // Additional fields expected by frontend
    private Long activeUsers;
    private Long pendingCompanies;
    private List<ActivityItem> recentActivity;
    
    private Map<String, Long> usersByRole;
    private Map<String, Long> jobsByType;
    private Map<String, Long> applicationsByStatus;
    
    private Long newUsersToday;
    private Long newJobsToday;
    private Long newApplicationsToday;
    
    private Map<String, Double> usersTrend;
    private Map<String, Double> jobsTrend;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActivityItem {
        private String icon;
        private String title;
        private String description;
        private String time;
    }
}
