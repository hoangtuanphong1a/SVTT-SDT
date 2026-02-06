package org.example.backend.module.job.service;

import org.example.backend.module.job.dto.request.JobRequest;
import org.example.backend.module.job.dto.response.JobResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface JobService {
    
    JobResponse createJob(JobRequest request, Long companyId);
    
    JobResponse getJobById(Long id);
    
    Page<JobResponse> getJobsByCompanyId(Long companyId, Pageable pageable);
    
    Page<JobResponse> getActiveJobs(Pageable pageable);
    
    Page<JobResponse> searchJobs(String title, String location, String jobType, 
                                String experienceLevel, Double minSalary, Pageable pageable);
    
    JobResponse updateJob(Long id, JobRequest request, Long companyId);
    
    void deleteJob(Long id, Long companyId);
    
    void activateJob(Long id, Long companyId);
    
    void deactivateJob(Long id, Long companyId);
}