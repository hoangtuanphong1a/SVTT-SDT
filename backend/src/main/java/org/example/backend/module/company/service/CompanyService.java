package org.example.backend.module.company.service;

import org.example.backend.module.company.dto.request.CompanyRequest;
import org.example.backend.module.company.dto.response.CompanyResponse;

public interface CompanyService {
    
    CompanyResponse createCompany(CompanyRequest request, Long userId);
    
    CompanyResponse getCompanyByUserId(Long userId);
    
    CompanyResponse updateCompany(Long userId, CompanyRequest request);
    
    void deleteCompany(Long userId);
}