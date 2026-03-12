-- Thêm job mẫu vào database
-- Chạy file này trong MySQL để thêm dữ liệu test

-- Lưu ý: Thay đổi company_id = 1 thành ID thực tế của công ty trong database

INSERT INTO jobs (company_id, title, description, requirements, benefits, job_type, experience, salary_min, salary_max, location, is_active, created_at) 
VALUES 
(1, 'Lập trình viên Java Backend', 'Tuyển dụng lập trình viên Java Backend kinh nghiệm', 'Có kinh nghiệm Java, Spring Boot, MySQL. Có khả năng làm việc độc lập và theo nhóm.', 'Lương hấp dẫn (15-30 triệu), thưởng theo hiệu quả, BHXH, BHYT đầy đủ', 'FULL_TIME', '1-3 năm', 15000000, 30000000, 'TP.HCM', true, NOW()),
(1, 'Frontend Developer', 'Tuyển dụng Frontend Developer Vue.js', 'HTML, CSS, JavaScript, Vue.js. Có kinh nghiệm làm việc với REST API.', 'Lương 12-25 triệu, thưởng, phúc lợi tốt', 'FULL_TIME', '1-3 năm', 12000000, 25000000, 'Hà Nội', true, NOW()),
(1, 'Thực tập sinh IT', 'Tuyển thực tập sinh IT', 'Sinh viên năm 3-4 các ngành CNTT, có kiến thức cơ bản về lập trình.', 'Hỗ trợ 3-5 triệu/tháng, đào tạo chuyên nghiệp', 'INTERNSHIP', 'Chưa có kinh nghiệm', 3000000, 5000000, 'TP.HCM', true, NOW());

-- Kiểm tra jobs đã thêm
SELECT * FROM jobs;
