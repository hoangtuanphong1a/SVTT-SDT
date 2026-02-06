package org.example.backend.module.jobseeker.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record JobSeekerProfileResponse(
        UUID id,
        Long userId,
        String fullName,
        String phone,
        LocalDate DOB,
        String location,
        String summary,
        String currentTitle,
        Integer yearsExperience,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) { }
