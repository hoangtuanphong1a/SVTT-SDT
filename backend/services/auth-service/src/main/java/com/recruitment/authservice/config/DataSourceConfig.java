package com.recruitment.authservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Value("${DB_URL:jdbc:h2:mem:recruitment_db}")
    private String dbUrl;

    @Value("${DB_USERNAME:TUANPHONG}")
    private String dbUsername;

    @Value("${DB_PASSWORD:123321}")
    private String dbPassword;

    @Value("${DB_DRIVER:org.h2.Driver}")
    private String dbDriver;

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(dbDriver);
        dataSource.setUrl(dbUrl);
        dataSource.setUsername(dbUsername);
        dataSource.setPassword(dbPassword);
        return dataSource;
    }
}
