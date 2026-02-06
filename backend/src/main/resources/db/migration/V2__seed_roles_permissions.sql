-- Insert default roles
INSERT INTO roles (uuid, name, description, is_active) VALUES
('role-admin-uuid', 'ADMIN', 'Administrator role with full access', TRUE),
('role-employer-uuid', 'EMPLOYER', 'Employer role for company management', TRUE),
('role-job-seeker-uuid', 'JOB_SEEKER', 'Job seeker role for job applications', TRUE);

-- Insert permissions for users resource
INSERT INTO permissions (uuid, name, description, resource, action, is_active) VALUES
-- User permissions
('perm-user-read-uuid', 'USER_READ', 'Read user information', 'USER', 'READ', TRUE),
('perm-user-update-uuid', 'USER_UPDATE', 'Update user information', 'USER', 'UPDATE', TRUE),
('perm-user-delete-uuid', 'USER_DELETE', 'Delete user account', 'USER', 'DELETE', TRUE),

-- Job permissions
('perm-job-create-uuid', 'JOB_CREATE', 'Create new job posting', 'JOB', 'CREATE', TRUE),
('perm-job-read-uuid', 'JOB_READ', 'Read job information', 'JOB', 'READ', TRUE),
('perm-job-update-uuid', 'JOB_UPDATE', 'Update job posting', 'JOB', 'UPDATE', TRUE),
('perm-job-delete-uuid', 'JOB_DELETE', 'Delete job posting', 'JOB', 'DELETE', TRUE),
('perm-job-list-uuid', 'JOB_LIST', 'List all jobs', 'JOB', 'LIST', TRUE),

-- Application permissions
('perm-application-create-uuid', 'APPLICATION_CREATE', 'Apply for job', 'APPLICATION', 'CREATE', TRUE),
('perm-application-read-uuid', 'APPLICATION_READ', 'Read application details', 'APPLICATION', 'READ', TRUE),
('perm-application-update-uuid', 'APPLICATION_UPDATE', 'Update application status', 'APPLICATION', 'UPDATE', TRUE),
('perm-application-list-uuid', 'APPLICATION_LIST', 'List applications', 'APPLICATION', 'LIST', TRUE),

-- Company permissions
('perm-company-create-uuid', 'COMPANY_CREATE', 'Create company profile', 'COMPANY', 'CREATE', TRUE),
('perm-company-read-uuid', 'COMPANY_READ', 'Read company information', 'COMPANY', 'READ', TRUE),
('perm-company-update-uuid', 'COMPANY_UPDATE', 'Update company profile', 'COMPANY', 'UPDATE', TRUE),
('perm-company-delete-uuid', 'COMPANY_DELETE', 'Delete company profile', 'COMPANY', 'DELETE', TRUE),

-- Admin permissions
('perm-admin-user-list-uuid', 'ADMIN_USER_LIST', 'List all users', 'ADMIN', 'USER_LIST', TRUE),
('perm-admin-job-list-uuid', 'ADMIN_JOB_LIST', 'List all jobs', 'ADMIN', 'JOB_LIST', TRUE),
('perm-admin-company-list-uuid', 'ADMIN_COMPANY_LIST', 'List all companies', 'ADMIN', 'COMPANY_LIST', TRUE);

-- Assign permissions to ADMIN role
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
);

-- Assign permissions to EMPLOYER role
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'EMPLOYER' 
AND p.name IN (
    'USER_READ', 'USER_UPDATE',
    'JOB_CREATE', 'JOB_READ', 'JOB_UPDATE', 'JOB_LIST',
    'APPLICATION_READ', 'APPLICATION_UPDATE', 'APPLICATION_LIST',
    'COMPANY_CREATE', 'COMPANY_READ', 'COMPANY_UPDATE'
);

-- Assign permissions to JOB_SEEKER role
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'JOB_SEEKER' 
AND p.name IN (
    'USER_READ', 'USER_UPDATE',
    'JOB_READ', 'JOB_LIST',
    'APPLICATION_CREATE', 'APPLICATION_READ', 'APPLICATION_LIST',
    'COMPANY_READ'
);