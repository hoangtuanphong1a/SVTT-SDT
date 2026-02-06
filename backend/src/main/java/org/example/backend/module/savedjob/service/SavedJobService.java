package org.example.backend.module.savedjob.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.module.savedjob.entity.SavedJob;
import org.example.backend.module.savedjob.repository.SavedJobRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavedJobService {
    
    private final SavedJobRepository savedJobRepository;
    
    @Transactional
    public void saveJob(Long userId, Long jobId) {
        if (savedJobRepository.existsByJobIdAndUserId(jobId, userId)) {
            throw new RuntimeException("Job already saved");
        }
        
        SavedJob savedJob = SavedJob.builder()
                .jobId(jobId)
                .userId(userId)
                .build();
        
        savedJobRepository.save(savedJob);
    }
    
    @Transactional
    public void unsaveJob(Long userId, Long jobId) {
        SavedJob savedJob = savedJobRepository.findByJobIdAndUserId(jobId, userId)
                .orElseThrow(() -> new RuntimeException("Saved job not found"));
        
        savedJobRepository.delete(savedJob);
    }
    
    public List<Long> getSavedJobIdsByUserId(Long userId) {
        return savedJobRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(SavedJob::getJobId)
                .toList();
    }
    
    public Page<Long> getSavedJobIdsByUserId(Long userId, Pageable pageable) {
        return savedJobRepository.findSavedJobIdsByUserId(userId, pageable);
    }
    
    public long countSavedJobsByUserId(Long userId) {
        return savedJobRepository.countByUserId(userId);
    }
    
    public boolean isJobSaved(Long userId, Long jobId) {
        return savedJobRepository.existsByJobIdAndUserId(jobId, userId);
    }
}