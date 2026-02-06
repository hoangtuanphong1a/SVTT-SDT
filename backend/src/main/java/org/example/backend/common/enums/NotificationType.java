package org.example.backend.common.enums;

import lombok.Getter;

@Getter
public enum NotificationType {
    JOB_APPLICATION("Job Application"),
    JOB_MATCH("Job Match"),
    INTERVIEW_REQUEST("Interview Request"),
    OFFER("Job Offer"),
    SYSTEM("System Notification"),
    PAYMENT("Payment Notification");

    private final String value;

    NotificationType(String value) {
        this.value = value;
    }
}