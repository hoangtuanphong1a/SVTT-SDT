package org.example.backend.module.job.mapper;

import org.example.backend.module.job.dto.request.JobRequest;
import org.example.backend.module.job.dto.response.JobResponse;
import org.example.backend.module.job.entity.Job;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface JobMapper {
    
    JobResponse toResponse(Job entity);
    
    Job toEntity(JobRequest request);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(JobRequest request, @MappingTarget Job entity);
}
