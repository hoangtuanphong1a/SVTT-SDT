package org.example.backend.module.jobseeker.mapper;

import org.example.backend.module.jobseeker.dto.request.UpdateJobSeekerProfileRequest;
import org.example.backend.module.jobseeker.dto.response.JobSeekerProfileResponse;
import org.example.backend.module.jobseeker.entity.JobSeekerProfile;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface JobSeekerProfileMapper {
    
    @Mapping(target = "id", source = "entity.uuid")
    JobSeekerProfileResponse toResponse(JobSeekerProfile entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(
            UpdateJobSeekerProfileRequest req,
            @MappingTarget JobSeekerProfile entity
    );
}
