package org.example.backend.module.jobseeker.dto.request;

import java.time.LocalDate;
import java.util.UUID;

public record UpdateJobSeekerProfileRequest(
        Long id,
        String fullName,
        String phone,
        LocalDate DOB,
        String location,
        String summary,
        String currentTitle,
        Integer yearsExperience
) {}
