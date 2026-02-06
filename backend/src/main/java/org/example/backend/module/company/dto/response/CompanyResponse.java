package org.example.backend.module.company.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyResponse {
    private Long id;
    private String uuid;
    private Long userId;
    private String companyName;
    private String companyDescription;
    private String industry;
    private String companySize;
    private String websiteUrl;
    private String phone;
    private String email;
    private String address;
    private String city;
    private String country;
    private Integer foundedYear;
    private String logoUrl;
    private Boolean isVerified;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}