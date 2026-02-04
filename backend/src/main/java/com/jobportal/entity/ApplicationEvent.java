package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "ApplicationEvents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ApplicationEventId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ApplicationId", nullable = false)
    private JobApplication application;

    @Column(name = "EventType", nullable = false)
    private String eventType;

    @Column(name = "EventData")
    private String eventData;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;
}