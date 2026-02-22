-- Script tạo tài khoản admin
-- Chạy script này trực tiếp vào database MySQL

USE jv_portal;

-- Xóa user admin nếu đã tồn tại (để tạo mới)
DELETE FROM users WHERE username = 'admin';

-- Tạo admin user với password 'admin123' (BCrypt hash)
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

-- Kiểm tra
SELECT id, uuid, username, email, full_name, role, is_verified, is_active 
FROM users 
WHERE username = 'admin';
