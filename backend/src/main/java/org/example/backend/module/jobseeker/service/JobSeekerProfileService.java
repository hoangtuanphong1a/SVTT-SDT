package org.example.backend.module.jobseeker.service;

import org.example.backend.common.exception.ResourceNotFoundException;
import org.example.backend.module.jobseeker.dto.request.UpdateJobSeekerProfileRequest;
import org.example.backend.module.jobseeker.dto.response.JobSeekerProfileResponse;
import org.example.backend.module.jobseeker.entity.JobSeekerProfile;
import org.example.backend.module.jobseeker.mapper.JobSeekerProfileMapper;
import org.example.backend.module.jobseeker.repository.JobSeekerProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JobSeekerProfileService {
    private final JobSeekerProfileRepository repo;
    private final JobSeekerProfileMapper mapper;

    public JobSeekerProfileService(
            JobSeekerProfileRepository repo,
            JobSeekerProfileMapper mapper
    ) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public JobSeekerProfileResponse getMyProfile(Long userId) {

        JobSeekerProfile profile = repo.findByUserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Profile", "userId", userId.toString()));

        return mapper.toResponse(profile);
    }

    public void update(Long userId, UpdateJobSeekerProfileRequest req) {

        JobSeekerProfile profile = repo.findByUserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Profile", "userId", userId.toString()));

        mapper.update(req, profile);
    }
}