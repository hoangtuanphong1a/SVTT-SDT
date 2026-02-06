package org.example.backend.module.company.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.AlreadyExistsException;
import org.example.backend.common.exception.ResourceNotFoundException;
import org.example.backend.module.company.dto.request.CompanyRequest;
import org.example.backend.module.company.dto.response.CompanyResponse;
import org.example.backend.module.company.entity.Company;
import org.example.backend.module.company.mapper.CompanyMapper;
import org.example.backend.module.company.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    
    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;
    
    @Override
    public CompanyResponse createCompany(CompanyRequest request, Long userId) {
        if (companyRepository.existsByUserId(userId)) {
            throw new AlreadyExistsException("Company", "userId", userId.toString());
        }
        
        if (companyRepository.existsByCompanyName(request.getCompanyName())) {
            throw new AlreadyExistsException("Company", "companyName", request.getCompanyName());
        }
        
        request.setUserId(userId);
        Company company = companyMapper.toEntity(request);
        company.setIsVerified(false);
        company.setIsActive(true);
        
        Company savedCompany = companyRepository.save(company);
        
        return companyMapper.toResponse(savedCompany);
    }
    
    @Override
    public CompanyResponse getCompanyByUserId(Long userId) {
        Company company = companyRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "userId", userId.toString()));
        
        return companyMapper.toResponse(company);
    }
    
    @Override
    public CompanyResponse updateCompany(Long userId, CompanyRequest request) {
        Company company = companyRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "userId", userId.toString()));
        
        if (!company.getCompanyName().equals(request.getCompanyName()) &&
            companyRepository.existsByCompanyName(request.getCompanyName())) {
            throw new AlreadyExistsException("Company", "companyName", request.getCompanyName());
        }
        
        companyMapper.update(request, company);
        
        Company updatedCompany = companyRepository.save(company);
        
        return companyMapper.toResponse(updatedCompany);
    }
    
    @Override
    public void deleteCompany(Long userId) {
        Company company = companyRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "userId", userId.toString()));
        
        company.setIsActive(false);
        companyRepository.save(company);
    }
}
