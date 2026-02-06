package org.example.backend.module.application.repository;

import org.example.backend.module.application.entity.JobApplication;
import org.example.backend.common.enums.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    
    List<JobApplication> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    Page<JobApplication> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    
    List<JobApplication> findByJobIdOrderByCreatedAtDesc(Long jobId);
    
    Page<JobApplication> findByJobIdOrderByCreatedAtDesc(Long jobId, Pageable pageable);
    
    Optional<JobApplication> findByJobIdAndUserId(Long jobId, Long userId);
    
    boolean existsByJobIdAndUserId(Long jobId, Long userId);
    
    long countByJobId(Long jobId);
    
    long countByJobIdAndStatus(Long jobId, ApplicationStatus status);
    
    @Query("SELECT ja FROM JobApplication ja WHERE ja.jobId = :jobId AND ja.status = :status ORDER BY ja.createdAt DESC")
    Page<JobApplication> findByJobIdAndStatus(@Param("jobId") Long jobId, @Param("status") ApplicationStatus status, Pageable pageable);
}
