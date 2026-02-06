package org.example.backend.common.enums;

import lombok.Getter;

@Getter
public enum JobType {
    FULL_TIME("Full-time"),
    PART_TIME("Part-time"),
    CONTRACT("Contract"),
    INTERNSHIP("Internship"),
    FREELANCE("Freelance");

    private final String value;

    JobType(String value) {
        this.value = value;
    }
}