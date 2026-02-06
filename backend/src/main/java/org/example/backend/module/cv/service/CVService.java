package org.example.backend.module.cv.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.module.cv.entity.CV;
import org.example.backend.module.cv.repository.CVRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CVService {
    
    private final CVRepository cvRepository;
    
    private final String uploadDir = "./uploads/cvs";
    
    @Transactional
    public CV uploadCV(Long userId, MultipartFile file, String title, String description) throws IOException {
        // Create upload directory if not exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Generate unique file name
        String originalName = file.getOriginalFilename();
        String extension = originalName.substring(originalName.lastIndexOf("."));
        String uniqueFileName = UUID.randomUUID().toString() + extension;
        
        // Save file
        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), filePath);
        
        // Create CV record
        CV cv = CV.builder()
                .userId(userId)
                .fileName(uniqueFileName)
                .originalName(originalName)
                .fileUrl("/api/cvs/download/" + uniqueFileName)
                .fileSize(file.getSize())
                .contentType(file.getContentType())
                .title(title)
                .description(description)
                .isDefault(cvRepository.existsByUserIdAndIsDefaultTrue(userId) ? false : true)
                .build();
        
        return cvRepository.save(cv);
    }
    
    public List<CV> getCVsByUserId(Long userId) {
        return cvRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    public Page<CV> getCVsByUserId(Long userId, Pageable pageable) {
        return cvRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    }
    
    public CV getCVById(Long cvId, Long userId) {
        return cvRepository.findByIdAndUserId(cvId, userId)
                .orElseThrow(() -> new RuntimeException("CV not found"));
    }
    
    public CV getDefaultCV(Long userId) {
        return cvRepository.findByUserIdAndIsDefaultTrue(userId)
                .orElseThrow(() -> new RuntimeException("No default CV found"));
    }
    
    @Transactional
    public void setDefaultCV(Long cvId, Long userId) {
        // Unset current default
        cvRepository.findByUserIdAndIsDefaultTrue(userId).ifPresent(existingCV -> {
            existingCV.setIsDefault(false);
            cvRepository.save(existingCV);
        });
        
        // Set new default
        CV cv = cvRepository.findByIdAndUserId(cvId, userId)
                .orElseThrow(() -> new RuntimeException("CV not found"));
        cv.setIsDefault(true);
        cvRepository.save(cv);
    }
    
    @Transactional
    public void deleteCV(Long cvId, Long userId) {
        CV cv = cvRepository.findByIdAndUserId(cvId, userId)
                .orElseThrow(() -> new RuntimeException("CV not found"));
        
        // Delete file
        try {
            Path filePath = Paths.get(uploadDir, cv.getFileName());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            // Log error but continue with database deletion
        }
        
        cvRepository.delete(cv);
    }
    
    public long countCVsByUserId(Long userId) {
        return cvRepository.countByUserId(userId);
    }
    
    public Path getCVFilePath(Long cvId) {
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new RuntimeException("CV not found"));
        return Paths.get(uploadDir, cv.getFileName());
    }
}