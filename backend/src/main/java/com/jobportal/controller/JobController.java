package com.jobportal.controller;

import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepository;
import com.jobportal.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<?> getAllJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Integer minSalary,
            @RequestParam(required = false) Integer maxSalary,
            @RequestParam(required = false) String jobType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Job> jobs = jobService.searchJobs(keyword, categoryId, location, minSalary, maxSalary, jobType, page, size);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        Optional<Job> job = jobRepository.findById(id);
        return job.isPresent() ? ResponseEntity.ok(job.get()) : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<?> createJob(@Valid @RequestBody Job job) {
        Job savedJob = jobService.createJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<?> updateJob(@PathVariable Long id, @Valid @RequestBody Job job) {
        Job updatedJob = jobService.updateJob(id, job);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<?> getJobsByCompany(@PathVariable Long companyId) {
        List<Job> jobs = jobRepository.findByCompanyId(companyId);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/active")
    public ResponseEntity<?> getActiveJobs() {
        List<Job> jobs = jobRepository.findActiveJobsOrderByPostedAt();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/featured")
    public ResponseEntity<?> getFeaturedJobs() {
        List<Job> jobs = jobRepository.findActiveJobsOrderByViews();
        return ResponseEntity.ok(jobs);
    }
}