package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.Set;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "JobCategories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "JobCategoryId")
    private Long id;

    @Column(name = "Name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Job> jobs;
}