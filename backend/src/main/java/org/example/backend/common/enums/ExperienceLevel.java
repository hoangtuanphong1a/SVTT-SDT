package org.example.backend.common.enums;

import lombok.Getter;

@Getter
public enum ExperienceLevel {
    ENTRY_LEVEL("Entry Level"),
    MID_LEVEL("Mid Level"),
    SENIOR_LEVEL("Senior Level"),
    LEAD_LEVEL("Lead Level");

    private final String value;

    ExperienceLevel(String value) {
        this.value = value;
    }
}