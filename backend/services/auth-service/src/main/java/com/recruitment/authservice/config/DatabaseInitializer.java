package com.recruitment.authservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Configuration
public class DatabaseInitializer {

    @Autowired
    private EnvConfig envConfig;

    @Autowired
    private DataSource dataSource;

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {
            try {
                String dbName = extractDatabaseName(envConfig.dbUrl());

                // Check if database exists and create if not
                if (!databaseExists(dbName)) {
                    createDatabase(dbName);
                    System.out.println("Database '" + dbName + "' created successfully.");
                } else {
                    System.out.println("Database '" + dbName + "' already exists.");
                }

                // Initialize database schema if needed
                initializeDatabaseSchema();

            } catch (Exception e) {
                System.err.println("Error initializing database: " + e.getMessage());
                // Continue even if database creation fails, let Hibernate handle it
            }
        };
    }

    private boolean databaseExists(String dbName) {
        try (Connection conn = DataSourceUtils.getConnection(dataSource)) {
            // Try to use the database to check if it exists
            try (Statement stmt = conn.createStatement()) {
                stmt.execute("USE " + dbName);
                return true;
            } catch (SQLException e) {
                return false;
            }
        } catch (SQLException e) {
            System.err.println("Error checking database existence: " + e.getMessage());
            return false;
        }
    }

    private void createDatabase(String dbName) {
        try (Connection conn = DataSourceUtils.getConnection(dataSource)) {
            // Create a connection without specifying database to create the database
            String createDbUrl = envConfig.dbUrl().replace("/" + dbName, "");
            if (createDbUrl.contains("?")) {
                createDbUrl = createDbUrl.substring(0, createDbUrl.indexOf("?"));
            }

            try (Connection tempConn = java.sql.DriverManager.getConnection(
                    createDbUrl, envConfig.dbUsername(), envConfig.dbPassword());
                 Statement stmt = tempConn.createStatement()) {

                stmt.execute("CREATE DATABASE IF NOT EXISTS " + dbName);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Failed to create database: " + e.getMessage(), e);
        }
    }

    private void initializeDatabaseSchema() {
        // Hibernate will handle schema creation based on ddl-auto setting
        // Additional schema initialization can be done here if needed
    }

    private String extractDatabaseName(String jdbcUrl) {
        // Extract database name from JDBC URL
        String[] parts = jdbcUrl.split("/");
        if (parts.length > 3) {
            String dbPart = parts[3].split("\\?")[0];
            return dbPart;
        }
        return "recruitment_db";
    }
}
