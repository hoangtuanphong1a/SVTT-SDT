package org.example.backend.module.job.repository;

import org.example.backend.common.base.BaseRepository;
import org.example.backend.module.job.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends BaseRepository<Job, Long> {
    
    Page<Job> findByCompanyId(Long companyId, Pageable pageable);
    
    Page<Job> findByIsActiveTrue(Pageable pageable);
    
    @Query("SELECT j FROM Job j WHERE j.isActive = true " +
           "AND (:title IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :title, '%'))) " +
           "AND (:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) " +
           "AND (:jobType IS NULL OR j.jobType = :jobType) " +
           "AND (:experienceLevel IS NULL OR j.experienceLevel = :experienceLevel) " +
           "AND (:minSalary IS NULL OR j.salaryMin >= :minSalary)")
    Page<Job> findActiveJobsWithFilters(
            @Param("title") String title,
            @Param("location") String location,
            @Param("jobType") String jobType,
            @Param("experienceLevel") String experienceLevel,
            @Param("minSalary") BigDecimal minSalary,
            Pageable pageable
    );
    
    List<Job> findByCompanyIdAndIsActiveTrue(Long companyId);
    
    Optional<Job> findByIdAndCompanyId(Long id, Long companyId);
}