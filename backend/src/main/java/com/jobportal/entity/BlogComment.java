package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "BlogComments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CommentId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "BlogPostId", nullable = false)
    private BlogPost blogPost;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private User user;

    @Column(name = "GuestName")
    private String guestName;

    @Column(name = "Content", nullable = false)
    private String content;

    @Column(name = "IsApproved")
    private Boolean isApproved;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;
}