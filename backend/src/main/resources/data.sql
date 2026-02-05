-- Insert default roles
INSERT INTO Roles (RoleName, Description, CreatedAt)
VALUES ('ROLE_CANDIDATE', 'Job seeker/Candidate role', NOW())
ON DUPLICATE KEY UPDATE RoleName = RoleName;

-- Insert admin role
INSERT INTO Roles (RoleName, Description, CreatedAt)
VALUES ('ROLE_ADMIN', 'Administrator role', NOW())
ON DUPLICATE KEY UPDATE RoleName = RoleName;

-- Insert employer role
INSERT INTO Roles (RoleName, Description, CreatedAt)
VALUES ('ROLE_EMPLOYER', 'Employer role', NOW())
ON DUPLICATE KEY UPDATE RoleName = RoleName;

-- Insert user role (for backward compatibility)
INSERT INTO Roles (RoleName, Description, CreatedAt)
VALUES ('ROLE_USER', 'Default user role', NOW())
ON DUPLICATE KEY UPDATE RoleName = RoleName;