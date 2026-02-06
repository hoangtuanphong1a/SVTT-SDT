package org.example.backend.module.cv.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.response.ApiResponse;
import org.example.backend.module.cv.entity.CV;
import org.example.backend.module.cv.service.CVService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cvs")
@RequiredArgsConstructor
public class CVController {
    
    private final CVService cvService;
    
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<CV>> uploadCV(
            @RequestParam Long userId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description) throws IOException {
        CV cv = cvService.uploadCV(userId, file, title, description);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("CV uploaded successfully", cv));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<CV>>> getCVs(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CV> cvs = cvService.getCVsByUserId(userId, pageable);
        return ResponseEntity.ok(ApiResponse.success(cvs));
    }
    
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CV>>> getAllCVs(@RequestParam Long userId) {
        List<CV> cvs = cvService.getCVsByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(cvs));
    }
    
    @GetMapping("/{cvId}")
    public ResponseEntity<ApiResponse<CV>> getCV(
            @PathVariable Long cvId,
            @RequestParam Long userId) {
        CV cv = cvService.getCVById(cvId, userId);
        return ResponseEntity.ok(ApiResponse.success(cv));
    }
    
    @GetMapping("/default")
    public ResponseEntity<ApiResponse<CV>> getDefaultCV(@RequestParam Long userId) {
        CV cv = cvService.getDefaultCV(userId);
        return ResponseEntity.ok(ApiResponse.success(cv));
    }
    
    @PutMapping("/{cvId}/default")
    public ResponseEntity<ApiResponse<Void>> setDefaultCV(
            @PathVariable Long cvId,
            @RequestParam Long userId) {
        cvService.setDefaultCV(cvId, userId);
        return ResponseEntity.ok(ApiResponse.success("CV set as default", null));
    }
    
    @DeleteMapping("/{cvId}")
    public ResponseEntity<ApiResponse<Void>> deleteCV(
            @PathVariable Long cvId,
            @RequestParam Long userId) {
        cvService.deleteCV(cvId, userId);
        return ResponseEntity.ok(ApiResponse.success("CV deleted successfully", null));
    }
    
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getCVsCount(@RequestParam Long userId) {
        long count = cvService.countCVsByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(Map.of("count", count)));
    }
    
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadCV(@PathVariable String filename) throws MalformedURLException {
        Path filePath = Paths.get("./uploads/cvs").resolve(filename).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        
        if (resource.exists()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}