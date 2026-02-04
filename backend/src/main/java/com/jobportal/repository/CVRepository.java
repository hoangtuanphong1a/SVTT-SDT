package com.jobportal.repository;

import com.jobportal.entity.CV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CVRepository extends JpaRepository<CV, Long> {
    List<CV> findByJobSeekerProfileId(Long jobSeekerProfileId);

    List<CV> findByJobSeekerProfileUserId(Long userId);

    List<CV> findByIsPrimaryTrue();

    List<CV> findByIsPublicTrue();

    @Query("SELECT c FROM CV c WHERE c.jobSeekerProfile.user.id = :userId AND c.isPrimary = true")
    Optional<CV> findPrimaryCVByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM CV c WHERE c.jobSeekerProfile.user.id = :userId")
    List<CV> findByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM CV c WHERE c.jobSeekerProfile.id = :jobSeekerProfileId AND c.isPrimary = true")
    Optional<CV> findPrimaryCVByJobSeekerProfileId(@Param("jobSeekerProfileId") Long jobSeekerProfileId);

    @Query("SELECT c FROM CV c WHERE c.jobSeekerProfile.user.id = :userId AND c.isPublic = true")
    List<CV> findPublicCVsByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM CV c WHERE c.jobSeekerProfile.user.id = :userId AND (c.title LIKE %:keyword% OR c.structuredData LIKE %:keyword%)")
    List<CV> searchCVsByUserId(@Param("userId") Long userId, @Param("keyword") String keyword);
}