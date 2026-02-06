package org.example.backend.module.auth.mapper;

import org.example.backend.module.auth.dto.request.AuthRequest;
import org.example.backend.module.auth.dto.response.AuthResponse;
import org.example.backend.module.auth.dto.response.RegisterRequest;
import org.example.backend.module.auth.entity.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface UserMapper {
    
    AuthResponse toAuthResponse(User entity);
    
    User toEntity(AuthRequest request);
    
    User toEntity(RegisterRequest request);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(AuthRequest request, @MappingTarget User entity);
}
