# JSON Test Examples cho Swagger API

> **Swagger UI:** `http://localhost:8080/swagger-ui/index.html`

---

# 🔐 Authentication APIs (AuthController)

## 1. Đăng ký tài khoản (Register)

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "tuanphong",
  "password": "12345678",
  "email": "tuanphong@example.com",
  "fullName": "Nguyễn Tuấn Phong"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "tuanphong",
    "email": "tuanphong@example.com",
    "fullName": "Nguyễn Tuấn Phong",
    "role": "JOB_SEEKER",
    "isVerified": false
  }
}
```

---

## 2. Đăng nhập (Login)

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "username": "tuanphong",
  "password": "12345678"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "tuanphong",
    "email": "tuanphong@example.com",
    "role": "JOB_SEEKER"
  }
}
```

---

## 3. Quên mật khẩu (Forgot Password)

**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "tuanphong@example.com"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email",
  "data": null
}
```

---

## 4. Đặt lại mật khẩu (Reset Password)

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**
```json
{
  "email": "tuanphong@example.com",
  "otp": "123456",
  "newPassword": "MatKhauMoi123!"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Password reset successful",
  "data": null
}
```

---

## 5. Đổi mật khẩu (Change Password)

**Endpoint:** `POST /api/auth/change-password`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "username": "tuanphong",
  "currentPassword": "MatKhauCu123!",
  "newPassword": "MatKhauMoi123!"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null
}
```

---

## 6. Xác thực email (Verify Email)

**Endpoint:** `POST /api/auth/verify-email`

**Request Body:**
```json
{
  "email": "tuanphong@example.com",
  "otp": "123456"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": null
}
```

---

## 7. Đăng xuất (Logout)

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

---

# 🔔 Notification APIs (NotificationController)

## 8. Lấy danh sách thông báo

**Endpoint:** `GET /api/notifications`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
```
userId=1
page=0
size=10
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "userId": 1,
        "title": "Công việc mới phù hợp",
        "message": "Có công việc Senior Java Developer tại TechCorp Vietnam phù hợp với hồ sơ của bạn",
        "type": "JOB_RECOMMENDATION",
        "isRead": false,
        "referenceId": 1,
        "referenceType": "JOB",
        "createdAt": "2026-02-06T10:00:00",
        "readAt": null
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 10
    },
    "totalElements": 1,
    "totalPages": 1
  }
}
```

---

## 9. Lấy danh sách thông báo chưa đọc

**Endpoint:** `GET /api/notifications/unread`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
```
userId=1
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "title": "Công việc mới phù hợp",
      "message": "Có công việc mới...",
      "type": "JOB_RECOMMENDATION",
      "isRead": false,
      "referenceId": 1,
      "referenceType": "JOB",
      "createdAt": "2026-02-06T10:00:00",
      "readAt": null
    }
  ]
}
```

---

## 10. Đếm thông báo chưa đọc

**Endpoint:** `GET /api/notifications/unread/count`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
```
userId=1
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "count": 5
  }
}
```

---

## 11. Đánh dấu đã đọc

**Endpoint:** `PUT /api/notifications/{id}/read`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
```
userId=1
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Marked as read",
  "data": {
    "id": 1,
    "userId": 1,
    "title": "Công việc mới phù hợp",
    "message": "Có công việc mới...",
    "type": "JOB_RECOMMENDATION",
    "isRead": true,
    "referenceId": 1,
    "referenceType": "JOB",
    "createdAt": "2026-02-06T10:00:00",
    "readAt": "2026-02-06T11:00:00"
  }
}
```

---

## 12. Đánh dấu tất cả đã đọc

**Endpoint:** `PUT /api/notifications/read-all`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
```
userId=1
```

**Expected Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read",
  "data": null
}
```

---

# 📝 Job Application APIs (ApplicationController)

## 13. Ứng tuyển công việc

**Endpoint:** `POST /api/applications/apply`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "jobId": 1,
  "coverLetter": "Tôi rất quan tâm đến vị trí này...",
  "cvUrl": "https://storage.jobportal.com/cvs/my-cv.pdf",
  "portfolioUrl": "https://portfolio.example.com",
  "expectedSalary": 15000000,
  "availableFrom": "2026-03-01",
  "notes": "Có thể làm việc remote"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": 1,
    "jobId": 1,
    "userId": 1,
    "status": "PENDING",
    "coverLetter": "Tôi rất quan tâm đến vị trí này...",
    "cvUrl": "https://storage.jobportal.com/cvs/my-cv.pdf",
    "expectedSalary": 15000000,
    "createdAt": "2026-02-06T10:00:00"
  }
}
```

---

## 14. Lấy danh sách đơn ứng tuyển của user

**Endpoint:** `GET /api/applications/my-applications`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
```
userId=1
page=0
size=10
```

---

## 15. Cập nhật trạng thái đơn (Employer)

**Endpoint:** `PUT /api/applications/{id}/status`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "status": "INTERVIEW",
  "reviewNotes": "Ứng viên có kinh nghiệm phù hợp",
  "interviewDate": "2026-02-15 14:00:00",
  "interviewLocation": "TechCorp Office, Quận 1, TP.HCM"
}
```

---

## 16. Rút đơn ứng tuyển

**Endpoint:** `DELETE /api/applications/{id}/withdraw`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

# ❤️ Saved Jobs APIs

## 17. Lưu công việc

**Endpoint:** `POST /api/saved-jobs/{jobId}`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
```
userId=1
```

---

## 18. Bỏ lưu công việc

**Endpoint:** `DELETE /api/saved-jobs/{jobId}`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
```
userId=1
```

---

## 19. Kiểm tra job đã lưu chưa

**Endpoint:** `GET /api/saved-jobs/{jobId}/status`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "isSaved": true
  }
}
```

---

# 📄 CV Management APIs

## 20. Upload CV

**Endpoint:** `POST /api/cvs/upload`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Content-Type:** `multipart/form-data`

**Form Data:**
- file: (file)
- title: "CV Tiếng Việt"
- description: "CV cập nhật mới nhất 2026"

---

## 21. Lấy danh sách CV

**Endpoint:** `GET /api/cvs`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
```
userId=1
page=0
size=10
```

---

## 22. Đặt CV mặc định

**Endpoint:** `PUT /api/cvs/{cvId}/default`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
```
userId=1
```

---

# 📊 Analytics APIs

## 23. Admin Dashboard

**Endpoint:** `GET /api/analytics/admin/dashboard`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalJobs": 75,
    "totalApplications": 320,
    "totalCompanies": 25,
    "totalCVs": 180,
    "usersByRole": {
      "JOB_SEEKER": 100,
      "EMPLOYER": 45,
      "ADMIN": 5
    },
    "jobsByType": {
      "FULL_TIME": 50,
      "PART_TIME": 15,
      "INTERNSHIP": 10
    }
  }
}
```

---

## 24. Employer Dashboard

**Endpoint:** `GET /api/analytics/employer/dashboard`

**Query Parameters:**
```
companyId=1
```

---

## 25. Job Seeker Dashboard

**Endpoint:** `GET /api/analytics/jobseeker/dashboard`

**Query Parameters:**
```
userId=1
```

---

# 🔔 Notification Types (Enum)

```json
{
  "JOB_RECOMMENDATION": "Công việc đề xuất",
  "JOB_EXPIRED": "Công việc hết hạn",
  "JOB_APPLICATION_RECEIVED": "Nhận đơn ứng tuyển",
  "JOB_APPLICATION_UPDATED": "Cập nhật đơn ứng tuyển",
  "APPLICATION_SUBMITTED": "Đã nộp đơn",
  "APPLICATION_REVIEWING": "Đang xem xét",
  "APPLICATION_INTERVIEW": "Mời phỏng vấn",
  "APPLICATION_ACCEPTED": "Được chấp nhận",
  "APPLICATION_REJECTED": "Bị từ chối",
  "COMPANY_NEW_JOB": "Công việc mới từ công ty",
  "SYSTEM_ANNOUNCEMENT": "Thông báo hệ thống",
  "PASSWORD_CHANGED": "Đổi mật khẩu",
  "EMAIL_VERIFIED": "Email đã xác thực"
}
```

---

# 📋 Application Status (Enum)

```json
{
  "PENDING": "Chờ xử lý",
  "VIEWED": "Đã xem",
  "UNDER_REVIEW": "Đang xem xét",
  "INTERVIEW": "Phỏng vấn",
  "OFFER": "Đề nghị",
  "ACCEPTED": "Được chấp nhận",
  "REJECTED": "Bị từ chối"
}
```

---

## Hướng dẫn test với Swagger UI

1. Mở trình duyệt và truy cập: **http://localhost:8080/swagger-ui/index.html**

2. Để test các API **không cần authentication**:
   - `/api/auth/register`
   - `/api/auth/login`
   - `/api/auth/forgot-password`
   - `/api/auth/reset-password`
   - `/api/auth/verify-email`

3. Để test các API **cần authentication**:
   - Đầu tiên gọi `/api/auth/login` để lấy token
   - Click nút **Authorize** → Nhập: `Bearer <token>`
   - Sau đó gọi các API khác

---

## Tổng kết các API

| Module | Số lượng API | Endpoint prefix |
|--------|-------------|-----------------|
| Authentication | 7 | `/api/auth/` |
| Notifications | 5 | `/api/notifications/` |
| Job Applications | 8 | `/api/applications/` |
| Saved Jobs | 5 | `/api/saved-jobs/` |
| CV Management | 7 | `/api/cvs/` |
| Analytics | 3 | `/api/analytics/` |
| **Tổng** | **47** | |