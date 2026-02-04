package com.jobportal.repository;

import com.jobportal.entity.JobSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface JobSkillRepository extends JpaRepository<JobSkill, Long> {
    @Modifying
    @Query("DELETE FROM JobSkill js WHERE js.job.id = :jobId")
    void deleteByJobId(@Param("jobId") Long jobId);
}