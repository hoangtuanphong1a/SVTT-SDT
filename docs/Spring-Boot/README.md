# Nội dung Đào Tạo Spring Boot

## Mục tiêu

Giai đoạn Spring Boot giúp sinh viên làm quen với framework backend hiện đại, phát triển ứng dụng web và microservices.

## Nội dung chi tiết

### 1. [Tổng quan về Spring Boot](./01-Spring-Boot-Overview/README.md)

- Spring Framework là gì?
- Spring Boot là gì?
- Ưu điểm của Spring Boot
- Spring Boot vs Spring Framework
- Kiến trúc Spring Boot
- Auto-configuration
- Starter dependencies
- Spring Boot annotations cơ bản

### 2. [Maven Web Application](./02-Maven-Web-App/README.md)

- Maven là gì?
- Cấu trúc Maven project
- pom.xml file
- Maven dependencies
- Maven lifecycle
- Tạo Spring Boot project với Maven
- Spring Initializr
- Project structure
- application.properties/application.yml

### 3. [Xây dựng ứng dụng CRUD](./03-CRUD-Application/README.md)

- RESTful API concepts
- Spring MVC architecture
- Controllers (@RestController, @Controller)
- Request mapping (@GetMapping, @PostMapping, etc.)
- Request parameters và Path variables
- Spring Data JPA
- Entity classes (@Entity, @Table, @Column)
- Repository pattern
- Service layer
- DTO (Data Transfer Object)
- CRUD operations (Create, Read, Update, Delete)
- Database configuration (H2, MySQL, PostgreSQL)
- Testing với Postman

### 4. [Web Services - SOAP và RESTful](./04-Web-Services/README.md)

#### SOAP (Simple Object Access Protocol)

- SOAP là gì?
- WSDL (Web Services Description Language)
- Tạo SOAP Web Service với Spring Boot
- SOAP Client

#### RESTful Web Services

- REST principles
- HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Status codes
- Richardson Maturity Model
- Best practices cho RESTful API
- JSON và XML
- Content negotiation
- HATEOAS

### 5. [Chuyển đổi sang Microservices](./05-Microservices/README.md)

- Microservices architecture
- Monolithic vs Microservices
- Service decomposition
- Giao tiếp giữa các services
- RESTful API communication
- RestTemplate
- WebClient (reactive)
- Feign Client
- Service Discovery (Eureka)
- API Gateway (Spring Cloud Gateway)
- Configuration Management (Spring Cloud Config)
- Load Balancing
- Circuit Breaker (Resilience4j)

### 6. [Dự án hoàn chỉnh](./06-Complete-Project/README.md)

- Phân tích yêu cầu
- Thiết kế database (ít nhất 3 bảng có quan hệ)
- Entity Relationships:
  - One-to-One
  - One-to-Many
  - Many-to-Many
- Advanced JPA features:
  - Cascade operations
  - Fetch types (LAZY, EAGER)
  - Query methods
  - JPQL và Native queries
  - Pagination và Sorting
- Exception handling (@ControllerAdvice)
- Validation (@Valid, @NotNull, etc.)
- Security basics (Spring Security)
- Authentication và Authorization
- JWT (JSON Web Token)
- Logging (SLF4J, Logback)
- Testing:
  - Unit testing (JUnit, Mockito)
  - Integration testing
  - MockMvc
- Documentation (Swagger/OpenAPI)
- Deployment preparation

## Bài tập thực hành

Mỗi module có bài tập thực hành kèm theo

## Dự án cuối khóa

Xây dựng một hệ thống hoàn chỉnh với:

- Ít nhất 3 entities có quan hệ
- RESTful API đầy đủ
- Authentication và Authorization
- Exception handling
- Validation
- Documentation
- Unit tests

Ví dụ đề xuất:

- E-commerce System (Product, Order, Customer)
- Blog Platform (User, Post, Comment)
- Task Management (User, Project, Task)
- Library System (Book, Member, Borrow)
