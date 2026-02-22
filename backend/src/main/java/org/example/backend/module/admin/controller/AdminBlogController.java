package org.example.backend.module.admin.controller;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.example.backend.common.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin/blog")
@RequiredArgsConstructor
public class AdminBlogController {
    
    // Mock data for blog posts
    private final List<Map<String, Object>> blogPosts = new ArrayList<>();
    
    @PostConstruct
    public void init() {
        // Initialize with sample data
        blogPosts.add(createBlogPost(1L, "Hướng dẫn viết CV xin việc", "Nguyễn Văn A", "published", "Cách viết CV ấn tượng để gây ấn tượng với nhà tuyển dụng..."));
        blogPosts.add(createBlogPost(2L, "5 kỹ năng cần có năm 2024", "Trần Thị B", "published", "Những kỹ năng quan trọng nhất mà nhà tuyển dụng đang tìm kiếm..."));
        blogPosts.add(createBlogPost(3L, "Cách phỏng vấn thành công", "Lê Văn C", "draft", "Hướng dẫn chuẩn bị và trả lời phỏng vấn hiệu quả..."));
    }
    
    private Map<String, Object> createBlogPost(Long id, String title, String author, String status, String excerpt) {
        Map<String, Object> post = new HashMap<>();
        post.put("id", id);
        post.put("title", title);
        post.put("author", author);
        post.put("status", status);
        post.put("statusLabel", "published".equals(status) ? "Đã đăng" : "Nháp");
        post.put("excerpt", excerpt);
        post.put("category", "Tin tức");
        post.put("createdAt", new Date());
        post.put("imageUrl", "");
        return post;
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPosts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<Map<String, Object>> filteredPosts = new ArrayList<>(blogPosts);
        
        // Filter by status
        if (status != null && !status.isEmpty()) {
            filteredPosts.removeIf(p -> !p.get("status").equals(status));
        }
        
        // Filter by search query
        if (q != null && !q.isEmpty()) {
            String searchQuery = q.toLowerCase();
            filteredPosts.removeIf(p -> 
                !p.get("title").toString().toLowerCase().contains(searchQuery) &&
                !p.get("author").toString().toLowerCase().contains(searchQuery)
            );
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("posts", filteredPosts);
        response.put("total", filteredPosts.size());
        response.put("page", page);
        response.put("size", size);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPostById(@PathVariable Long id) {
        Optional<Map<String, Object>> post = blogPosts.stream()
            .filter(p -> p.get("id").equals(id))
            .findFirst();
        
        return post.map(p -> ResponseEntity.ok(ApiResponse.success(p)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> createPost(@RequestBody Map<String, Object> postData) {
        Long newId = (long) (blogPosts.size() + 1);
        postData.put("id", newId);
        postData.put("createdAt", new Date());
        postData.put("status", "draft");
        postData.put("statusLabel", "Nháp");
        blogPosts.add(postData);
        
        return ResponseEntity.ok(ApiResponse.success("Tạo bài viết thành công", postData));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updatePost(
            @PathVariable Long id, 
            @RequestBody Map<String, Object> postData) {
        
        for (int i = 0; i < blogPosts.size(); i++) {
            if (blogPosts.get(i).get("id").equals(id)) {
                postData.put("id", id);
                postData.put("createdAt", blogPosts.get(i).get("createdAt"));
                blogPosts.set(i, postData);
                return ResponseEntity.ok(ApiResponse.success("Cập nhật bài viết thành công", postData));
            }
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}/publish")
    public ResponseEntity<ApiResponse<Map<String, Object>>> publishPost(@PathVariable Long id) {
        for (int i = 0; i < blogPosts.size(); i++) {
            if (blogPosts.get(i).get("id").equals(id)) {
                Map<String, Object> post = blogPosts.get(i);
                post.put("status", "published");
                post.put("statusLabel", "Đã đăng");
                return ResponseEntity.ok(ApiResponse.success("Đăng bài viết thành công", post));
            }
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<Map<String, Object>>> rejectPost(@PathVariable Long id) {
        for (int i = 0; i < blogPosts.size(); i++) {
            if (blogPosts.get(i).get("id").equals(id)) {
                Map<String, Object> post = blogPosts.get(i);
                post.put("status", "rejected");
                post.put("statusLabel", "Bị từ chối");
                return ResponseEntity.ok(ApiResponse.success("Từ chối bài viết thành công", post));
            }
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deletePost(@PathVariable Long id) {
        boolean removed = blogPosts.removeIf(p -> p.get("id").equals(id));
        if (removed) {
            return ResponseEntity.ok(ApiResponse.success("Xóa bài viết thành công", "success"));
        }
        return ResponseEntity.notFound().build();
    }
}
