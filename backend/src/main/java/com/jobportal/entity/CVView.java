package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "CVViews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CVView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CVViewId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "CVId", nullable = false)
    private CV cv;

    @ManyToOne
    @JoinColumn(name = "ViewerUserId")
    private User viewerUser;

    @Column(name = "ViewedAt")
    private LocalDateTime viewedAt;
}