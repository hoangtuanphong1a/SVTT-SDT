package org.example.backend.module.cv.repository;

import org.example.backend.module.cv.entity.CV;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CVRepository extends JpaRepository<CV, Long> {
    
    List<CV> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    Page<CV> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    
    Optional<CV> findByIdAndUserId(Long id, Long userId);
    
    Optional<CV> findByUserIdAndIsDefaultTrue(Long userId);
    
    long countByUserId(Long userId);
    
    boolean existsByUserIdAndIsDefaultTrue(Long userId);
}