package com.jobportal.repository;

import com.jobportal.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByIsPublishedTrue();

    @Query("SELECT b FROM BlogPost b WHERE b.author.id = :authorId AND b.isPublished = true")
    List<BlogPost> findPublishedByAuthorId(@Param("authorId") Long authorId);

    @Query("SELECT b FROM BlogPost b WHERE b.isPublished = true ORDER BY b.publishedAt DESC")
    List<BlogPost> findPublishedOrderByPublishedAtDesc();

    @Query("SELECT b FROM BlogPost b WHERE b.isPublished = true ORDER BY b.createdAt DESC")
    List<BlogPost> findPublishedOrderByCreatedAtDesc();

    @Query("SELECT b FROM BlogPost b WHERE b.slug = :slug AND b.isPublished = true")
    Optional<BlogPost> findPublishedBySlug(@Param("slug") String slug);

    @Query("SELECT b FROM BlogPost b WHERE b.author.id = :authorId ORDER BY b.createdAt DESC")
    List<BlogPost> findByAuthorIdOrderByCreatedAtDesc(@Param("authorId") Long authorId);

    @Query("SELECT b FROM BlogPost b WHERE b.title LIKE %:keyword% OR b.content LIKE %:keyword%")
    List<BlogPost> searchBlogPosts(@Param("keyword") String keyword);
}