package com.jobportal.repository;

import com.jobportal.entity.JobTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobTagRepository extends JpaRepository<JobTag, Long> {
}