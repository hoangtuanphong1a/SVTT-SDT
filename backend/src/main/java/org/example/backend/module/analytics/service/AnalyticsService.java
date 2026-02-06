package org.example.backend.module.analytics.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.module.analytics.dto.AdminDashboardResponse;
import org.example.backend.module.application.repository.JobApplicationRepository;
import org.example.backend.module.auth.repository.UserRepository;
import org.example.backend.module.company.repository.CompanyRepository;
import org.example.backend.module.cv.repository.CVRepository;
import org.example.backend.module.job.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {
    
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;
    private final CompanyRepository companyRepository;
    private final CVRepository cvRepository;
    
    public AdminDashboardResponse getAdminDashboardStats() {
        long totalUsers = userRepository.count();
        long totalJobs = jobRepository.count();
        long totalApplications = applicationRepository.count();
        long totalCompanies = companyRepository.count();
        long totalCVs = cvRepository.count();
        
        // Count users by role - simplified
        Map<String, Long> usersByRole = new HashMap<>();
        usersByRole.put("JOB_SEEKER", 0L);
        usersByRole.put("EMPLOYER", 0L);
        usersByRole.put("ADMIN", 0L);
        
        // Count jobs by type - simplified
        Map<String, Long> jobsByType = new HashMap<>();
        jobsByType.put("FULL_TIME", 0L);
        jobsByType.put("PART_TIME", 0L);
        jobsByType.put("INTERNSHIP", 0L);
        jobsByType.put("CONTRACT", 0L);
        
        // Count applications by status - simplified
        Map<String, Long> applicationsByStatus = new HashMap<>();
        applicationsByStatus.put("PENDING", 0L);
        applicationsByStatus.put("REVIEWING", 0L);
        applicationsByStatus.put("INTERVIEW", 0L);
        applicationsByStatus.put("ACCEPTED", 0L);
        applicationsByStatus.put("REJECTED", 0L);
        
        return AdminDashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalJobs(totalJobs)
                .totalApplications(totalApplications)
                .totalCompanies(totalCompanies)
                .totalCVs(totalCVs)
                .usersByRole(usersByRole)
                .jobsByType(jobsByType)
                .applicationsByStatus(applicationsByStatus)
                .newUsersToday(0L)
                .newJobsToday(0L)
                .newApplicationsToday(0L)
                .usersTrend(new HashMap<>())
                .jobsTrend(new HashMap<>())
                .build();
    }
    
    public Map<String, Object> getEmployerDashboardStats(Long companyId) {
        Map<String, Object> stats = new HashMap<>();
        
        long totalJobs = jobRepository.count();
        long totalApplications = applicationRepository.count();
        long pendingApplications = 0L;
        long activeJobs = 0L;
        
        stats.put("totalJobs", totalJobs);
        stats.put("activeJobs", activeJobs);
        stats.put("totalApplications", totalApplications);
        stats.put("pendingApplications", pendingApplications);
        
        return stats;
    }
    
    public Map<String, Object> getJobSeekerDashboardStats(Long userId) {
        Map<String, Object> stats = new HashMap<>();
        
        long totalApplications = applicationRepository.findByUserIdOrderByCreatedAtDesc(userId).size();
        long pendingApplications = 0L;
        long savedJobs = 0L;
        long cvCount = cvRepository.countByUserId(userId);
        
        stats.put("totalApplications", totalApplications);
        stats.put("pendingApplications", pendingApplications);
        stats.put("savedJobs", savedJobs);
        stats.put("cvCount", cvCount);
        
        return stats;
    }
}
