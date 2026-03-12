# Hướng dẫn thêm dữ liệu mẫu vào Database

## Cách thêm dữ liệu (Thủ công - Không dùng code)

### 1. Đăng nhập vào MySQL

Sử dụng MySQL Workbench, phpMyAdmin hoặc command line:

```bash
mysql -u root -p
```

### 2. Chọn database

```sql
USE svtd_sdt;
```

### 3. Thêm dữ liệu mẫu

#### A. Thêm User (Người dùng)

```sql
-- Thêm Employer
INSERT INTO users (username, password, email, full_name, role, is_active, created_at) 
VALUES 
('employer1', '$2a$10$YourHashPassword', 'employer1@example.com', 'Công ty ABC', 'EMPLOYER', true, NOW()),
('employer2', '$2a$10$YourHashPassword', 'employer2@example.com', 'Công ty XYZ', 'EMPLOYER', true, NOW());

-- Thêm Job Seeker
INSERT INTO users (username, password, email, full_name, role, is_active, created_at) 
VALUES 
('jobseeker1', '$2a$10$YourHashPassword', 'jobseeker1@example.com', 'Nguyễn Văn A', 'JOB_SEEKER', true, NOW()),
('jobseeker2', '$2a$10$YourHashPassword', 'jobseeker2@example.com', 'Trần Thị B', 'JOB_SEEKER', true, NOW());
```

**Lưu ý:** Password cần được hash bằng BCrypt. Bạn có thể:
- Đăng ký user mới qua trang web và copy hash từ database
- Hoặc đăng nhập bằng user đã đăng ký và lấy password hash

#### B. Thêm Company (Công ty)

```sql
INSERT INTO companies (user_id, company_name, description, industry, company_size, address, phone, email, website, is_active, is_verified, created_at)
VALUES 
(2, 'Công ty ABC', 'Công ty công nghệ hàng đầu Việt Nam', 'Công nghệ thông tin', '51-200', '123 Đường Nguyễn Trãi, Quận 1, TP.HCM', '0123456789', 'contact@companyabc.com', 'https://companyabc.com', true, true, NOW()),
(3, 'Công ty XYZ', 'Công ty tài chính', 'Tài chính', '201-500', '456 Đường Lê Lợi, Quận 3, TP.HCM', '0987654321', 'info@companyxyz.com', 'https://companyxyz.com', true, true, NOW());
```

**Lưu ý:** Thay `user_id` = 2, 3 bằng ID thực tế của employer trong database

#### C. Thêm Jobs (Việc làm)

```sql
INSERT INTO jobs (company_id, title, description, requirements, benefits, job_type, experience, salary_min, salary_max, location, is_active, created_at)
VALUES 
(1, 'Lập trình viên Java', 'Tuyển dụng lập trình viên Java Backend', 'Có kinh nghiệm Java, Spring Boot', 'Lương hấp dẫn, phúc lợi tốt', 'FULL_TIME', '1-3 năm', 15000000, 30000000, 'TP.HCM', true, NOW()),
(1, 'Frontend Developer', 'Tuyển dụng Frontend Developer', 'HTML, CSS, JavaScript, Vue.js', 'Lương hấp dẫn, phúc lợi tốt', 'FULL_TIME', '1-3 năm', 12000000, 25000000, 'TP.HCM', true, NOW()),
(2, 'Kế toán trưởng', 'Tuyển dụng kế toán trưởng', 'Có kinh nghiệm kế toán từ 5 năm', 'Lương hấp dẫn, thưởng', 'FULL_TIME', '5 năm trở lên', 25000000, 40000000, 'TP.HCM', true, NOW());
```

**Lưu ý:** Thay `company_id` = 1, 2 bằng ID thực tế của company trong database

#### D. Thêm CV (Hồ sơ xin việc)

```sql
INSERT INTO cvs (user_id, title, full_name, email, phone, education, experience, skills, is_default, created_at)
VALUES 
(4, 'CV của Nguyễn Văn A', 'Nguyễn Văn A', 'jobseeker1@example.com', '0123456789', 'Đại học Bách Khoa', '2 năm kinh nghiệm Java', 'Java, Spring Boot, MySQL', true, NOW()),
(5, 'CV của Trần Thị B', 'Trần Thị B', 'jobseeker2@example.com', '0987654321', 'Đại học Kinh tế', '1 năm kinh nghiệm kế toán', 'Excel, Kế toán, Tài chính', true, NOW());
```

**Lưu ý:** Thay `user_id` = 4, 5 bằng ID thực tế của job seeker trong database

#### E. Thêm Applications (Đơn ứng tuyển)

```sql
INSERT INTO job_applications (user_id, job_id, cv_id, cover_letter, status, created_at)
VALUES 
(4, 1, 1, 'Tôi rất quan tâm đến vị trí này', 'PENDING', NOW()),
(5, 3, 2, 'Mong muốn được làm việc tại công ty', 'PENDING', NOW());
```

#### F. Thêm Saved Jobs (Việc làm đã lưu)

```sql
INSERT INTO saved_jobs (user_id, job_id, created_at)
VALUES 
(4, 2, NOW()),
(5, 1, NOW());
```

## Kiểm tra dữ liệu

```sql
-- Xem tất cả users
SELECT * FROM users;

-- Xem tất cả companies
SELECT * FROM companies;

-- Xem tất cả jobs
SELECT * FROM jobs;

-- Xem tất cả CVs
SELECT * FROM cvs;

-- Xem tất cả applications
SELECT * FROM job_applications;
```

## Lưu ý quan trọng

1. **ID tự động:** Không cần thêm ID, MySQL sẽ tự động tăng
2. **Password Hash:** Nên đăng ký user mới qua web rồi copy password hash
3. **Foreign Key:** Cần đảm bảo user_id, company_id, job_id, cv_id tồn tại trong database
4. **Sau khi thêm dữ liệu:** Restart backend và refresh trang web để xem dữ liệu mới
