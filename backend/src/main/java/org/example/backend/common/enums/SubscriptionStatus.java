package org.example.backend.common.enums;

import lombok.Getter;

@Getter
public enum SubscriptionStatus {
    ACTIVE("Active"),
    INACTIVE("Inactive"),
    EXPIRED("Expired"),
    PENDING("Pending");

    private final String value;

    SubscriptionStatus(String value) {
        this.value = value;
    }
}