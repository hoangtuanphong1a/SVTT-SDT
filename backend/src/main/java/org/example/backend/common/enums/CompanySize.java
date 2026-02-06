package org.example.backend.common.enums;

import lombok.Getter;

@Getter
public enum CompanySize {
    STARTUP("Startup", 1, 50),
    SMALL("Small", 51, 200),
    MEDIUM("Medium", 201, 1000),
    LARGE("Large", 1001, 5000),
    ENTERPRISE("Enterprise", 5001, Integer.MAX_VALUE);

    private final String value;
    private final int minEmployees;
    private final int maxEmployees;

    CompanySize(String value, int minEmployees, int maxEmployees) {
        this.value = value;
        this.minEmployees = minEmployees;
        this.maxEmployees = maxEmployees;
    }
}