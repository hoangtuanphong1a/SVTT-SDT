package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "CVTemplates")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CVTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CVTemplateId")
    private Long id;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Slug", nullable = false, unique = true)
    private String slug;

    @Column(name = "Description")
    private String description;

    @Column(name = "LayoutMeta")
    private String layoutMeta;

    @Column(name = "IsPublic")
    private Boolean isPublic;

    @ManyToOne
    @JoinColumn(name = "CreatedBy")
    private User createdBy;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "cvTemplate", cascade = CascadeType.ALL)
    private Set<CV> cvs;
}