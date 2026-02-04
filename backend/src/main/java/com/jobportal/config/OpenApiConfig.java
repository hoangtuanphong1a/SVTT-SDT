package com.jobportal.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI jobPortalOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Job Portal API")
                        .description("API documentation for Job Portal backend")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Job Portal Team")
                                .email("support@jobportal.local"))
                        .license(new License().name("MIT License")))
                .externalDocs(new ExternalDocumentation()
                        .description("Project README")
                        .url("https://example.com/jobportal-readme"));
    }
}

