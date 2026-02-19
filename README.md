# 🎯 Việc Làm Plus - Job Portal Platform

<p align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.2.0-green?style=for-the-badge&logo=spring" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Vue.js-3.4-4FC08D?style=for-the-badge&logo=vue.js" alt="Vue.js">
  <img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=java" alt="Java 21">
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
</p>

<p align="center">
  <b>Nền tảng tuyển dụng thông minh kết nối ứng viên và nhà tuyển dụng</b>
</p>

---

## 📋 Mục Lục

- [Giới Thiệu](#-giới-thiệu)
- [Tính Năng Chính](#-tính-năng-chính)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Hướng Dẫn Cài Đặt](#-hướng-dẫn-cài-đặt)
- [API Documentation](#-api-documentation)
- [Docker Deployment](#-docker-deployment)
- [Lưu Ý Quan Trọng](#-lưu-ý-quan-trọng)
- [Tài Liệu Tham Khảo](#-tài-liệu-tham-khảo)

---

## 🌟 Giới Thiệu

**Việc Làm Plus** là một nền tảng tuyển dụng toàn diện được xây dựng với kiến trúc microservices hiện đại, kết nối ba đối tượng chính:

| Đối Tượng | Mô Tả |
|-----------|-------|
| 👤 **Ứng Viên (Job Seeker)** | Tìm kiếm việc làm, nộp đơn, quản lý CV và theo dõi ứng tuyển |
| 🏢 **Nhà Tuyển Dụng (Employer)** | Đăng tin tuyển dụng, quản lý ứng viên, tìm kiếm CV |
| ⚡ **Quản Trị Viên (Admin)** | Quản lý ngườii dùng, duyệt công ty, thống kê hệ thống |

### 🎯 Mục Tiêu Dự Án
- Xây dựng hệ thống tuyển dụng với giao diện hiện đại, thân thiện
- Đảm bảo bảo mật với JWT Authentication & Role-based Authorization
- Hỗ trợ xây dựng CV trực tuyến với nhiều mẫu template
- Tích hợp AI phân tích CV và gợi ý việc làm phù hợp

---

## ✨ Tính Năng Chính

### 🔐 Hệ Thống Xác Thực
- ✅ Đăng ký/Đăng nhập với JWT Token
- ✅ Phân quyền chi tiết (RBAC): ADMIN, EMPLOYER, JOBSEEKER
- ✅ Xác thực email qua OTP
- ✅ Quên mật khẩu & Đặt lại mật khẩu
- ✅ Refresh Token tự động
- ✅ Đăng nhập qua Google OAuth (tùy chọn)

### 👤 Dành cho Ứng Viên
- 🔍 Tìm kiếm việc làm với bộ lọc nâng cao
- 📝 Tạo và quản lý nhiều CV với template đẹp
- 💼 Nộp đơn ứng tuyển trực tuyến
- ⭐ Lưu công việc yêu thích
- 📬 Nhận thông báo việc làm phù hợp
- 📊 Theo dõi trạng thái đơn ứng tuyển

### 🏢 Dành cho Nhà Tuyển Dụng
- 🏗️ Quản lý thông tin công ty
- 📢 Đăng tin tuyển dụng
- 👥 Quản lý danh sách ứng viên
- 🔎 Tìm kiếm CV ứng viên
- 📈 Báo cáo thống kê hiệu quả tuyển dụng
- 💳 Quản lý gói dịch vụ đăng tin

### ⚡ Dành cho Admin
- 📊 Dashboard thống kê tổng quan
- 👥 Quản lý ngườii dùng (block/unblock)
- 🏢 Duyệt và quản lý công ty
- 📝 Quản lý bài đăng tuyển dụng
- 🔔 Quản lý thông báo hệ thống

---

## 🛠️ Công Nghệ Sử Dụng

### Backend
| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|-----------|----------|
| Spring Boot | 3.2.0 | Framework chính |
| Java | 21 | Ngôn ngữ lập trình |
| Spring Security | 6.x | Bảo mật & Authentication |
| Spring Data JPA | 3.x | ORM & Database access |
| JWT | 0.12.3 | Token-based authentication |
| MySQL | 8.0 | Relational database |
| Flyway | - | Database migrations |
| MapStruct | 1.5.5 | DTO mapping |
| Lombok | 1.18.30 | Reduce boilerplate code |
| Swagger/OpenAPI | 2.3.0 | API documentation |

### Frontend
| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|-----------|----------|
| Vue.js | 3.4 | Framework UI |
| TypeScript | 5.3 | Type-safe JavaScript |
| Vite | 5.0 | Build tool & Dev server |
| TailwindCSS | 3.3 | Utility-first CSS |
| Element Plus | 2.4.4 | UI Component library |
| Pinia | 2.1.7 | State management |
| Vue Router | 4.2.5 | Client-side routing |
| Axios | 1.6.2 | HTTP client |
| TanStack Query | 5.x | Server state management |
| Zod | 3.22 | Schema validation |

### DevOps & Tools
| Công Nghệ | Mục Đích |
|-----------|----------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Maven | Java build tool |
| npm/pnpm | Node.js package manager |

---

## 📁 Cấu Trúc Dự Án

```
JV/
├── 📁 backend/                 # Spring Boot Application
│   ├── pom.xml                 # Maven dependencies
│   ├── src/main/java/
│   │   └── org/example/backend/
│   │       ├── BackendApplication.java
│   │       ├── common/         # Shared utilities
│   │       │   ├── base/       # Base entity, service, repository
│   │       │   ├── config/     # Configuration classes
│   │       │   ├── enums/      # Global enums
│   │       │   ├── exception/  # Custom exceptions
│   │       │   ├── response/   # API response wrapper
│   │       │   ├── security/   # JWT, Security config
│   │       │   └── utils/      # Utility functions
│   │       ├── config/         # Spring configurations
│   │       ├── infrastructure/ # External services
│   │       │   ├── mail/       # Email service
│   │       │   └── storage/    # File storage
│   │       └── module/         # Feature modules
│   │           ├── auth/       # Authentication
│   │           ├── user/       # User management
│   │           ├── company/    # Company/Employer
│   │           └── jobseeker/  # Job seeker profile
│   └── src/main/resources/
│       ├── application.properties  # App configuration
│       └── db/migration/       # Flyway SQL scripts
│
├── 📁 frontend/                # Vue.js Application
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── src/
│       ├── main.ts             # Entry point
│       ├── App.vue             # Root component
│       ├── assets/             # Static assets
│       ├── layouts/            # Page layouts
│       │   ├── DefaultLayout.vue
│       │   └── AdminLayout.vue
│       ├── modules/            # Feature modules
│       │   └── auth/           # Auth module
│       │       ├── api.ts      # API calls
│       │       ├── store.ts    # Pinia store
│       │       ├── types.ts    # TypeScript types
│       │       └── schema.ts   # Validation schemas
│       ├── router/             # Vue Router
│       │   └── index.js        # Route definitions
│       ├── shared/             # Shared utilities
│       │   ├── api/            # HTTP client & interceptors
│       │   └── components/     # Reusable components
│       ├── store/              # Global state
│       └── views/              # Page components
│           ├── auth/           # Login, Register pages
│           ├── admin/          # Admin pages
│           ├── employer/       # Employer pages
│           └── jobseeker/      # Job seeker pages
│
├── 📁 docs/                    # Documentation
│   ├── AUTH_API_INTEGRATION.md
│   ├── AUTH_API_TEST.md
│   ├── database-schema.sql
│   └── ...
│
├── 📁 docker/                  # Docker configurations
├── docker-compose.yml          # Docker Compose setup
└── README.md                   # This file
```

---

## 🚀 Hướng Dẫn Cài Đặt

### 📋 Yêu Cầu Hệ Thống

- **Java**: JDK 21 hoặc cao hơn
- **Node.js**: 18.x hoặc cao hơn
- **MySQL**: 8.0+
- **Maven**: 3.8+
- **npm/pnpm**: Latest version

### 🔧 Bước 1: Clone Repository

```bash
git clone https://github.com/hoangtuanphong1a/SVTT-SDT.git
cd SVTT-SDT
```

### 🗄️ Bước 2: Cấu Hình Database

#### Option A: MySQL Local

1. Tạo database trong MySQL:
```sql
CREATE DATABASE jv_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'TUANPHONG'@'localhost' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON jv_portal.* TO 'TUANPHONG'@'localhost';
FLUSH PRIVILEGES;
```

2. Hoặc cập nhật `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=your_username
spring.datasource.password=your_password
```

#### Option B: Docker (Khuyến nghị)

```bash
docker-compose up -d mysql
```

### ⚙️ Bước 3: Chạy Backend

```bash
cd backend

# Build project
mvn clean install -DskipTests

# Run Spring Boot
mvn spring-boot:run
```

Backend sẽ chạy tại: `http://localhost:8080`

### 💻 Bước 4: Chạy Frontend

```bash
cd frontend

# Cài đặt dependencies
npm install
# hoặc
pnpm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:3000`

---

## 📚 API Documentation

Sau khi chạy backend, truy cập Swagger UI để xem tài liệu API đầy đủ:

🔗 **Swagger UI**: http://localhost:8080/swagger-ui.html

### Các Endpoint Chính

| Endpoint | Method | Mô Tả |
|----------|--------|-------|
| `/api/auth/login` | POST | Đăng nhập |
| `/api/auth/register` | POST | Đăng ký |
| `/api/auth/register-jobseeker` | POST | Đăng ký ứng viên |
| `/api/auth/register-company` | POST | Đăng ký nhà tuyển dụng |
| `/api/auth/refresh` | POST | Làm mới token |
| `/api/auth/me` | GET | Lấy thông tin user hiện tại |

---

## 🐳 Docker Deployment

### Chạy toàn bộ stack với Docker Compose

```bash
# Build và chạy tất cả services
docker-compose up -d

# Hoặc build lại
docker-compose up -d --build

# Xem logs
docker-compose logs -f

# Dừng tất cả services
docker-compose down
```

### Services

| Service | Port | Mô Tả |
|---------|------|-------|
| MySQL | 3306 | Database |
| Backend | 8080 | Spring Boot API |
| Frontend | 3000 | Vue.js App (nginx) |

---

## ⚠️ Lưu Ý Quan Trọng

### 🔐 Bảo Mật
- **JWT Secret**: Thay đổi `jwt.secret` trong `application.properties` khi deploy production
- **Email Password**: Sử dụng App Password thay vì mật khẩu Gmail thường
- **CORS**: Cập nhật `cors.allowed.origins` cho phù hợp môi trường

### 🗃️ Database
- Flyway hiện đang **bị tắt** (`spring.flyway.enabled=false`) do MySQL 9.5 không được hỗ trợ
- Để bật Flyway, cần sử dụng MySQL 8.0 hoặc cập nhật Flyway version
- DDL auto đang đặt là `create` - thay đổi thành `validate` hoặc `none` trong production

### 📧 Email Configuration
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password  # Không phải mật khẩu thường
```
Tạo App Password tại: https://myaccount.google.com/apppasswords

### 🔌 Ports
- Backend: 8080
- Frontend: 3000
- MySQL: 3306

---

## 📖 Tài Liệu Tham Khảo

| Tài Liệu | Mô Tả |
|----------|-------|
| [AUTH_API_INTEGRATION.md](docs/AUTH_API_INTEGRATION.md) | Hướng dẫn tích hợp API xác thực |
| [AUTH_API_TEST.md](docs/AUTH_API_TEST.md) | Test cases cho API auth |
| [SWAGGER_TEST_EXAMPLES.md](docs/SWAGGER_TEST_EXAMPLES.md) | Ví dụ test với Swagger |
| [database-schema.sql](docs/database-schema.sql) | Schema database |

---

## 🎓 Nội Dung Đào Tạo

Dự án này được phát triển trong khuôn khổ chương trình đào tạo:

### 1. Java Core
- Object, Class, Method, Variable
- OOP: Inheritance, Polymorphism, Abstraction
- Collection Framework
- Exception Handling
- File I/O

### 2. Spring Boot
- Maven Web Application
- CRUD Application
- RESTful Web Services
- Microservices Architecture

### 3. Vue.js
- Vue 3 Composition API
- Component Architecture
- Vue Router & State Management
- Lifecycle Hooks

### 4. Docker
- Docker Compose
- Containerization

---

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
7. **Token Refresh** → Automatic refresh token mechanism (if implemented)

---

## 📊 Supported User Roles

1. **ADMIN** - Platform administrator with full access
2. **EMPLOYER** - Company representative who posts and manages jobs
3. **JOB_SEEKER** - Candidate who searches and applies for jobs
4. **USER** - Base role for all registered users

---

## 🚀 Getting Started

### Prerequisites

- Java 21 (Backend)
- Node.js 18+ and npm/pnpm (Frontend)
- MySQL 8.0+
- Git

### Setup Instructions

#### 1. Backend Setup

```bash
cd Backend/
mvn clean install
# Update application.properties with your database credentials
mvn spring-boot:run
```

#### 2. Frontend Setup

```bash
cd Frontend/
npm install  # or pnpm install
npm run dev
```

#### 3. Database Setup

```bash
# Flyway will automatically run migrations on backend startup
# Manual migration (if needed):
cd Backend/
mvn flyway:migrate
```

---

## 📝 Key Files Reference

| File                                                | Purpose                                    |
| --------------------------------------------------- | ------------------------------------------ |
| `Backend/pom.xml`                                   | Maven dependencies and build configuration |
| `Backend/src/main/resources/application.properties` | Database, JWT, Mail config                 |
| `Backend/src/main/resources/db/migration/V*.sql`    | Database schema versions                   |
| `Frontend/package.json`                             | NPM dependencies and scripts               |
| `Frontend/vite.config.ts`                           | Build tool configuration                   |
| `Frontend/src/router/index.ts`                      | Application routing setup                  |
| `Frontend/src/stores/`                              | Global state management                    |

---

## 🔄 Development Workflow

### Backend Development

1. Create new feature in module (e.g., `module/job/`)
2. Define Entity → Repository → Service → Controller
3. Add database migration scripts in `db/migration/`
4. Test with unit/integration tests
5. Generate API docs via Swagger

### Frontend Development

1. Create new module or page in appropriate feature folder
2. Define types and API calls
3. Create components and pages
4. Use composition API composables and Pinia stores
5. Add routes and guards
6. Test with local development server

---

## 🛠️ Common Commands

### Backend

```bash
mvn clean install              # Build project
mvn spring-boot:run            # Run application
mvn test                       # Run tests
mvn flyway:migrate             # Run database migrations
mvn flyway:repair              # Repair Flyway state
```

### Frontend

```bash
npm run dev                    # Development server
npm run build                  # Production build
npm run preview                # Preview production build
npm run lint                   # Linting
```

---

## 📚 Architecture Principles

### Backend

- **Modular Design** - Independent feature modules
- **Layered Architecture** - Controller → Service → Repository → Entity
- **DRY Principle** - Shared base classes and utilities
- **Security First** - JWT authentication and role-based authorization
- **Database Versioning** - Flyway for controlled migrations

### Frontend

- **Component-Based** - Reusable Vue components
- **Feature Modules** - Organized by business features
- **State Management** - Centralized with Pinia
- **Type Safety** - Full TypeScript support
- **API Abstraction** - Centralized API layer with error handling

---

## 🤝 Contributing

When adding new features:

1. Follow existing module structure
2. Add appropriate documentation
3. Update this README for significant changes
4. Test thoroughly before committing
5. Maintain code consistency with existing patterns

---

## 📞 Support

For issues or questions regarding the architecture:

- Check existing code examples in modules
- Review commit history for pattern changes
- Refer to framework documentation (Spring Boot, Vue 3)

---

**Last Updated:** February 2026  
**Version:** 1.0.0
