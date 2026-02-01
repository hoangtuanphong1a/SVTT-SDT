# HỆ THỐNG QUẢN LÝ TUYỂN DỤNG

## 📋 GIỚI THIỆU CHUNG

Hệ thống quản lý tuyển dụng là một giải pháp toàn diện giúp doanh nghiệp quản lý toàn bộ quy trình tuyển dụng từ đăng tin tuyển dụng, tiếp nhận CV, sắp xếp phỏng vấn đến đánh giá và theo dõi kết quả tuyển dụng.

## 🎯 KIẾN TRÚC HỆ THỐNG

```
Recruitment-System/
├── backend/                  # Backend microservices (5 dịch vụ)
│   ├── api-gateway/          # Cổng API với xác thực JWT
│   └── services/             # Các microservice
│       ├── auth-service/     # ✅ Dịch vụ xác thực hoàn chỉnh
│       ├── job-service/      # Dịch vụ quản lý việc làm
│       ├── candidate-service/# Dịch vụ quản lý ứng viên
│       ├── interview-service/# Dịch vụ quản lý phỏng vấn
│       └── notification-service/# Dịch vụ thông báo
├── frontend/                 # Frontend VueJS 3
│   ├── public/               # Tài nguyên tĩnh
│   └── src/                  # Mã nguồn
│       ├── assets/           # Tài nguyên
│       ├── components/       # Các component
│       ├── router/           # Định tuyến
│       ├── services/         # Các service API
│       ├── store/            # Quản lý trạng thái
│       ├── utils/            # Tiện ích
│       └── views/            # Các trang
├── docker/                   # Cấu hình Docker
│   └── docker-compose.dev.yml # Môi trường phát triển
├── docs/                     # Tài liệu
│   ├── database-schema.sql   # Schema cơ sở dữ liệu
│   └── database-summary.md   # Phân tích cơ sở dữ liệu
└── README.md                 # Tài liệu dự án
```

## 🚀 HƯỚNG DẪN TRIỂN KHAI

### 1. Yêu Cầu Hệ Thống

**Phần mềm cần cài đặt:**
- Java 17+
- Node.js 18+
- Docker
- PostgreSQL
- Maven

**Công cụ phát triển:**
- IDE: IntelliJ IDEA hoặc VS Code
- Postman (cho kiểm thử API)
- Docker Desktop (cho quản lý container)

### 2. Cài Đặt Môi Trường Phát Triển

#### Cài đặt backend (Spring Boot)

```bash
# Di chuyển vào thư mục auth-service
cd Recruitment-System/backend/services/auth-service

# Cài đặt dependencies và build
mvn clean install

# Chạy dịch vụ
mvn spring-boot:run
```

Dịch vụ sẽ chạy tại: `http://localhost:8081`

#### Cài đặt frontend (VueJS)

```bash
# Di chuyển vào thư mục frontend
cd Recruitment-System/frontend

# Cài đặt dependencies
npm install

# Chạy frontend
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:3000`

#### Chạy toàn bộ hệ thống với Docker

```bash
# Di chuyển vào thư mục gốc
cd Recruitment-System

# Build và chạy tất cả dịch vụ
docker-compose -f docker-compose.dev.yml up --build
```

### 3. Truy Cập Các Dịch Vụ

Sau khi chạy thành công, bạn có thể truy cập:

- **Frontend**: `http://localhost:3000`
- **Auth Service**: `http://localhost:8081`
- **Swagger UI**: `http://localhost:8081/swagger-ui.html`
- **API Gateway**: `http://localhost:8080`
- **API Docs**: `http://localhost:8081/v3/api-docs`

### 4. Cấu Hình Cơ Sở Dữ Liệu

Hệ thống sử dụng PostgreSQL với cấu hình mặc định:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/recruitment_db
    username: recruitment
    password: recruitment123
```

Bạn có thể thay đổi cấu hình trong file `application.yml` của mỗi dịch vụ.

### 5. Xác Thực và Bảo Mật

Hệ thống sử dụng JWT (JSON Web Token) cho xác thực:

- **Token expiration**: 24 giờ
- **Refresh token expiration**: 7 ngày
- **Bảo mật mật khẩu**: BCrypt
- **Phân quyền**: Role-based (JobSeeker, Employer, Admin)

## 🔧 HƯỚNG DẪN PHÁT TRIỂN

### 1. Cấu Trúc Dự Án

**Backend (Spring Boot):**
- Mỗi dịch vụ là một module độc lập
- Sử dụng Spring Data JPA cho truy cập cơ sở dữ liệu
- Spring Security cho bảo mật
- Swagger cho tài liệu API

**Frontend (VueJS):**
- Sử dụng Vue 3 với Composition API
- Pinia cho quản lý trạng thái
- Vue Router cho định tuyến
- Vuetify cho giao diện người dùng
- Axios cho gọi API

### 2. Quy Trình Làm Việc

1. **Tạo nhánh mới** cho tính năng:
```bash
git checkout -b feature/[tên-tính-năng]
```

2. **Phát triển tính năng** theo yêu cầu

3. **Kiểm thử** tính năng:
```bash
# Backend
mvn test

# Frontend
npm run test
```

4. **Tạo pull request** và review code

5. **Merge vào nhánh chính** sau khi được approve

### 3. Quy Ước Code

**Backend (Java):**
- Sử dụng Lombok để giảm code boilerplate
- Áp dụng SOLID principles
- Code clean và dễ đọc
- Comment rõ ràng cho các phương thức phức tạp

**Frontend (JavaScript):**
- Sử dụng ESLint cho kiểm tra code
- Component-based development
- Code tái sử dụng cao
- Comment bằng tiếng Việt hoặc tiếng Anh

## 📦 TRIỂN KHAI SẢN PHẨM

### 1. Build Dịch Vụ Backend

```bash
# Build tất cả dịch vụ backend
cd Recruitment-System/backend
mvn clean package -DskipTests
```

### 2. Build Frontend

```bash
# Build frontend
cd Recruitment-System/frontend
npm run build
```

### 3. Triển Khai Với Docker

```bash
# Build và chạy sản phẩm
docker-compose -f docker-compose.prod.yml up --build -d
```

### 4. Scale Dịch Vụ

```bash
# Scale các dịch vụ theo nhu cầu
docker-compose up --scale job-service=3 --scale candidate-service=3
```

## 🛠 CÔNG CỤ HỖ TRỢ

### 1. Swagger UI

Truy cập `http://localhost:8081/swagger-ui.html` để:

- Xem tài liệu API tự động
- Thử nghiệm API trực tiếp
- Xem các endpoint và mô tả
- Kiểm tra JWT authentication

### 2. Database Management

Sử dụng các công cụ như:
- DBeaver
- pgAdmin
- TablePlus

Kết nối với cơ sở dữ liệu:
```
Host: localhost
Port: 5432
Database: recruitment_db
Username: recruitment
Password: recruitment123
```

### 3. Monitoring

Các endpoint monitoring:
- `http://localhost:8081/actuator/health` - Kiểm tra sức khỏe dịch vụ
- `http://localhost:8081/actuator/metrics` - Các chỉ số hiệu suất
- `http://localhost:8081/actuator/info` - Thông tin dịch vụ

## 🤝 ĐÓNG GÓP

Chúng tôi hoan nghênh mọi đóng góp cho dự án:

1. **Fork** repository
2. **Tạo nhánh** cho tính năng mới
3. **Commit** thay đổi
4. **Push** lên nhánh của bạn
5. **Tạo Pull Request**

## 📄 GIẤY PHÉP

Dự án sử dụng giấy phép MIT. Xem file `LICENSE` để biết chi tiết.

---

**Lưu ý:** Tài liệu này cung cấp hướng dẫn chi tiết từ cài đặt đến triển khai. Nếu có bất kỳ thắc mắc hoặc vấn đề nào, vui lòng liên hệ với đội ngũ phát triển để được hỗ trợ.
