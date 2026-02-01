# Tổng quan về Spring Boot

## Mục tiêu học tập

- Hiểu Spring Framework và Spring Boot
- Nắm vững các annotations cơ bản
- Hiểu kiến trúc và auto-configuration
- Tạo ứng dụng Spring Boot đầu tiên

## 1. Spring Framework là gì?

Spring Framework là một framework mã nguồn mở cho Java, cung cấp:

- **Dependency Injection (DI)**: Quản lý dependencies
- **Aspect-Oriented Programming (AOP)**: Tách biệt cross-cutting concerns
- **Data Access**: Làm việc với database dễ dàng
- **Transaction Management**: Quản lý transactions
- **MVC Framework**: Xây dựng web applications

## 2. Spring Boot là gì?

Spring Boot là extension của Spring Framework, giúp:

- Đơn giản hóa configuration
- Embedded server (Tomcat, Jetty)
- Auto-configuration
- Production-ready features
- Starter dependencies

### Ưu điểm:

✓ Giảm boilerplate code
✓ Embedded server (không cần deploy WAR)
✓ Production-ready metrics
✓ Dễ dàng tích hợp thư viện
✓ Microservices friendly

## 3. Spring Boot vs Spring Framework

| Aspect                | Spring Framework                | Spring Boot        |
| --------------------- | ------------------------------- | ------------------ |
| Configuration         | XML hoặc Java config (phức tạp) | Auto-configuration |
| Server                | External (Tomcat, etc.)         | Embedded           |
| Dependency Management | Manual                          | Starter POMs       |
| Setup Time            | Lâu                             | Nhanh              |
| Learning Curve        | Cao                             | Thấp hơn           |

## 4. Kiến trúc Spring Boot

```
┌─────────────────────────────────────┐
│      Spring Boot Application        │
├─────────────────────────────────────┤
│    Controllers (REST/MVC)           │
├─────────────────────────────────────┤
│    Service Layer                    │
├─────────────────────────────────────┤
│    Repository/DAO Layer             │
├─────────────────────────────────────┤
│    Database                         │
└─────────────────────────────────────┘
```

### Layers:

1. **Controller Layer**: Nhận requests, trả về responses
2. **Service Layer**: Business logic
3. **Repository Layer**: Database operations
4. **Model/Entity Layer**: Data structures

## 5. Auto-Configuration

Spring Boot tự động cấu hình dựa trên:

- Dependencies trong classpath
- Properties trong application.properties
- Annotations

```java
@SpringBootApplication // Bao gồm 3 annotations:
// @Configuration: Đánh dấu class là source của beans
// @EnableAutoConfiguration: Bật auto-configuration
// @ComponentScan: Scan components trong package
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## 6. Starter Dependencies

Starters là tập dependencies được định nghĩa sẵn.

### Common Starters:

```xml
<!-- pom.xml -->
<!-- Web applications -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- JPA/Hibernate -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- Testing -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

## 7. Spring Boot Annotations Cơ Bản

### @SpringBootApplication

```java
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### @RestController

```java
@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

### @Service

```java
@Service
public class UserService {

    public List<User> getAllUsers() {
        // Business logic
        return users;
    }
}
```

### @Repository

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Database operations
}
```

### @Component

```java
@Component
public class EmailService {
    // Utility component
}
```

### @Autowired (Dependency Injection)

```java
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // Hoặc dùng constructor injection (recommended)
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
```

### @Value

```java
@Component
public class AppConfig {

    @Value("${app.name}")
    private String appName;

    @Value("${app.version:1.0}")
    private String version; // Default value: 1.0
}
```

### @Configuration

```java
@Configuration
public class AppConfiguration {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

## 8. Application Properties

```properties
# application.properties

# Server Configuration
server.port=8080
server.servlet.context-path=/myapp

# Application Name
spring.application.name=MySpringBootApp

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.root=INFO
logging.level.com.myapp=DEBUG
logging.file.name=app.log

# Custom Properties
app.name=My Application
app.version=1.0.0
```

## 9. Ứng dụng Spring Boot đầu tiên

### Bước 1: Tạo project với Spring Initializr

- Truy cập: https://start.spring.io/
- Chọn: Maven, Java, Spring Boot version
- Dependencies: Spring Web
- Generate và download

### Bước 2: Import vào IDE

- Eclipse: File → Import → Maven Project
- IntelliJ: Open → Chọn pom.xml

### Bước 3: Tạo Controller

```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Spring Boot!";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}
```

### Bước 4: Run Application

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### Bước 5: Test

- Chạy application
- Mở browser: http://localhost:8080
- Hoặc: http://localhost:8080/hello

## 10. Project Structure

```
my-spring-boot-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── demo/
│   │   │               ├── DemoApplication.java
│   │   │               ├── controller/
│   │   │               ├── service/
│   │   │               ├── repository/
│   │   │               └── model/
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/
├── pom.xml
└── README.md
```

## Bài tập

### Bài 1: Hello Spring Boot

Tạo ứng dụng Spring Boot với các endpoints:

- GET /: "Welcome"
- GET /about: Thông tin app
- GET /time: Thời gian hiện tại

### Bài 2: Calculator Service

```java
@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {
    @GetMapping("/add")
    public int add(@RequestParam int a, @RequestParam int b) {
        return a + b;
    }
    // Thêm: subtract, multiply, divide
}
```

### Bài 3: Configuration Practice

Tạo custom properties và sử dụng @Value:

```properties
app.name=My App
app.author=Your Name
app.version=1.0.0
```

### Bài 4: Dependency Injection

Tạo Service và inject vào Controller:

```java
@Service
public class GreetingService {
    public String greet(String name) {
        return "Hello, " + name;
    }
}
```

## Câu hỏi ôn tập

1. Spring Boot khác Spring Framework như thế nào?
2. @SpringBootApplication bao gồm những annotations nào?
3. Auto-configuration hoạt động như thế nào?
4. Starter dependencies là gì?
5. Sự khác biệt giữa @Component, @Service, @Repository?
6. Constructor injection vs Field injection?
7. application.properties dùng để làm gì?
