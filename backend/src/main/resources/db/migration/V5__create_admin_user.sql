-- V5: Create default admin user
-- Run this SQL to create an admin account for testing
-- Default credentials: admin / admin123

-- Create admin user with password 'admin123' (BCrypt hash)
INSERT INTO users (uuid, username, email, password, full_name, role, is_verified, is_active, created_at, updated_at)
VALUES (
    'admin-user-uuid',
    'admin',
    'admin@jvportal.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- admin123
    'Administrator',
    'ADMIN',
    TRUE,
    TRUE,
    NOW(),
    NOW()
);

-- Note: The password 'admin123' is hashed with BCrypt
-- If you need to create a new hash, you can use: https://bcrypt.online/
-- Default password: admin123
