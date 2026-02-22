package org.example.backend.module.admin.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.response.ApiResponse;
import org.example.backend.module.auth.entity.User;
import org.example.backend.module.auth.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {
    
    private final UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUsers(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<User> usersPage;
        
        if (q != null && !q.isEmpty()) {
            // Search by name or email
            usersPage = userRepository.findAll(
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"))
            );
        } else {
            usersPage = userRepository.findAll(
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"))
            );
        }
        
        // Filter by role if provided
        List<User> filteredUsers = usersPage.getContent();
        if (role != null && !role.isEmpty()) {
            filteredUsers = filteredUsers.stream()
                .filter(u -> u.getRole().name().equalsIgnoreCase(role))
                .collect(Collectors.toList());
        }
        
        // Filter by search query
        if (q != null && !q.isEmpty()) {
            String searchQuery = q.toLowerCase();
            filteredUsers = filteredUsers.stream()
                .filter(u -> u.getUsername().toLowerCase().contains(searchQuery) 
                    || u.getEmail().toLowerCase().contains(searchQuery)
                    || (u.getFullName() != null && u.getFullName().toLowerCase().contains(searchQuery)))
                .collect(Collectors.toList());
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("users", filteredUsers);
        response.put("total", filteredUsers.size());
        response.put("page", page);
        response.put("size", size);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(user -> ResponseEntity.ok(ApiResponse.success(user)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa người dùng thành công", "success"));
    }
    
    @PutMapping("/{id}/block")
    public ResponseEntity<ApiResponse<User>> blockUser(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(user -> {
                user.setIsActive(false);
                User updated = userRepository.save(user);
                return ResponseEntity.ok(ApiResponse.success("Khóa người dùng thành công", updated));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/unblock")
    public ResponseEntity<ApiResponse<User>> unblockUser(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(user -> {
                user.setIsActive(true);
                User updated = userRepository.save(user);
                return ResponseEntity.ok(ApiResponse.success("Mở khóa người dùng thành công", updated));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
