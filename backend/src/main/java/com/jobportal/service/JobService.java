package com.jobportal.service;

import com.jobportal.entity.*;
import com.jobportal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobCategoryRepository jobCategoryRepository;

    @Autowired
    private JobSkillRepository jobSkillRepository;

    @Autowired
    private JobTagRepository jobTagRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private JobJobTagRepository jobJobTagRepository;

    // Create a new job
    public Job createJob(Job job) {
        job.setCreatedAt(LocalDateTime.now());
        job.setUpdatedAt(LocalDateTime.now());
        job.setStatus("Active");
        job.setViewsCount(0);

        // Set company relationship
        Company company = companyRepository.findById(job.getCompany().getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        job.setCompany(company);

        // Set category if provided
        if (job.getCategory() != null && job.getCategory().getId() != null) {
            JobCategory category = jobCategoryRepository.findById(job.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            job.setCategory(category);
        }

        Job savedJob = jobRepository.save(job);

        // Save job skills
        if (job.getJobSkills() != null) {
            for (JobSkill jobSkill : job.getJobSkills()) {
                Skill skill = skillRepository.findById(jobSkill.getSkill().getId())
                        .orElseThrow(() -> new RuntimeException("Skill not found"));
                JobSkill newJobSkill = new JobSkill();
                newJobSkill.setJob(savedJob);
                newJobSkill.setSkill(skill);
                jobSkillRepository.save(newJobSkill);
            }
        }

        // Save job tags
        if (job.getJobJobTags() != null) {
            for (JobJobTag jobJobTag : job.getJobJobTags()) {
                JobTag jobTag = jobTagRepository.findById(jobJobTag.getJobTag().getId())
                        .orElseThrow(() -> new RuntimeException("JobTag not found"));
                JobJobTag newJobJobTag = new JobJobTag();
                newJobJobTag.setJob(savedJob);
                newJobJobTag.setJobTag(jobTag);
                jobJobTagRepository.save(newJobJobTag);
            }
        }

        return savedJob;
    }

    // Update an existing job
    public Job updateJob(Long id, Job job) {
        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        existingJob.setTitle(job.getTitle());
        existingJob.setSlug(job.getSlug());
        existingJob.setShortDescription(job.getShortDescription());
        existingJob.setDescription(job.getDescription());
        existingJob.setRequirements(job.getRequirements());
        existingJob.setBenefits(job.getBenefits());
        existingJob.setSalaryMin(job.getSalaryMin());
        existingJob.setSalaryMax(job.getSalaryMax());
        existingJob.setCurrency(job.getCurrency());
        existingJob.setJobType(job.getJobType());
        existingJob.setLocation(job.getLocation());
        existingJob.setStatus(job.getStatus());
        existingJob.setExpiresAt(job.getExpiresAt());
        existingJob.setUpdatedAt(LocalDateTime.now());

        // Update category if provided
        if (job.getCategory() != null && job.getCategory().getId() != null) {
            JobCategory category = jobCategoryRepository.findById(job.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            existingJob.setCategory(category);
        }

        Job updatedJob = jobRepository.save(existingJob);

        // Update job skills
        jobSkillRepository.deleteByJobId(id);
        if (job.getJobSkills() != null) {
            for (JobSkill jobSkill : job.getJobSkills()) {
                Skill skill = skillRepository.findById(jobSkill.getSkill().getId())
                        .orElseThrow(() -> new RuntimeException("Skill not found"));
                JobSkill newJobSkill = new JobSkill();
                newJobSkill.setJob(updatedJob);
                newJobSkill.setSkill(skill);
                jobSkillRepository.save(newJobSkill);
            }
        }

        // Update job tags
        jobJobTagRepository.deleteByJobId(id);
        if (job.getJobJobTags() != null) {
            for (JobJobTag jobJobTag : job.getJobJobTags()) {
                JobTag jobTag = jobTagRepository.findById(jobJobTag.getJobTag().getId())
                        .orElseThrow(() -> new RuntimeException("JobTag not found"));
                JobJobTag newJobJobTag = new JobJobTag();
                newJobJobTag.setJob(updatedJob);
                newJobJobTag.setJobTag(jobTag);
                jobJobTagRepository.save(newJobJobTag);
            }
        }

        return updatedJob;
    }

    // Delete a job
    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        jobRepository.delete(job);
    }

    // Get job by ID
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

// Get all jobs with pagination and filtering
    public Page<Job> searchJobs(String keyword, Long categoryId, String location,
                                   Integer minSalary, Integer maxSalary, String jobType,
                                   int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "postedAt"));
        Page<Job> jobPage;

        if (keyword != null && !keyword.trim().isEmpty()) {
            jobPage = jobRepository.searchJobs(keyword, pageable);
        } else if (categoryId != null) {
            jobPage = jobRepository.findByCategoryId(categoryId, pageable);
        } else if (location != null && !location.trim().isEmpty()) {
            jobPage = jobRepository.findByLocation(location, pageable);
        } else if (minSalary != null || maxSalary != null) {
            jobPage = jobRepository.findBySalaryRange(minSalary, maxSalary, pageable);
        } else if (jobType != null && !jobType.trim().isEmpty()) {
            jobPage = jobRepository.findByJobType(jobType, pageable);
        } else {
            jobPage = jobRepository.findAll(pageable);
        }

        return jobPage;
    }

    // Get jobs by company
    public List<Job> getJobsByCompany(Long companyId) {
        return jobRepository.findByCompanyId(companyId);
    }

    // Get active jobs ordered by posted date
    public List<Job> getActiveJobsOrderByPostedAt() {
        return jobRepository.findActiveJobsOrderByPostedAt();
    }

    // Get active jobs ordered by views
    public List<Job> getActiveJobsOrderByViews() {
        return jobRepository.findActiveJobsOrderByViews();
    }

    // Increment job views
    public void incrementJobViews(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        job.setViewsCount(job.getViewsCount() + 1);
        jobRepository.save(job);
    }

    // Get job by slug
    public Job getJobBySlug(String slug) {
        return jobRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }
}