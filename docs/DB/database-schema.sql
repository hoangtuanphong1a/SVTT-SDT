-- ============================================================
-- Recruitment System Database Schema
-- Comprehensive database design for job recruitment platform
-- ============================================================

-- ============================================================
-- 1) USERS / ROLES / AUTH
-- ============================================================
CREATE TABLE dbo.Roles (
    RoleId INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(255) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE dbo.Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(256) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(512) NULL,
    IsEmailConfirmed BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    LastLoginAt DATETIME2 NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    IsDeleted BIT NOT NULL DEFAULT 0,
    DisplayName NVARCHAR(200) NULL,
    AvatarUrl NVARCHAR(1000) NULL,
    PreferredLocale NVARCHAR(20) NULL,
    GoogleId NVARCHAR(200) NULL,
    LinkedInId NVARCHAR(200) NULL
);

CREATE TABLE dbo.UserRoles (
    UserRoleId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    RoleId INT NOT NULL,
    AssignedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_UserRoles UNIQUE (UserId, RoleId),
    CONSTRAINT FK_UserRoles_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE,
    CONSTRAINT FK_UserRoles_Roles FOREIGN KEY (RoleId) REFERENCES dbo.Roles(RoleId)
);

CREATE TABLE dbo.PasswordResetTokens (
    ResetTokenId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    TokenHash NVARCHAR(512) NOT NULL,
    ExpiresAt DATETIME2 NOT NULL,
    UsedAt DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_PasswordResetTokens_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE
);

CREATE TABLE dbo.RefreshTokens (
    RefreshTokenId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    TokenHash NVARCHAR(512) NOT NULL,
    DeviceInfo NVARCHAR(300) NULL,
    IpAddress NVARCHAR(100) NULL,
    ExpiresAt DATETIME2 NOT NULL,
    RevokedAt DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_RefreshTokens_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE
);

-- ============================================================
-- 2) PROFILES: EMPLOYER / JOB SEEKER
-- ============================================================
CREATE TABLE dbo.Companies (
    CompanyId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(300) NOT NULL,
    Slug NVARCHAR(300) NOT NULL UNIQUE,
    LogoUrl NVARCHAR(1000) NULL,
    BannerUrl NVARCHAR(1000) NULL,
    Industry NVARCHAR(200) NULL,
    CompanySize NVARCHAR(50) NULL,
    Website NVARCHAR(500) NULL,
    Location NVARCHAR(300) NULL,
    Description NVARCHAR(MAX) NULL,
    IsVerified BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL
);

CREATE TABLE dbo.JobSeekerProfiles (
    JobSeekerProfileId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    FullName NVARCHAR(300) NULL,
    Phone NVARCHAR(50) NULL,
    DOB DATE NULL,
    Location NVARCHAR(300) NULL,
    Summary NVARCHAR(MAX) NULL,
    CurrentTitle NVARCHAR(200) NULL,
    YearsExperience INT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    CONSTRAINT FK_JobSeekerProfiles_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE
);

-- ============================================================
-- 3) CV TEMPLATES + CVs (online + upload)
-- ============================================================
CREATE TABLE dbo.CVTemplates (
    CVTemplateId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Slug NVARCHAR(200) NOT NULL UNIQUE,
    Description NVARCHAR(500) NULL,
    LayoutMeta NVARCHAR(MAX) NULL,
    IsPublic BIT NOT NULL DEFAULT 1,
    CreatedBy INT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_CVTemplates_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES dbo.Users(UserId) ON DELETE SET NULL
);

CREATE TABLE dbo.CVs (
    CVId INT IDENTITY(1,1) PRIMARY KEY,
    JobSeekerProfileId INT NOT NULL,
    CVTemplateId INT NULL,
    Title NVARCHAR(250) NULL,
    StructuredData NVARCHAR(MAX) NULL,
    FileUrl NVARCHAR(1000) NULL,
    IsPrimary BIT NOT NULL DEFAULT 0,
    IsPublic BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    CONSTRAINT FK_CVs_JobSeekerProfiles FOREIGN KEY (JobSeekerProfileId) REFERENCES dbo.JobSeekerProfiles(JobSeekerProfileId) ON DELETE CASCADE,
    CONSTRAINT FK_CVs_CVTemplates FOREIGN KEY (CVTemplateId) REFERENCES dbo.CVTemplates(CVTemplateId) ON DELETE SET NULL
);

-- ============================================================
-- 4) CATEGORIES / SKILLS (normalized catalogs for admin)
-- ============================================================
CREATE TABLE dbo.JobCategories (
    JobCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL UNIQUE
);

CREATE TABLE dbo.JobTags (
    JobTagId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL UNIQUE
);

CREATE TABLE dbo.Skills (
    SkillId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL UNIQUE
);

-- ============================================================
-- 5) JOBS (admin moderation workflow)
-- ============================================================
CREATE TABLE dbo.Jobs (
    JobId INT IDENTITY(1,1) PRIMARY KEY,
    CompanyId INT NOT NULL,
    PostedByUserId INT NULL,

    Title NVARCHAR(300) NOT NULL,
    Slug NVARCHAR(300) NOT NULL UNIQUE,
    ShortDescription NVARCHAR(1000) NULL,
    Description NVARCHAR(MAX) NULL,
    Requirements NVARCHAR(MAX) NULL,
    Benefits NVARCHAR(MAX) NULL,

    SalaryMin INT NULL,
    SalaryMax INT NULL,
    Currency NVARCHAR(10) NULL,
    JobType NVARCHAR(50) NULL,
    Location NVARCHAR(300) NULL,
    CategoryId INT NULL,

    Status NVARCHAR(50) NOT NULL DEFAULT 'Draft',
    RejectedReason NVARCHAR(1000) NULL,

    ViewsCount INT NOT NULL DEFAULT 0,
    PostedAt DATETIME2 NULL,
    ExpiresAt DATETIME2 NULL,

    ApprovedByUserId INT NULL,
    ApprovedAt DATETIME2 NULL,

    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,

    CONSTRAINT FK_Jobs_Companies FOREIGN KEY (CompanyId) REFERENCES dbo.Companies(CompanyId) ON DELETE CASCADE,
    CONSTRAINT FK_Jobs_PostedByUser FOREIGN KEY (PostedByUserId) REFERENCES dbo.Users(UserId) ON DELETE SET NULL,
    CONSTRAINT FK_Jobs_Category FOREIGN KEY (CategoryId) REFERENCES dbo.JobCategories(JobCategoryId) ON DELETE SET NULL,
    CONSTRAINT FK_Jobs_ApprovedBy FOREIGN KEY (ApprovedByUserId) REFERENCES dbo.Users(UserId) ON DELETE SET NULL
);

CREATE TABLE dbo.JobSkills (
    JobSkillId INT IDENTITY(1,1) PRIMARY KEY,
    JobId INT NOT NULL,
    SkillId INT NOT NULL,
    CONSTRAINT UQ_JobSkills UNIQUE (JobId, SkillId),
    CONSTRAINT FK_JobSkills_Jobs FOREIGN KEY (JobId) REFERENCES dbo.Jobs(JobId) ON DELETE CASCADE,
    CONSTRAINT FK_JobSkills_Skills FOREIGN KEY (SkillId) REFERENCES dbo.Skills(SkillId) ON DELETE CASCADE
);

CREATE TABLE dbo.JobJobTags (
    JobJobTagId INT IDENTITY(1,1) PRIMARY KEY,
    JobId INT NOT NULL,
    JobTagId INT NOT NULL,
    CONSTRAINT UQ_JobJobTags UNIQUE (JobId, JobTagId),
    CONSTRAINT FK_JobJobTags_Jobs FOREIGN KEY (JobId) REFERENCES dbo.Jobs(JobId) ON DELETE CASCADE,
    CONSTRAINT FK_JobJobTags_JobTags FOREIGN KEY (JobTagId) REFERENCES dbo.JobTags(JobTagId) ON DELETE CASCADE
);

-- ============================================================
-- 6) APPLICATIONS + SAVED JOBS
-- ============================================================
CREATE TABLE dbo.JobApplications (
    ApplicationId INT IDENTITY(1,1) PRIMARY KEY,
    JobId INT NOT NULL,
    JobSeekerProfileId INT NOT NULL,
    CVId INT NULL,
    CoverLetter NVARCHAR(MAX) NULL,

    Status NVARCHAR(50) NOT NULL DEFAULT 'Applied',
    EmployerLabel NVARCHAR(50) NULL,
    MatchingScore FLOAT NULL,

    AppliedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    IsDeleted BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_JobApplications_Jobs FOREIGN KEY (JobId) REFERENCES dbo.Jobs(JobId) ON DELETE CASCADE,
    CONSTRAINT FK_JobApplications_JobSeekerProfiles FOREIGN KEY (JobSeekerProfileId) REFERENCES dbo.JobSeekerProfiles(JobSeekerProfileId) ON DELETE CASCADE,
    CONSTRAINT FK_JobApplications_CVs FOREIGN KEY (CVId) REFERENCES dbo.CVs(CVId) ON DELETE SET NULL,

    CONSTRAINT UQ_JobApplications UNIQUE (JobId, JobSeekerProfileId)
);

CREATE TABLE dbo.SavedJobs (
    SavedJobId INT IDENTITY(1,1) PRIMARY KEY,
    JobSeekerProfileId INT NOT NULL,
    JobId INT NOT NULL,
    SavedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_SavedJobs UNIQUE (JobSeekerProfileId, JobId),
    CONSTRAINT FK_SavedJobs_JobSeekerProfiles FOREIGN KEY (JobSeekerProfileId) REFERENCES dbo.JobSeekerProfiles(JobSeekerProfileId) ON DELETE CASCADE,
    CONSTRAINT FK_SavedJobs_Jobs FOREIGN KEY (JobId) REFERENCES dbo.Jobs(JobId) ON DELETE CASCADE
);

-- ============================================================
-- 7) NOTIFICATIONS (in-app/email tracking)
-- ============================================================
CREATE TABLE dbo.Notifications (
    NotificationId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Title NVARCHAR(250) NOT NULL,
    Message NVARCHAR(MAX) NOT NULL,
    Channel NVARCHAR(30) NOT NULL DEFAULT 'IN_APP',
    IsRead BIT NOT NULL DEFAULT 0,
    Link NVARCHAR(1000) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Notifications_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE
);

-- ============================================================
-- 8) AI: Resume Parsing + Matching + Chatbot
-- ============================================================
CREATE TABLE dbo.ResumeParsingJobs (
    ParsingJobId INT IDENTITY(1,1) PRIMARY KEY,
    CVId INT NULL,
    UserId INT NOT NULL,
    SourceFileUrl NVARCHAR(1000) NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'Queued',
    ExtractedJson NVARCHAR(MAX) NULL,
    MissingFieldsJson NVARCHAR(MAX) NULL,
    ErrorMessage NVARCHAR(2000) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CompletedAt DATETIME2 NULL,
    CONSTRAINT FK_ResumeParsingJobs_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE,
    CONSTRAINT FK_ResumeParsingJobs_CVs FOREIGN KEY (CVId) REFERENCES dbo.CVs(CVId) ON DELETE SET NULL
);

CREATE TABLE dbo.AIMatchingResults (
    MatchingResultId INT IDENTITY(1,1) PRIMARY KEY,
    CVId INT NOT NULL,
    JobId INT NOT NULL,
    Score FLOAT NOT NULL,
    MissingSkillsJson NVARCHAR(MAX) NULL,
    SkillComparisonJson NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_AIMatchingResults UNIQUE (CVId, JobId),
    CONSTRAINT FK_AIMatchingResults_CVs FOREIGN KEY (CVId) REFERENCES dbo.CVs(CVId) ON DELETE CASCADE,
    CONSTRAINT FK_AIMatchingResults_Jobs FOREIGN KEY (JobId) REFERENCES dbo.Jobs(JobId) ON DELETE CASCADE
);

CREATE TABLE dbo.ChatbotConversations (
    ConversationId UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    UserId INT NOT NULL,
    Topic NVARCHAR(200) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    ClosedAt DATETIME2 NULL,
    CONSTRAINT FK_ChatbotConversations_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE
);

CREATE TABLE dbo.ChatbotMessages (
    ChatbotMessageId INT IDENTITY(1,1) PRIMARY KEY,
    ConversationId UNIQUEIDENTIFIER NOT NULL,
    Sender NVARCHAR(20) NOT NULL,
    Body NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_ChatbotMessages_Conversations FOREIGN KEY (ConversationId) REFERENCES dbo.ChatbotConversations(ConversationId) ON DELETE CASCADE
);

-- ============================================================
-- 9) ANALYTICS / AUDIT (views + application events)
-- ============================================================
CREATE TABLE dbo.JobViews (
    JobViewId INT IDENTITY(1,1) PRIMARY KEY,
    JobId INT NOT NULL,
    ViewerUserId INT NULL,
    SessionId NVARCHAR(200) NULL,
    ViewedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_JobViews_Jobs FOREIGN KEY (JobId) REFERENCES dbo.Jobs(JobId) ON DELETE CASCADE,
    CONSTRAINT FK_JobViews_Users FOREIGN KEY (ViewerUserId) REFERENCES dbo.Users(UserId) ON DELETE SET NULL
);

CREATE TABLE dbo.CVViews (
    CVViewId INT IDENTITY(1,1) PRIMARY KEY,
    CVId INT NOT NULL,
    ViewerUserId INT NULL,
    ViewedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_CVViews_CVs FOREIGN KEY (CVId) REFERENCES dbo.CVs(CVId) ON DELETE CASCADE,
    CONSTRAINT FK_CVViews_Users FOREIGN KEY (ViewerUserId) REFERENCES dbo.Users(UserId) ON DELETE SET NULL
);

CREATE TABLE dbo.ApplicationEvents (
    ApplicationEventId INT IDENTITY(1,1) PRIMARY KEY,
    ApplicationId INT NOT NULL,
    EventType NVARCHAR(100) NOT NULL,
    EventData NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_ApplicationEvents_Applications FOREIGN KEY (ApplicationId) REFERENCES dbo.JobApplications(ApplicationId) ON DELETE CASCADE
);

-- ============================================================
-- 10) BLOG MODULE
-- ============================================================
CREATE TABLE dbo.BlogCategories (
    BlogCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL UNIQUE,
    Slug NVARCHAR(250) NOT NULL UNIQUE,
    Description NVARCHAR(500) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL
);

CREATE TABLE dbo.BlogTags (
    BlogTagId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL UNIQUE,
    Slug NVARCHAR(250) NOT NULL UNIQUE,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE dbo.BlogPosts (
    BlogPostId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(500) NOT NULL,
    Slug NVARCHAR(500) NOT NULL UNIQUE,
    Excerpt NVARCHAR(1000) NULL,
    Content NVARCHAR(MAX) NOT NULL,
    CoverImageUrl NVARCHAR(1000) NULL,
    CategoryId INT NULL,
    AuthorUserId INT NOT NULL,
    Status NVARCHAR(30) NOT NULL DEFAULT 'DRAFT',
    IsFeatured BIT NOT NULL DEFAULT 0,
    PublishedAt DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    CONSTRAINT FK_BlogPosts_Category FOREIGN KEY (CategoryId) REFERENCES dbo.BlogCategories(BlogCategoryId) ON DELETE SET NULL,
    CONSTRAINT FK_BlogPosts_Author FOREIGN KEY (AuthorUserId) REFERENCES dbo.Users(UserId) ON DELETE NO ACTION
);

CREATE TABLE dbo.BlogPostTags (
    BlogPostTagId INT IDENTITY(1,1) PRIMARY KEY,
    BlogPostId INT NOT NULL,
    BlogTagId INT NOT NULL,
    CONSTRAINT UQ_BlogPostTags UNIQUE (BlogPostId, BlogTagId),
    CONSTRAINT FK_BlogPostTags_Post FOREIGN KEY (BlogPostId) REFERENCES dbo.BlogPosts(BlogPostId) ON DELETE CASCADE,
    CONSTRAINT FK_BlogPostTags_Tag FOREIGN KEY (BlogTagId) REFERENCES dbo.BlogTags(BlogTagId) ON DELETE CASCADE
);

CREATE TABLE dbo.BlogComments (
    CommentId INT IDENTITY(1,1) PRIMARY KEY,
    BlogPostId INT NOT NULL,
    UserId INT NULL,
    ParentCommentId INT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    Status NVARCHAR(30) NOT NULL DEFAULT 'PENDING',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    CONSTRAINT FK_BlogComments_Post FOREIGN KEY (BlogPostId) REFERENCES dbo.BlogPosts(BlogPostId) ON DELETE CASCADE,
    CONSTRAINT FK_BlogComments_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE SET NULL,
    CONSTRAINT FK_BlogComments_Parent FOREIGN KEY (ParentCommentId) REFERENCES dbo.BlogComments(CommentId) ON DELETE NO ACTION
);

CREATE TABLE dbo.BlogLikes (
    BlogLikeId INT IDENTITY(1,1) PRIMARY KEY,
    BlogPostId INT NOT NULL,
    UserId INT NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_BlogLikes UNIQUE (BlogPostId, UserId),
    CONSTRAINT FK_BlogLikes_Post FOREIGN KEY (BlogPostId) REFERENCES dbo.BlogPosts(BlogPostId) ON DELETE CASCADE,
    CONSTRAINT FK_BlogLikes_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE
);

CREATE TABLE dbo.BlogViews (
    BlogViewId INT IDENTITY(1,1) PRIMARY KEY,
    BlogPostId INT NOT NULL,
    ViewerUserId INT NULL,
    SessionId NVARCHAR(200) NULL,
    ViewedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_BlogViews_Post FOREIGN KEY (BlogPostId) REFERENCES dbo.BlogPosts(BlogPostId) ON DELETE CASCADE,
    CONSTRAINT FK_BlogViews_User FOREIGN KEY (ViewerUserId) REFERENCES dbo.Users(UserId) ON DELETE SET NULL
);

-- ============================================================
-- 11) INDEXES (key queries)
-- ============================================================
CREATE INDEX IX_Users_Email ON dbo.Users(Email);
CREATE INDEX IX_Jobs_Title_Location ON dbo.Jobs(Title, Location);
CREATE INDEX IX_Jobs_Status_PostedAt ON dbo.Jobs(Status, PostedAt);
CREATE INDEX IX_JobApplications_JobId ON dbo.JobApplications(JobId);
CREATE INDEX IX_JobApplications_JobSeeker ON dbo.JobApplications(JobSeekerProfileId);
CREATE INDEX IX_CVs_JobSeeker ON dbo.CVs(JobSeekerProfileId);
CREATE INDEX IX_JobSkills_JobId ON dbo.JobSkills(JobId);
CREATE INDEX IX_JobJobTags_JobId ON dbo.JobJobTags(JobId);
CREATE INDEX IX_BlogPosts_Status_PublishedAt ON dbo.BlogPosts(Status, PublishedAt);
CREATE INDEX IX_BlogPosts_CategoryId ON dbo.BlogPosts(CategoryId);
CREATE INDEX IX_BlogPosts_AuthorUserId ON dbo.BlogPosts(AuthorUserId);
CREATE INDEX IX_BlogComments_PostId ON dbo.BlogComments(BlogPostId);
CREATE INDEX IX_BlogViews_PostId ON dbo.BlogViews(BlogPostId);

-- ============================================================
-- 12) STORED PROCEDURES
-- ============================================================
GO

CREATE PROCEDURE dbo.sp_CreateUser
    @Email NVARCHAR(256),
    @PasswordHash NVARCHAR(512) = NULL,
    @DisplayName NVARCHAR(200) = NULL,
    @OutUserId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.Users (Email, PasswordHash, DisplayName, CreatedAt)
    VALUES (@Email, @PasswordHash, @DisplayName, SYSUTCDATETIME());
    SET @OutUserId = SCOPE_IDENTITY();
END;
GO

CREATE PROCEDURE dbo.sp_PostJob
    @CompanyId INT,
    @PostedByUserId INT,
    @Title NVARCHAR(300),
    @Slug NVARCHAR(300),
    @Description NVARCHAR(MAX) = NULL,
    @Requirements NVARCHAR(MAX) = NULL,
    @Benefits NVARCHAR(MAX) = NULL,
    @SalaryMin INT = NULL,
    @SalaryMax INT = NULL,
    @JobType NVARCHAR(50) = NULL,
    @Location NVARCHAR(300) = NULL,
    @CategoryId INT = NULL,
    @OutJobId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.Jobs
    (CompanyId, PostedByUserId, Title, Slug, Description, Requirements, Benefits, SalaryMin, SalaryMax, JobType, Location, CategoryId, Status, CreatedAt, PostedAt)
    VALUES
    (@CompanyId, @PostedByUserId, @Title, @Slug, @Description, @Requirements, @Benefits, @SalaryMin, @SalaryMax, @JobType, @Location, @CategoryId, 'PendingReview', SYSUTCDATETIME(), SYSUTCDATETIME());

    SET @OutJobId = SCOPE_IDENTITY();
END;
GO

CREATE PROCEDURE dbo.sp_ApplyToJob
    @JobId INT,
    @JobSeekerProfileId INT,
    @CVId INT = NULL,
    @CoverLetter NVARCHAR(MAX) = NULL,
    @OutApplicationId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.JobApplications (JobId, JobSeekerProfileId, CVId, CoverLetter, AppliedAt)
    VALUES (@JobId, @JobSeekerProfileId, @CVId, @CoverLetter, SYSUTCDATETIME());

    SET @OutApplicationId = SCOPE_IDENTITY();

    INSERT INTO dbo.ApplicationEvents (ApplicationId, EventType, EventData, CreatedAt)
    VALUES (@OutApplicationId, 'Applied', NULL, SYSUTCDATETIME());
END;
GO

CREATE PROCEDURE dbo.sp_SearchCVs
    @Keyword NVARCHAR(200) = NULL,
    @Location NVARCHAR(200) = NULL,
    @Page INT = 1,
    @PageSize INT = 20
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Offset INT = (@Page - 1) * @PageSize;

    SELECT c.CVId, js.FullName, js.Location, c.Title, c.FileUrl, c.StructuredData
    FROM dbo.CVs c
    INNER JOIN dbo.JobSeekerProfiles js ON c.JobSeekerProfileId = js.JobSeekerProfileId
    WHERE ( @Keyword IS NULL OR (c.StructuredData LIKE '%' + @Keyword + '%' OR js.FullName LIKE '%' + @Keyword + '%') )
      AND ( @Location IS NULL OR js.Location LIKE '%' + @Location + '%' )
    ORDER BY c.CreatedAt DESC
    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;
END;
GO

-- ============================================================
-- 13) SEED DATA (roles)
-- ============================================================
BEGIN TRY
    BEGIN TRANSACTION;

    IF NOT EXISTS (SELECT 1 FROM dbo.Roles WHERE RoleName='JobSeeker')
        INSERT INTO dbo.Roles (RoleName, Description) VALUES ('JobSeeker', 'Job seeker / candidate');

    IF NOT EXISTS (SELECT 1 FROM dbo.Roles WHERE RoleName='Employer')
        INSERT INTO dbo.Roles (RoleName, Description) VALUES ('Employer', 'Company employer account');

    IF NOT EXISTS (SELECT 1 FROM dbo.Roles WHERE RoleName='Admin')
        INSERT INTO dbo.Roles (RoleName, Description) VALUES ('Admin', 'Administrator');

    COMMIT TRAN;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRAN;
    DECLARE @Err NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@Err, 16, 1);
END CATCH;
GO
