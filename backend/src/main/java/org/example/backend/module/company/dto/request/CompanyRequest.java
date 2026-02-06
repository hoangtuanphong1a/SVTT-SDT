package org.example.backend.module.company.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.common.enums.CompanySize;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyRequest {
    
    private Long userId;
    
    @NotBlank(message = "Company name is required")
    @Size(min = 2, max = 200, message = "Company name must be between 2 and 200 characters")
    private String companyName;
    
    @Size(max = 1000, message = "Company description cannot exceed 1000 characters")
    private String companyDescription;
    
    @Size(max = 100, message = "Industry cannot exceed 100 characters")
    private String industry;
    
    @NotNull(message = "Company size is required")
    private CompanySize companySize;
    
    @Size(max = 500, message = "Website URL cannot exceed 500 characters")
    private String websiteUrl;
    
    @Size(max = 20, message = "Phone number cannot exceed 20 characters")
    private String phone;
    
    @Email(message = "Email should be valid")
    @Size(max = 200, message = "Email cannot exceed 200 characters")
    private String email;
    
    @Size(max = 500, message = "Address cannot exceed 500 characters")
    private String address;
    
    @Size(max = 100, message = "City cannot exceed 100 characters")
    private String city;
    
    @Size(max = 100, message = "Country cannot exceed 100 characters")
    private String country;
    
    private Integer foundedYear;
    
    @Size(max = 500, message = "Logo URL cannot exceed 500 characters")
    private String logoUrl;
}
