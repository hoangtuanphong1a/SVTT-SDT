package org.example.backend.module.admin.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.response.ApiResponse;
import org.example.backend.module.company.entity.Company;
import org.example.backend.module.company.repository.CompanyRepository;
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
@RequestMapping("/api/admin/companies")
@RequiredArgsConstructor
public class AdminCompanyController {
    
    private final CompanyRepository companyRepository;
    
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCompanies(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<Company> companiesPage = companyRepository.findAll(
            PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"))
        );
        
        // Filter by status if provided
        List<Company> filteredCompanies = companiesPage.getContent();
        if (status != null && !status.isEmpty()) {
            boolean isActive = "active".equalsIgnoreCase(status);
            filteredCompanies = filteredCompanies.stream()
                .filter(c -> c.getIsActive() == isActive)
                .collect(Collectors.toList());
        }
        
        // Filter by search query
        if (q != null && !q.isEmpty()) {
            String searchQuery = q.toLowerCase();
            filteredCompanies = filteredCompanies.stream()
                .filter(c -> c.getCompanyName().toLowerCase().contains(searchQuery)
                    || (c.getEmail() != null && c.getEmail().toLowerCase().contains(searchQuery)))
                .collect(Collectors.toList());
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("companies", filteredCompanies);
        response.put("total", filteredCompanies.size());
        response.put("page", page);
        response.put("size", size);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Company>> getCompanyById(@PathVariable Long id) {
        return companyRepository.findById(id)
            .map(company -> ResponseEntity.ok(ApiResponse.success(company)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/verify")
    public ResponseEntity<ApiResponse<Company>> verifyCompany(@PathVariable Long id) {
        return companyRepository.findById(id)
            .map(company -> {
                company.setIsVerified(true);
                Company updated = companyRepository.save(company);
                return ResponseEntity.ok(ApiResponse.success("Duyệt công ty thành công", updated));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/block")
    public ResponseEntity<ApiResponse<Company>> blockCompany(@PathVariable Long id) {
        return companyRepository.findById(id)
            .map(company -> {
                company.setIsActive(false);
                Company updated = companyRepository.save(company);
                return ResponseEntity.ok(ApiResponse.success("Khóa công ty thành công", updated));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/unblock")
    public ResponseEntity<ApiResponse<Company>> unblockCompany(@PathVariable Long id) {
        return companyRepository.findById(id)
            .map(company -> {
                company.setIsActive(true);
                Company updated = companyRepository.save(company);
                return ResponseEntity.ok(ApiResponse.success("Mở khóa công ty thành công", updated));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteCompany(@PathVariable Long id) {
        if (!companyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        companyRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa công ty thành công", "success"));
    }
}
