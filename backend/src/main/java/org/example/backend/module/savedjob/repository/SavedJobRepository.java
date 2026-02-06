package org.example.backend.module.savedjob.repository;

import org.example.backend.module.savedjob.entity.SavedJob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    
    List<SavedJob> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    Page<SavedJob> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    
    Optional<SavedJob> findByJobIdAndUserId(Long jobId, Long userId);
    
    boolean existsByJobIdAndUserId(Long jobId, Long userId);
    
    long countByUserId(Long userId);
    
    @Query("SELECT sj.jobId FROM SavedJob sj WHERE sj.userId = :userId")
    Page<Long> findSavedJobIdsByUserId(@Param("userId") Long userId, Pageable pageable);
}