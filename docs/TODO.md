# 🎯 Dự án Tốt Nghiệp - Job Portal System

## Mô tả dự án
Hệ thống cổng tuyển dụng việc làm (Job Portal) với các tính năng:
- Đăng ký/Đăng nhập người dùng (ứng viên & nhà tuyển dụng)
- Quản lý công việc (CRUD)
- Ứng tuyển công việc
- Quản lý hồ sơ CV
- Thông báo
- Analytics Dashboard

## 🚀 Công nghệ sử dụng

### Backend
- **Framework:** Spring Boot 3.x
- **Database:** MySQL (Flyway migrations)
- **ORM:** JPA/Hibernate
- **Security:** JWT Authentication
- **API Documentation:** Spring Doc OpenAPI (Swagger)
- **Build Tool:** Maven

### Frontend
- **Framework:** Vue.js 3
- **UI Library:** Vuetify / TailwindCSS
- **State Management:** Pinia/Vuex
- **Routing:** Vue Router

---

## 📁 Cấu trúc Backend

```
backend/src/main/java/org/example/backend/
├── common/
│   ├── base/           # BaseEntity, BaseRepository
│   ├── enums/          # ApplicationStatus, UserRole, JobType, etc.
│   ├── exception/      # Custom exceptions
│   ├── response/       # ApiResponse wrapper
│   └── security/       # JWT, SecurityConfig, UserDetails
├── module/
│   ├── auth/           # Authentication (Login, Register, JWT)
│   ├── user/           # User management
│   ├── company/        # Company profiles
│   ├── job/            # Job listings
│   ├── jobseeker/      # Job seeker profiles
│   ├── application/    # Job applications
│   ├── notification/   # Notification system
│   ├── savedjob/       # Saved/favorite jobs
│   ├── cv/             # CV management & upload
│   └── analytics/     # Dashboard analytics
└── BackendApplication.java
```

---

## 📡 API Endpoints (47 APIs)

### 🔐 Authentication (7 APIs)
| Method | Endpoint | Mô tả |
|--------|----------|--------|
| POST | `/api/auth/register` | Đăng ký tài khoản mới |
| POST | `/api/auth/login` | Đăng nhập |
| POST | `/api/auth/forgot-password` | Quên mật khẩu |
| POST | `/api/auth/reset-password` | Đặt lại mật khẩu |
| POST | `/api/auth/change-password` | Đổi mật khẩu |
| POST | `/api/auth/verify-email` | Xác thực email |
| POST | `/api/auth/logout` | Đăng xuất |

### 🔔 Notifications (5 APIs)
| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/api/notifications` | Lấy danh sách thông báo |
| GET | `/api/notifications/unread` | Thông báo chưa đọc |
| GET | `/api/notifications/unread/count` | Đếm thông báo chưa đọc |
| PUT | `/api/notifications/{id}/read` | Đánh dấu đã đọc |
| PUT | `/api/notifications/read-all` | Đánh dấu tất cả đã đọc |

### 🏢 Companies (4 APIs)
| Method | Endpoint | Mô tả |
|--------|----------|--------|
| POST | `/api/companies` | Tạo company profile |
| GET | `/api/companies` | Lấy danh sách companies |
| GET | `/api/companies/{id}` | Chi tiết company |
| PUT | `/api/companies/{id}` | Cập nhật company |
| DELETE | `/api/companies/{id}` | Xóa company |

### 💼 Jobs (5 APIs)
| Method | Endpoint | Mô tả |
|--------|----------|--------|
| POST | `/api/jobs` | Tạo job mới |
| GET | `/api/jobs` | Lấy danh sách jobs (filter) |
| GET | `/api/jobs/{id}` | Chi tiết job |
| PUT | `/api/jobs/{id}` | Cập nhật job |
| DELETE | `/api/jobs/{id}` | Xóa job |

### 👤 Job Seeker Profile (2 APIs)
| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/api/jobseeker/profile` | Lấy profile |
| PUT | `/api/jobseeker/profile` | Cập nhật profile |

### 📝 Job Applications (8 APIs)
| Method | Endpoint | Mô tả |
|--------|----------|--------|
| POST | `/api/applications/apply` | Ứng tuyển |
| GET | `/api/applications/my-applications` | DS đơn của user |
| GET | `/api/applications/{id}` | Chi tiết đơn |
| PUT | `/api/applications/{id}/status` | Cập nhật trạng thái |
| DELETE | `/api/applications/{id}/withdraw` | Rút đơn |
| GET | `/api/applications/job/{jobId}` | DS ứng viên |
| GET | `/api/applications/job/{jobId}/status/{status}` | Lọc theo trạng thái |
| GET | `/api/applications/job/{jobId}/count` | Đếm đơn |

### ❤️ Saved Jobs (5 APIs)
| Method | Endpoint | Mô tả |
|--------|----------|--------|
| POST | `/api/saved-jobs/{jobId}` | Lưu job |
| DELETE | `/api/saved-jobs/{jobId}` | Bỏ lưu |
| GET | `/api/saved-jobs` | DS job đã lưu |
| GET | `/api/saved-jobs/count` | Đếm job đã lưu |
| GET | `/api/saved-jobs/{jobId}/status` | Kiểm tra đã lưu |

### 📄 CV Management (7 APIs)
| Method | Endpoint | Mô tả |
|--------|----------|--------|
| POST | `/api/cvs/upload` | Upload CV |
| GET | `/api/cvs` | Lấy danh sách CV |
| GET | `/api/cvs/{id}` | Chi tiết CV |
| GET | `/api/cvs/default` | Lấy CV mặc định |
| PUT | `/api/cvs/{id}/default` | Đặt CV mặc định |
| DELETE | `/api/cvs/{id}` | Xóa CV |
| GET | `/api/cvs/download/{filename}` | Tải CV |

### 📊 Analytics (4 APIs)
| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/api/analytics/admin/dashboard` | Admin dashboard |
| GET | `/api/analytics/employer/dashboard` | Employer dashboard |
| GET | `/api/analytics/jobseeker/dashboard` | Job seeker dashboard |

---

## 🗄️ Database Schema

### Tables
- `users` - Người dùng
- `companies` - Công ty
- `jobs` - Công việc
- `job_applications` - Đơn ứng tuyển
- `notifications` - Thông báo
- `saved_jobs` - Job đã lưu
- `cvs` - Hồ sơ CV
- `job_seeker_profiles` - Hồ sơ ứng viên

### Enums
- `UserRole`: JOB_SEEKER, EMPLOYER, ADMIN
- `ApplicationStatus`: PENDING, VIEWED, UNDER_REVIEW, INTERVIEW, OFFER, REJECTED, ACCEPTED
- `JobType`: FULL_TIME, PART_TIME, INTERNSHIP, REMOTE, CONTRACT
- `ExperienceLevel`: JUNIOR, MIDDLE, SENIOR, LEAD, MANAGER
- `JobStatus`: DRAFT, ACTIVE, CLOSED, FILLED
- `NotificationType`: JOB_RECOMMENDATION, APPLICATION_UPDATED, etc.

---

## 🚦 Cách chạy dự án

### Backend
```bash
cd backend
mvn spring-boot:run
# Hoặc
mvn clean package -DskipTests
java -jar target/backend-*.jar
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Swagger UI
```
http://localhost:8080/swagger-ui/index.html
```

---

## ✅ Trạng thái hoàn thành

### Backend Modules
- [x] Authentication (7 APIs)
- [x] Notifications (5 APIs)
- [x] Companies (4 APIs)
- [x] Jobs (5 APIs)
- [x] Job Seeker Profile (2 APIs)
- [x] Job Applications (8 APIs)
- [x] Saved Jobs (5 APIs)
- [x] CV Management (7 APIs)
- [x] Analytics (3 APIs)

### Frontend Views
- [ ] Home
- [ ] Job List
- [ ] Job Detail
- [ ] Company List
- [ ] Company Detail
- [ ] Login/Register
- [ ] Admin Dashboard
- [ ] Employer Dashboard
- [ ] Job Seeker Dashboard
- [ ] CV Management
- [ ] Applications

---

## 📅 Tiến độ
**Tổng: 47 Backend APIs | ~11 Frontend Views**

- Backend: 100% hoàn thành ✅
- Frontend: 0% (chưa bắt đầu)

---

## 📞 Liên hệ
- GitHub: https://github.com/hoangtuanphong1a/SVTT-SDT