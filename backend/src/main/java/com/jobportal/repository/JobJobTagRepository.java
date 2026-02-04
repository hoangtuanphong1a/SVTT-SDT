package com.jobportal.repository;

import com.jobportal.entity.JobJobTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface JobJobTagRepository extends JpaRepository<JobJobTag, Long> {
    @Modifying
    @Query("DELETE FROM JobJobTag jjt WHERE jjt.job.id = :jobId")
    void deleteByJobId(@Param("jobId") Long jobId);
}