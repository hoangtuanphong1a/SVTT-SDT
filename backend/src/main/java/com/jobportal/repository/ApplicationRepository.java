package com.jobportal.repository;

import com.jobportal.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByJobId(Long jobId);

    List<JobApplication> findByJobSeekerProfileId(Long jobSeekerProfileId);

    List<JobApplication> findByJobSeekerProfileUserId(Long userId);

    List<JobApplication> findByStatus(String status);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.job.id = :jobId AND ja.status = :status")
    List<JobApplication> findByJobIdAndStatus(@Param("jobId") Long jobId, @Param("status") String status);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.jobSeekerProfile.id = :jobSeekerProfileId AND ja.status = :status")
    List<JobApplication> findByJobSeekerProfileIdAndStatus(@Param("jobSeekerProfileId") Long jobSeekerProfileId, @Param("status") String status);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.jobSeekerProfile.user.id = :userId AND ja.status = :status")
    List<JobApplication> findByUserIdAndStatus(@Param("userId") Long userId, @Param("status") String status);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.job.id = :jobId AND ja.jobSeekerProfile.user.id = :userId")
    Optional<JobApplication> findByJobIdAndUserId(@Param("jobId") Long jobId, @Param("userId") Long userId);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.jobSeekerProfile.user.id = :userId ORDER BY ja.appliedAt DESC")
    List<JobApplication> findByUserIdOrderByAppliedAtDesc(@Param("userId") Long userId);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.job.id = :jobId ORDER BY ja.appliedAt DESC")
    List<JobApplication> findByJobIdOrderByAppliedAtDesc(@Param("jobId") Long jobId);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.jobSeekerProfile.user.id = :userId AND ja.isDeleted = false")
    List<JobApplication> findActiveApplicationsByUserId(@Param("userId") Long userId);
}