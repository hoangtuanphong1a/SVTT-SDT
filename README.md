# Job Portal Platform

A full-stack job portal application with Spring Boot backend and Vue.js frontend, featuring job searching, applications, and user management.

---

## 📋 Project Overview

This is a comprehensive job portal system that connects job seekers, employers, and administrators. The platform handles user authentication, job postings, applications, and profile management with a clean separation between backend and frontend.

**Tech Stack:**

- **Backend:** Spring Boot 4.0.1, Java 21, Spring Security, Spring Data JPA
- **Frontend:** Vue 3, TypeScript, Vite, TailwindCSS
- **Database:** MySQL with Flyway migrations
- **Authentication:** JWT (JSON Web Token)
- **API Documentation:** Swagger/OpenAPI

---

## 🏗️ Backend Architecture

### Location: `/Backend`

The backend follows a **modular layered architecture** with clear separation of concerns.

### 📁 Directory Structure

```
Backend/
├── pom.xml                              # Maven configuration with dependencies
├── mvnw / mvnw.cmd                      # Maven wrapper scripts
├── flyway.conf                          # Flyway database migration config
├── src/
│   ├── main/
│   │   ├── java/org/example/backend/
│   │   │   ├── BackendApplication.java  # Spring Boot entry point
│   │   │   ├── common/                  # Shared utilities and base classes
│   │   │   │   ├── base/                # Base entity, repository, service classes
│   │   │   │   ├── config/              # Common configurations
│   │   │   │   ├── enums/               # Global enums (UserRole, Status, etc.)
│   │   │   │   ├── exception/           # Custom exception classes
│   │   │   │   ├── filter/              # Request/Response filters
│   │   │   │   ├── response/            # API response wrapper classes
│   │   │   │   ├── security/            # Security utilities, JWT handlers
│   │   │   │   └── utils/               # General utility functions
│   │   │   ├── config/                  # Spring configurations
│   │   │   │   └── FlywayConfig.java     # Database migration configuration
│   │   │   ├── infrastructure/          # External services and integrations
│   │   │   │   ├── mail/                # Email service for notifications
│   │   │   │   ├── scheduler/           # Scheduled tasks (cron jobs)
│   │   │   │   └── storage/             # File storage operations
│   │   │   └── module/                  # Feature modules
│   │   │       ├── auth/                # Authentication module
│   │   │       │   ├── controller/      # Auth endpoints (login, register)
│   │   │       │   ├── service/         # Auth business logic
│   │   │       │   ├── dto/             # Data transfer objects
│   │   │       │   ├── entity/          # JPA entities (User, Role, Permission)
│   │   │       │   └── repository/      # Database access layer
│   │   │       ├── user/                # User management module
│   │   │       │   ├── controller/      # User endpoints
│   │   │       │   ├── service/         # User operations (CRUD)
│   │   │       │   ├── dto/             # User DTOs
│   │   │       │   ├── entity/          # User entity and related entities
│   │   │       │   └── repository/      # User data access
│   │   │       ├── company/             # Company/Employer module
│   │   │       │   ├── controller/      # Company endpoints
│   │   │       │   ├── service/         # Company business logic
│   │   │       │   ├── dto/             # Company DTOs
│   │   │       │   ├── entity/          # Company entities
│   │   │       │   └── repository/      # Company data access
│   │   │       └── jobseeker/           # Job Seeker module
│   │   │           ├── controller/      # Job seeker endpoints
│   │   │           ├── service/         # Job seeker business logic
│   │   │           ├── dto/             # Job seeker DTOs
│   │   │           ├── entity/          # Job seeker profile entities
│   │   │           └── repository/      # Job seeker data access
│   │   └── resources/
│   │       ├── application.properties    # Application configuration (DB, JWT, Mail)
│   │       └── db/migration/             # Flyway SQL migration files
│   │           ├── V1__user_role_permission.sql      # Initial schema
│   │           ├── V2__seed_roles_permissions.sql    # Role and permission data
│   │           ├── V3__otp_password_refresh.sql      # OTP and refresh token table
│   │           ├── V4__jobseekerprofile_company.sql  # Job seeker and company profiles
│   │           ├── V5__alter_companies.sql           # Company table modifications
│   │           ├── V6__fix_uuid_columns.sql          # UUID column fixes
│   │           ├── V7__fix_token_id_columns.sql      # Token ID corrections
│   │           └── V8__fix_database_charset.sql      # Database charset updates
│   └── test/
│       └── java/org/example/backend/    # Unit and integration tests
└── target/                               # Build output (compiled classes, artifacts)
```

### 🔧 Key Backend Components

#### **Common Module** (`common/`)

- **base/** - Base classes for Entity, Repository, and Service patterns
- **config/** - Configuration classes for various features
- **enums/** - User roles (ADMIN, EMPLOYER, JOB_SEEKER), Status types
- **exception/** - Custom exceptions for API error handling
- **filter/** - HTTP filters for authentication and logging
- **response/** - Standardized API response wrapper
- **security/** - JWT token generation/validation, SecurityUser
- **utils/** - Utility methods for validation, transformation, etc.

#### **Configuration** (`config/`)

- **FlywayConfig.java** - Database migration settings and versioning

#### **Infrastructure** (`infrastructure/`)

- **mail/** - Email service for notifications (OTP, confirmation)
- **scheduler/** - Background job scheduling (cleanup, reminders)
- **storage/** - File upload/download operations

#### **Feature Modules** (`module/`)

1. **auth/** - Authentication & Authorization
   - User login/registration
   - JWT token management
   - OTP verification
   - Role-based access control

2. **user/** - User Management
   - User profile updates
   - Role assignments
   - Permission management

3. **company/** - Company/Employer Management
   - Company profile creation and updates
   - Company information (size, industry, location)

4. **jobseeker/** - Job Seeker Profile
   - Seeker profile creation and management
   - Skills, experience, education tracking

### 💾 Database Schema (Flyway Migrations)

- **V1:** Core tables (users, roles, permissions)
- **V2:** Seed data for roles and permissions
- **V3:** OTP and refresh token tables
- **V4:** Job seeker profile and company tables
- **V5-V8:** Schema refinements and bug fixes

### 🛠️ Key Dependencies

- **Spring Boot Starters:** Data JPA, Security, Web, Validation, Mail
- **Database:** MySQL Connector, Flyway (DB versioning)
- **Security:** JWT (jjwt) for token-based authentication
- **Mapping:** MapStruct for DTO transformations
- **API Docs:** SpringDoc OpenAPI for Swagger/API documentation
- **Utilities:** Lombok for reducing boilerplate code

### 📡 Running the Backend

```bash
cd Backend/
mvn clean install  # Build and install dependencies
mvn spring-boot:run  # Start the Spring Boot server (port 8080)
```

**API Documentation:** http://localhost:8080/swagger-ui.html

---

## 🎨 Frontend Architecture

### Location: `/Frontend`

The frontend is a **component-based Vue 3 application** with modular feature organization and state management.

### 📁 Directory Structure

```
Frontend/
├── package.json                    # NPM dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite bundler configuration
├── tailwind.config.ts              # TailwindCSS styling config
├── index.html                      # HTML entry point
├── src/
│   ├── main.ts                     # Application initialization
│   ├── App.vue                     # Root Vue component
│   ├── assets/                     # Static assets (images, fonts)
│   ├── layouts/                    # Page layout components
│   │   ├── DefaultLayout.vue       # Base layout for public pages
│   │   ├── AdminLayout.vue         # Layout for admin dashboard
│   │   ├── EmployerLayout.vue      # Layout for employer portal
│   │   └── CandidateLayout.vue     # Layout for job seeker portal
│   ├── modules/                    # Feature modules
│   │   ├── auth/                   # Authentication feature
│   │   │   ├── api.ts              # Auth API calls (login, register)
│   │   │   ├── store.ts            # Pinia auth state management
│   │   │   ├── types.ts            # TypeScript interfaces
│   │   │   ├── schema.ts           # Zod validation schemas
│   │   │   ├── index.ts            # Module exports
│   │   │   └── pages/              # Auth pages (Login, Register, ForgotPassword)
│   │   ├── job/                    # Job listings and details
│   │   │   ├── api.ts              # Job API endpoints
│   │   │   ├── types.ts            # Job data types
│   │   │   ├── schema.ts           # Job validation schemas
│   │   │   ├── queries.ts          # TanStack Query definitions
│   │   │   ├── index.ts            # Module exports
│   │   │   ├── components/         # Job-related components
│   │   │   └── pages/              # Job listing, detail, create pages
│   │   ├── candidate/              # Job seeker features
│   │   │   ├── api.ts              # Candidate API calls
│   │   │   ├── types.ts            # Candidate types
│   │   │   ├── pages/              # Dashboard, profile, applications pages
│   │   │   └── ...
│   │   ├── employer/               # Employer/company features
│   │   │   ├── api.ts              # Employer API calls
│   │   │   ├── types.ts            # Employer types
│   │   │   ├── pages/              # Company dashboard, job management
│   │   │   └── ...
│   │   └── admin/                  # Admin management features
│   │       ├── api.ts              # Admin API endpoints
│   │       ├── pages/              # User management, reports, settings
│   │       └── ...
│   ├── pages/                      # Global pages
│   │   ├── Home.vue                # Landing page
│   │   ├── NotFound.vue            # 404 page
│   │   └── Forbidden.vue           # 403 access denied page
│   ├── router/                     # Vue Router configuration
│   │   ├── index.ts                # Router setup
│   │   ├── routes.ts               # Global routes
│   │   ├── auth.routes.ts          # Auth routes
│   │   ├── candidate.routes.ts     # Candidate/job seeker routes
│   │   ├── employer.routes.ts      # Employer/company routes
│   │   ├── admin.routes.ts         # Admin routes
│   │   └── guards.ts               # Route guards (auth, role-based)
│   ├── shared/                     # Shared utilities and components
│   │   ├── api/                    # API utilities and types
│   │   │   ├── http.ts             # Axios instance and interceptors
│   │   │   ├── types.ts            # API response types
│   │   │   ├── error.types.ts      # Error handling types
│   │   │   ├── pagination.ts       # Pagination utilities
│   │   │   ├── normalizeError.ts   # Error normalization
│   │   │   └── unwrap.ts           # Response unwrapping
│   │   ├── components/             # Reusable UI components
│   │   │   ├── HelloWorld.vue      # Example component
│   │   │   └── ui/                 # UI component library (buttons, cards, etc.)
│   │   ├── composables/            # Vue composition API utilities
│   │   │   └── useAuth.ts          # Auth composable hook
│   │   ├── lib/                    # Utility libraries
│   │   │   └── utils.ts            # Helper functions
│   │   ├── schemas/                # Shared validation schemas
│   │   │   └── pagination.schema.ts # Pagination validation
│   │   ├── toast/                  # Toast/notification system
│   │   │   ├── toast.ts            # Toast notification service
│   │   │   └── handleApiError.ts   # API error handling with toasts
│   │   └── utils/                  # Utility functions
│   │       └── formatSalary.ts     # Formatting utility for numbers
│   ├── stores/                     # Global state management (Pinia)
│   │   └── ui.store.ts             # UI state (theme, sidebar, etc.)
│   └── styles/
│       └── style.css               # Global styles
├── public/                         # Public static files
└── components.json                 # UI library configuration
```

### 🎯 Key Frontend Components

#### **Layouts**

- **DefaultLayout** - Public/guest pages (home, landing)
- **AdminLayout** - Admin dashboard and management pages
- **EmployerLayout** - Company portal for posting jobs
- **CandidateLayout** - Job seeker portal for searching and applying

#### **Modules** (Feature-based)

1. **auth/** - Authentication & Authorization
   - Login/Register pages
   - Password reset
   - JWT token persistence
   - Role-based redirects

2. **job/** - Job Listings & Management
   - Job search and filtering
   - Job detail view
   - Job creation (employer)
   - Job application functionality

3. **candidate/** - Job Seeker Dashboard
   - Profile management
   - Application history
   - Saved jobs
   - Notification center

4. **employer/** - Employer/Company Portal
   - Company dashboard
   - Job posting and management
   - Application management
   - Analytics and reports

5. **admin/** - Admin Management
   - User management
   - Company verification
   - System reports
   - Platform settings

#### **Shared Services**

- **API Layer** (`shared/api/`)
  - Axios instance with interceptors for auth tokens
  - Error handling and normalization
  - Pagination utilities
  - Response unwrapping

- **State Management** (`stores/`)
  - Pinia for global state (UI, auth state)
  - Module-level stores for features

- **Router Guards** (`router/guards.ts`)
  - Authentication verification
  - Role-based access control
  - Redirect logic

- **Components** (`shared/components/`)
  - Reusable UI components using Tailwind + Reka UI
  - UI library for consistent design

### 🎨 Styling & UI

- **TailwindCSS** - Utility-first CSS framework
- **Reka UI** - Headless component library
- **Sonner** - Toast notifications
- **Lucide Vue Next** - Icon library

### 📦 Key Dependencies

- **Framework:** Vue 3, Vue Router for navigation
- **State:** Pinia for state management
- **Data Fetching:** TanStack Vue Query (React Query for Vue)
- **HTTP:** Axios with custom interceptors
- **Form Validation:** Vee-validate + Zod for schema validation
- **Styling:** TailwindCSS, Class Variance Authority, Tailwind Merge
- **Build:** Vite for fast development and bundling

### 🚀 Running the Frontend

```bash
cd Frontend/
npm install  # or pnpm install
npm run dev  # Start development server (port 5173)
npm run build  # Build for production
```

---

## 🔄 Integration Flow

```
┌─────────────────────────────────────────────┐
│         Frontend (Vue 3 + TypeScript)        │
│  ┌─────────────────────────────────────────┐ │
│  │         User Interface Layers            │ │
│  │  - Candidate Portal (Job Search/Apply)  │ │
│  │  - Employer Portal (Post Jobs)           │ │
│  │  - Admin Dashboard (System Management)   │ │
│  └─────────────────────────────────────────┘ │
│                      ↓                        │
│  ┌─────────────────────────────────────────┐ │
│  │    Shared Services Layer                 │ │
│  │  - API/HTTP (Axios)                      │ │
│  │  - State Management (Pinia)              │ │
│  │  - Form Validation (Zod)                 │ │
│  │  - Data Fetching (TanStack Query)        │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
                      ↓ (REST API)
               http://localhost:8080
                      ↓
┌─────────────────────────────────────────────┐
│      Backend (Spring Boot + Java 21)         │
│  ┌─────────────────────────────────────────┐ │
│  │    Feature Modules                       │ │
│  │  - Auth (Login, JWT, OTP)                │ │
│  │  - User Management (CRUD)                │ │
│  │  - Job Management                        │ │
│  │  - Company Management                    │ │
│  │  - Job Seeker Profile                    │ │
│  └─────────────────────────────────────────┘ │
│                      ↓                        │
│  ┌─────────────────────────────────────────┐ │
│  │    Infrastructure Layer                  │ │
│  │  - Database (JPA/Hibernate)              │ │
│  │  - Mail Service (SMTP)                   │ │
│  │  - Task Scheduling (Cron)                │ │
│  │  - File Storage                          │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
                      ↓
             MySQL Database
          (Flyway Migrations)
```

---

## 🔐 Authentication Flow

1. **User Registration** → Backend validates and creates user account
2. **User Login** → Backend authenticates and returns JWT token
3. **Token Storage** → Frontend stores JWT in localStorage/sessionStorage
4. **API Requests** → Frontend includes JWT in Authorization header
5. **Token Validation** → Backend verifies JWT signature and expiration
6. **Role-based Access** → Router guards check user roles before loading pages
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
