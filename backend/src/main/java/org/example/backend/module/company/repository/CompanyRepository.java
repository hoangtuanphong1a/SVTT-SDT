package org.example.backend.module.company.repository;

import org.example.backend.common.base.BaseRepository;
import org.example.backend.module.company.entity.Company;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends BaseRepository<Company, Long> {
    
    Optional<Company> findByUserId(Long userId);
    
    Optional<Company> findByCompanyName(String companyName);
    
    Boolean existsByUserId(Long userId);
    
    Boolean existsByCompanyName(String companyName);
}