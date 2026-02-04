package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "JobViews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "JobViewId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "JobId", nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "ViewerUserId")
    private User viewerUser;

    @Column(name = "SessionId")
    private String sessionId;

    @Column(name = "ViewedAt")
    private LocalDateTime viewedAt;
}