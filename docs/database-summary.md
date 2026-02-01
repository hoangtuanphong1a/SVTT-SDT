# Recruitment System Database Summary

## Database Schema Overview

The provided database schema is comprehensive and well-structured for a recruitment management system. Here's an analysis of the key components:

## Core Tables (32 Tables)

### 1. Authentication & User Management (5 tables)
- **Roles**: Role-based access control
- **Users**: User accounts with social login support
- **UserRoles**: Many-to-many relationship between users and roles
- **PasswordResetTokens**: Secure password reset functionality
- **RefreshTokens**: JWT refresh token management

### 2. Profile Management (2 tables)
- **Companies**: Employer company profiles
- **JobSeekerProfiles**: Candidate profiles with personal information

### 3. CV Management (2 tables)
- **CVTemplates**: Predefined CV templates
- **CVs**: Candidate CVs with structured data and file uploads

### 4. Job Classification (3 tables)
- **JobCategories**: Job categories (e.g., IT, Finance)
- **JobTags**: Job tags for filtering
- **Skills**: Skills catalog for matching

### 5. Job Management (3 tables)
- **Jobs**: Main job postings with approval workflow
- **JobSkills**: Many-to-many relationship between jobs and skills
- **JobJobTags**: Many-to-many relationship between jobs and tags

### 6. Application Process (2 tables)
- **JobApplications**: Candidate applications with status tracking
- **SavedJobs**: Bookmarked jobs for candidates

### 7. Notifications (1 table)
- **Notifications**: In-app and email notifications

### 8. AI Features (4 tables)
- **ResumeParsingJobs**: CV parsing job queue
- **AIMatchingResults**: AI-powered job-candidate matching
- **ChatbotConversations**: Chatbot conversation history
- **ChatbotMessages**: Individual chat messages

### 9. Analytics (3 tables)
- **JobViews**: Job view tracking
- **CVViews**: CV view tracking
- **ApplicationEvents**: Application status change history

### 10. Blog Module (6 tables)
- **BlogCategories**: Blog post categories
- **BlogTags**: Blog post tags
- **BlogPosts**: Blog articles
- **BlogPostTags**: Many-to-many relationship
- **BlogComments**: User comments with nesting
- **BlogLikes**: User likes on blog posts
- **BlogViews**: Blog view analytics

## Key Features

### 1. Comprehensive User System
- Multi-role support (JobSeeker, Employer, Admin)
- Social login integration (Google, LinkedIn)
- Secure password management
- JWT authentication with refresh tokens

### 2. Advanced Job Management
- Job approval workflow (Draft → PendingReview → Active/Rejected)
- Rich job descriptions with requirements and benefits
- Salary ranges and currency support
- Location-based job filtering
- Job expiration and status tracking

### 3. Candidate Management
- Detailed candidate profiles
- Multiple CV support per candidate
- CV templates and structured data
- File upload support (PDF/DOCX)

### 4. Application Tracking
- Full application lifecycle management
- Status tracking (Applied → Reviewed → Interview → Rejected/Hired)
- Employer labeling system
- AI-powered matching scores

### 5. AI Integration
- Resume parsing from uploaded files
- Job-candidate matching algorithms
- Chatbot for career advice and Q&A
- Skill comparison and missing skills analysis

### 6. Analytics and Reporting
- Job view tracking
- CV view tracking
- Application event history
- Blog engagement metrics

## Database Design Strengths

1. **Normalized Structure**: Proper use of foreign keys and relationships
2. **Comprehensive Indexing**: Performance-optimized queries
3. **Soft Delete Pattern**: Data retention with IsDeleted flags
4. **Audit Trails**: CreatedAt/UpdatedAt timestamps on all tables
5. **Status Workflows**: Clear state management for business processes
6. **Security**: Proper password hashing and token management
7. **Extensibility**: Blog module for content marketing

## Integration with Spring Boot

The schema is well-suited for JPA/Hibernate implementation:

1. **Entity Relationships**: Clear one-to-many and many-to-many relationships
2. **Enums**: Status fields can be mapped to Java enums
3. **JSON Support**: StructuredData fields can use @Convert or JSON types
4. **Audit Fields**: @CreatedDate and @LastModifiedDate annotations
5. **Soft Deletes**: @Where(clause = "is_deleted = false") for repositories

## Implementation Plan

### 1. Core Entities (Auth Service)
- User, Role, UserRole
- PasswordResetToken, RefreshToken

### 2. Profile Entities (Candidate Service)
- Company, JobSeekerProfile
- CVTemplate, CV

### 3. Job Entities (Job Service)
- JobCategory, JobTag, Skill
- Job, JobSkill, JobJobTag

### 4. Application Entities (Interview Service)
- JobApplication, SavedJob
- ApplicationEvent

### 5. Notification Entities (Notification Service)
- Notification

### 6. AI Entities (Could be separate service)
- ResumeParsingJob, AIMatchingResult
- ChatbotConversation, ChatbotMessage

### 7. Analytics (Shared across services)
- JobView, CVView

This schema provides a solid foundation for building a comprehensive recruitment management system with all the required features.
