package org.example.backend.module.company.mapper;

import org.example.backend.module.company.dto.request.CompanyRequest;
import org.example.backend.module.company.dto.response.CompanyResponse;
import org.example.backend.module.company.entity.Company;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface CompanyMapper {
    
    CompanyResponse toResponse(Company entity);
    
    Company toEntity(CompanyRequest request);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(CompanyRequest request, @MappingTarget Company entity);
}
