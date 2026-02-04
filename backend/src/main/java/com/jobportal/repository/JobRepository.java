package com.jobportal.repository;

import com.jobportal.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCompanyId(Long companyId);

    List<Job> findByStatus(String status);

    @Query("SELECT j FROM Job j WHERE j.company.id = :companyId AND j.status = :status")
    List<Job> findByCompanyIdAndStatus(@Param("companyId") Long companyId, @Param("status") String status);

    @Query("SELECT j FROM Job j WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))")
    Page<Job> searchJobs(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.category.id = :categoryId")
    Page<Job> findByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query("SELECT j FROM Job j WHERE LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))")
    Page<Job> findByLocation(@Param("location") String location, Pageable pageable);

    @Query("SELECT j FROM Job j WHERE (j.salaryMin >= :minSalary OR :minSalary IS NULL) AND " +
           "(j.salaryMax <= :maxSalary OR :maxSalary IS NULL)")
    Page<Job> findBySalaryRange(@Param("minSalary") Integer minSalary,
                                   @Param("maxSalary") Integer maxSalary, Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.jobType = :jobType")
    Page<Job> findByJobType(@Param("jobType") String jobType, Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.status = 'Active' ORDER BY j.postedAt DESC")
    List<Job> findActiveJobsOrderByPostedAt();

    @Query("SELECT j FROM Job j WHERE j.status = 'Active' ORDER BY j.viewsCount DESC")
    List<Job> findActiveJobsOrderByViews();

    Optional<Job> findBySlug(String slug);
}