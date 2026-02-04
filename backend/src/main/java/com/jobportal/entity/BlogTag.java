package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.Set;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "BlogTags")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BlogTagId")
    private Long id;

    @Column(name = "Name", nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "blogTags")
    private Set<BlogPost> blogPosts;
}