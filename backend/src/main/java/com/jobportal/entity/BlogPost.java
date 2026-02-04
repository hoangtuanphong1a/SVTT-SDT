package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "BlogPosts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BlogPostId")
    private Long id;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Slug", nullable = false, unique = true)
    private String slug;

    @Column(name = "Content", nullable = false)
    private String content;

    @Column(name = "Excerpt")
    private String excerpt;

    @Column(name = "CoverImageUrl")
    private String coverImageUrl;

    @ManyToOne
    @JoinColumn(name = "AuthorUserId", nullable = false)
    private User author;

    @Column(name = "IsPublished")
    private Boolean isPublished;

    @Column(name = "PublishedAt")
    private LocalDateTime publishedAt;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL)
    private Set<BlogComment> blogComments;

    @ManyToMany
    @JoinTable(
        name = "BlogPostTags",
        joinColumns = @JoinColumn(name = "BlogPostId"),
        inverseJoinColumns = @JoinColumn(name = "BlogTagId")
    )
    private Set<BlogTag> blogTags;
}