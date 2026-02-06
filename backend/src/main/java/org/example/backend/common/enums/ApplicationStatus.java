package org.example.backend.common.enums;

import lombok.Getter;

@Getter
public enum ApplicationStatus {
    PENDING("Pending"),
    VIEWED("Viewed"),
    UNDER_REVIEW("Under Review"),
    INTERVIEW("Interview"),
    OFFER("Offer"),
    REJECTED("Rejected"),
    ACCEPTED("Accepted");

    private final String value;

    ApplicationStatus(String value) {
        this.value = value;
    }
}