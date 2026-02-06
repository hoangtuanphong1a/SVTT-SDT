package org.example.backend.module.notification.enums;

public enum NotificationType {
    // Job related
    JOB_RECOMMENDATION,
    JOB_EXPIRED,
    JOB_APPLICATION_RECEIVED,
    JOB_APPLICATION_UPDATED,
    
    // Application related
    APPLICATION_SUBMITTED,
    APPLICATION_REVIEWING,
    APPLICATION_INTERVIEW,
    APPLICATION_ACCEPTED,
    APPLICATION_REJECTED,
    
    // Company related
    COMPANY_NEW_JOB,
    COMPANY_FOLLOWED,
    
    // System
    SYSTEM_ANNOUNCEMENT,
    PASSWORD_CHANGED,
    EMAIL_VERIFIED,
    ACCOUNT_ACTIVATED,
    
    // General
    GENERAL
}