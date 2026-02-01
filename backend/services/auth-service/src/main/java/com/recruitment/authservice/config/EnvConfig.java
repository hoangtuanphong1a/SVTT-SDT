package com.recruitment.authservice.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {

    private final Dotenv dotenv = Dotenv.load();

    @Bean
    public String dbUrl() {
        return dotenv.get("DB_URL", "jdbc:h2:mem:recruitment_db");
    }

    @Bean
    public String dbUsername() {
        return dotenv.get("DB_USERNAME", "TUANPHONG");
    }

    @Bean
    public String dbPassword() {
        return dotenv.get("DB_PASSWORD", "123321");
    }

    @Bean
    public String dbDriver() {
        return dotenv.get("DB_DRIVER", "org.h2.Driver");
    }

    @Bean
    public String jwtSecret() {
        return dotenv.get("JWT_SECRET", "your-very-secure-jwt-secret-key-here-change-in-production");
    }

    @Bean
    public Long jwtExpiration() {
        return Long.parseLong(dotenv.get("JWT_EXPIRATION", "86400000"));
    }

    @Bean
    public Long jwtRefreshExpiration() {
        return Long.parseLong(dotenv.get("JWT_REFRESH_EXPIRATION", "604800000"));
    }

    @Bean
    public String securityUserName() {
        return dotenv.get("SECURITY_USER_NAME", "admin");
    }

    @Bean
    public String securityUserPassword() {
        return dotenv.get("SECURITY_USER_PASSWORD", "admin123");
    }

    @Bean
    public String eurekaUrl() {
        return dotenv.get("EUREKA_URL", "http://localhost:8761/eureka/");
    }
}
