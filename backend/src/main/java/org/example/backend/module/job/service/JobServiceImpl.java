
package org.example.backend.module.job.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.ResourceNotFoundException;
import org.example.backend.module.job.dto.request.JobRequest;
import org.example.backend.module.job.dto.response.JobResponse;
import org.example.backend.module.job.entity.Job;
import org.example.backend.module.job.mapper.JobMapper;
import org.example.backend.module.job.repository.JobRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    
    private final JobRepository jobRepository;
    private final JobMapper jobMapper;
    
    @Override
    public JobResponse createJob(JobRequest request, Long companyId) {
        request.setCompanyId(companyId);
        Job job = jobMapper.toEntity(request);
        
        Job savedJob = jobRepository.save(job);
        
        return jobMapper.toResponse(savedJob);
    }
    
    @Override
    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id.toString()));
        
        return jobMapper.toResponse(job);
    }
    
    @Override
    public Page<JobResponse> getJobsByCompanyId(Long companyId, Pageable pageable) {
        return jobRepository.findByCompanyId(companyId, pageable)
                .map(jobMapper::toResponse);
    }
    
    @Override
    public Page<JobResponse> getActiveJobs(Pageable pageable) {
        return jobRepository.findByIsActiveTrue(pageable)
                .map(jobMapper::toResponse);
    }
    
    @Override
    public Page<JobResponse> searchJobs(String title, String location, String jobType, 
                                       String experienceLevel, Double minSalary, Pageable pageable) {
        BigDecimal minSalaryDecimal = minSalary != null ? BigDecimal.valueOf(minSalary) : null;
        
        return jobRepository.findActiveJobsWithFilters(
                title, location, jobType, experienceLevel, minSalaryDecimal, pageable
        ).map(jobMapper::toResponse);
    }
    
    @Override
    public JobResponse updateJob(Long id, JobRequest request, Long companyId) {
        Job job = jobRepository.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id.toString()));
        
        request.setCompanyId(companyId);
        jobMapper.update(request, job);
        
        Job updatedJob = jobRepository.save(job);
        
        return jobMapper.toResponse(updatedJob);
    }
    
    @Override
    public void deleteJob(Long id, Long companyId) {
        Job job = jobRepository.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id.toString()));
        
        job.setIsActive(false);
        jobRepository.save(job);
    }
    
    @Override
    public void activateJob(Long id, Long companyId) {
        Job job = jobRepository.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id.toString()));
        
        job.setIsActive(true);
        jobRepository.save(job);
    }
    
    @Override
    public void deactivateJob(Long id, Long companyId) {
        Job job = jobRepository.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id.toString()));
        
        job.setIsActive(false);
        jobRepository.save(job);
    }
}
