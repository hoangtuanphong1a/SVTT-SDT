v-- =====================================================
-- Script khởi tạo database đầy đủ cho JV Portal
-- Chạy script này trực tiếp vào MySQL
-- =====================================================

-- Tạo database nếu chưa tồn tại
CREATE DATABASE IF NOT EXISTS jv_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jv_portal;

-- =====================================================
-- 1. Tạo bảng USERS (nếu chưa tồn tại)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_uuid (uuid)
);

-- =====================================================
-- 2. Tạo bảng ROLES (nếu chưa tồn tại)
-- =====================================================
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_uuid (uuid)
);

-- =====================================================
-- 3. Tạo bảng PERMISSIONS (nếu chưa tồn tại)
-- =====================================================
CREATE TABLE IF NOT EXISTS permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    resource VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_resource_action (resource, action),
    INDEX idx_uuid (uuid)
);

-- =====================================================
-- 4. Tạo bảng ROLE_PERMISSIONS (nếu chưa tồn tại)
-- =====================================================
CREATE TABLE IF NOT EXISTS role_permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_role_permission (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    INDEX idx_role_id (role_id),
    INDEX idx_permission_id (permission_id)
);

-- =====================================================
-- 5. Tạo bảng USER_ROLES (nếu chưa tồn tại)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_user_role (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_role_id (role_id)
);

-- =====================================================
-- 6. Insert dữ liệu ROLES
-- =====================================================
INSERT INTO roles (uuid, name, description, is_active) VALUES
('role-admin-uuid', 'ADMIN', 'Administrator role with full access', TRUE),
('role-employer-uuid', 'EMPLOYER', 'Employer role for company management', TRUE),
('role-job-seeker-uuid', 'JOB_SEEKER', 'Job seeker role for job applications', TRUE)
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- =====================================================
-- 7. Insert dữ liệu PERMISSIONS
-- =====================================================
INSERT INTO permissions (uuid, name, description, resource, action, is_active) VALUES
('perm-user-read-uuid', 'USER_READ', 'Read user information', 'USER', 'READ', TRUE),
('perm-user-update-uuid', 'USER_UPDATE', 'Update user information', 'USER', 'UPDATE', TRUE),
('perm-user-delete-uuid', 'USER_DELETE', 'Delete user account', 'USER', 'DELETE', TRUE),
('perm-job-create-uuid', 'JOB_CREATE', 'Create new job posting', 'JOB', 'CREATE', TRUE),
('perm-job-read-uuid', 'JOB_READ', 'Read job information', 'JOB', 'READ', TRUE),
('perm-job-update-uuid', 'JOB_UPDATE', 'Update job posting', 'JOB', 'UPDATE', TRUE),
('perm-job-delete-uuid', 'JOB_DELETE', 'Delete job posting', 'JOB', 'DELETE', TRUE),
('perm-job-list-uuid', 'JOB_LIST', 'List all jobs', 'JOB', 'LIST', TRUE),
('perm-application-create-uuid', 'APPLICATION_CREATE', 'Apply for job', 'APPLICATION', 'CREATE', TRUE),
('perm-application-read-uuid', 'APPLICATION_READ', 'Read application details', 'APPLICATION', 'READ', TRUE),
('perm-application-update-uuid', 'APPLICATION_UPDATE', 'Update application status', 'APPLICATION', 'UPDATE', TRUE),
('perm-application-list-uuid', 'APPLICATION_LIST', 'List applications', 'APPLICATION', 'LIST', TRUE),
('perm-company-create-uuid', 'COMPANY_CREATE', 'Create company profile', 'COMPANY', 'CREATE', TRUE),
('perm-company-read-uuid', 'COMPANY_READ', 'Read company information', 'COMPANY', 'READ', TRUE),
('perm-company-update-uuid', 'COMPANY_UPDATE', 'Update company profile', 'COMPANY', 'UPDATE', TRUE),
('perm-company-delete-uuid', 'COMPANY_DELETE', 'Delete company profile', 'COMPANY', 'DELETE', TRUE),
('perm-admin-user-list-uuid', 'ADMIN_USER_LIST', 'List all users', 'ADMIN', 'USER_LIST', TRUE),
('perm-admin-job-list-uuid', 'ADMIN_JOB_LIST', 'List all jobs', 'ADMIN', 'JOB_LIST', TRUE),
('perm-admin-company-list-uuid', 'ADMIN_COMPANY_LIST', 'List all companies', 'ADMIN', 'COMPANY_LIST', TRUE)
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- =====================================================
-- 8. Gán quyền cho ADMIN role
-- =====================================================
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'ADMIN' 
AND p.name IN (
    'USER_READ', 'USER_UPDATE', 'USER_DELETE',
    'JOB_CREATE', 'JOB_READ', 'JOB_UPDATE', 'JOB_DELETE', 'JOB_LIST',
    'APPLICATION_CREATE', 'APPLICATION_READ', 'APPLICATION_UPDATE', 'APPLICATION_LIST',
    'COMPANY_CREATE', 'COMPANY_READ', 'COMPANY_UPDATE', 'COMPANY_DELETE',
    'ADMIN_USER_LIST', 'ADMIN_JOB_LIST', 'ADMIN_COMPANY_LIST'
) ON DUPLICATE KEY UPDATE role_id = role_id;

-- =====================================================
-- 9. Gán quyền cho EMPLOYER role
-- =====================================================
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'EMPLOYER' 
AND p.name IN (
    'USER_READ', 'USER_UPDATE',
    'JOB_CREATE', 'JOB_READ', 'JOB_UPDATE', 'JOB_LIST',
    'APPLICATION_READ', 'APPLICATION_UPDATE', 'APPLICATION_LIST',
    'COMPANY_CREATE', 'COMPANY_READ', 'COMPANY_UPDATE'
) ON DUPLICATE KEY UPDATE role_id = role_id;

-- =====================================================
-- 10. Gán quyền cho JOB_SEEKER role
-- =====================================================
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'JOB_SEEKER' 
AND p.name IN (
    'USER_READ', 'USER_UPDATE',
    'JOB_READ', 'JOB_LIST',
    'APPLICATION_CREATE', 'APPLICATION_READ', 'APPLICATION_LIST',
    'COMPANY_READ'
) ON DUPLICATE KEY UPDATE role_id = role_id;

-- =====================================================
-- 11. Tạo USER ADMIN
-- =====================================================
-- Xóa admin cũ nếu tồn tại
DELETE FROM users WHERE username = 'admin';

-- Tạo admin mới với password 'admin123' (BCrypt hash)
-- Hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO users (uuid, username, email, password, full_name, role, is_verified, is_active, created_at, updated_at)
VALUES (
    'admin-user-uuid-001',
    'admin',
    'admin@jvportal.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'Administrator',
    'ADMIN',
    TRUE,
    TRUE,
    NOW(),
    NOW()
);

-- =====================================================
-- 12. Kiểm tra kết quả
-- =====================================================
SELECT 'Users table:' AS Info;
SELECT id, uuid, username, email, full_name, role, is_verified, is_active FROM users;

SELECT 'Roles table:' AS Info;
SELECT * FROM roles;

SELECT 'Admin user created successfully!' AS Result;
