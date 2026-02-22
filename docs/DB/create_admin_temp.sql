-- Tạo tài khoản admin
INSERT INTO users (uuid, username, email, password, full_name, role, is_verified, is_active, created_at, updated_at) 
VALUES ('admin-uuid-001', 'admin', 'admin@cvking.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrator', 'ADMIN', TRUE, TRUE, NOW(), NOW());
