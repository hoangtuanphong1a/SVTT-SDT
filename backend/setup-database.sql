-- Setup script for Job Portal Database
-- Run this script with MySQL root user

-- Create database
CREATE DATABASE IF NOT EXISTS jv_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (change password as needed)
CREATE USER IF NOT EXISTS 'TUANPHONG'@'localhost' IDENTIFIED BY '12345678';

-- Grant privileges
GRANT ALL PRIVILEGES ON jv_portal.* TO 'TUANPHONG'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Verify
SELECT User, Host FROM mysql.user WHERE User = 'TUANPHONG';
SHOW DATABASES LIKE 'jv_portal';
