package org.example.backend.common.enums;

import lombok.Getter;

@Getter
public enum UserRole {
    ADMIN("ADMIN"),
    EMPLOYER("EMPLOYER"),
    JOB_SEEKER("JOB_SEEKER");

    private final String value;

    UserRole(String value) {
        this.value = value;
    }
}