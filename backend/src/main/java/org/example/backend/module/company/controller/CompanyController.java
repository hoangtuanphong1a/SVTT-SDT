package org.example.backend.module.company.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.response.ApiResponse;
import org.example.backend.module.company.dto.request.CompanyRequest;
import org.example.backend.module.company.dto.response.CompanyResponse;
import org.example.backend.module.company.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {
    
    private final CompanyService companyService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<CompanyResponse>> createCompany(@RequestBody CompanyRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = ((org.example.backend.common.security.SecurityUser) authentication.getPrincipal()).getId();
        
        CompanyResponse response = companyService.createCompany(request, userId);
        return ResponseEntity.ok(ApiResponse.success("Company created successfully", response));
    }
    
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<CompanyResponse>> getMyCompany() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = ((org.example.backend.common.security.SecurityUser) authentication.getPrincipal()).getId();
        
        CompanyResponse response = companyService.getCompanyByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Company retrieved successfully", response));
    }
    
    @PutMapping("/my")
    public ResponseEntity<ApiResponse<CompanyResponse>> updateMyCompany(@RequestBody CompanyRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = ((org.example.backend.common.security.SecurityUser) authentication.getPrincipal()).getId();
        
        CompanyResponse response = companyService.updateCompany(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Company updated successfully", response));
    }
    
    @DeleteMapping("/my")
    public ResponseEntity<ApiResponse<Void>> deleteMyCompany() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = ((org.example.backend.common.security.SecurityUser) authentication.getPrincipal()).getId();
        
        companyService.deleteCompany(userId);
        return ResponseEntity.ok(ApiResponse.success("Company deleted successfully", null));
    }
}