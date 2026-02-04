# Job Portal System

A comprehensive job portal system built with modern technologies including Java Spring Boot for backend, Vue.js for frontend, and MySQL for database. The system includes AI-powered features for CV analysis, matching, and chatbot functionality.

## Technology Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Web framework
- **Spring Security** - Authentication and authorization
- **JWT** - Token-based authentication
- **MySQL 8.0** - Database
- **Maven** - Build tool
- **Docker** - Containerization

### Frontend
- **Vue.js 3.3.4** - JavaScript framework
- **Vue Router 4.2.5** - Routing
- **Vuex 4.1.0** - State management
- **Element Plus** - UI components
- **Vite 5.0.8** - Build tool
- **TypeScript** - Type safety

### AI/ML Services
- **TensorFlow 2.15.0** - Machine learning
- **Deeplearning4j 1.0.0-M2.1** - Deep learning
- **ND4J 1.0.0-M2.1** - Numerical computing

## Features

### Core Features
- User authentication (JWT)
- Job posting and management
- CV creation and editing
- Company profiles
- Job search and filtering
- Application tracking
- Blog system
- Notification system
- Messaging system

### AI-Powered Features
- CV analysis and parsing
- CV-Job matching algorithm
- AI chatbot for support
- Resume optimization suggestions

### Admin Features
- User management
- Job management
- Company management
- Analytics dashboard
- Blog management

## Project Structure

```
JV/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/jobportal/
│   │   ├── config/         # Security and JWT configuration
│   │   ├── controller/     # REST controllers
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Data access layer
│   │   ├── service/        # Business logic
│   │   └── util/           # Utility classes
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml             # Maven dependencies
├── frontend/               # Vue.js frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── views/         # Page components
│   │   ├── router/        # Route configuration
│   │   ├── store/         # Vuex store
│   │   ├── services/      # API services
│   │   └── assets/        # Static assets
│   ├── public/            # Public files
│   └── package.json       # Frontend dependencies
├── docker-compose.yml     # Docker configuration
└── README.md              # This file
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Docker (optional)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hoangtuanphong1a/SVTT-SDT.git
   cd JV
   ```

2. **Set up the database:**
   ```bash
   # Create database
   mysql -u root -p -e "CREATE DATABASE jobportal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   
   # Create user
   mysql -u root -p -e "CREATE USER 'jobportal'@'localhost' IDENTIFIED BY 'jobportal123';"
   mysql -u root -p -e "GRANT ALL PRIVILEGES ON jobportal.* TO 'jobportal'@'localhost';"
   ```

3. **Build and run the backend:**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

4. **Install and run the frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

### Using Docker

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - MySQL: localhost:3306

## API Documentation

The backend provides RESTful APIs for all operations. Key endpoints include:

- **Authentication:**
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration
  - `GET /api/auth/profile` - Get user profile

- **Jobs:**
  - `GET /api/jobs` - Get all jobs
  - `GET /api/jobs/{id}` - Get job by ID
  - `POST /api/jobs` - Create job (Employer/Admin)
  - `PUT /api/jobs/{id}` - Update job (Employer/Admin)
  - `DELETE /api/jobs/{id}` - Delete job (Employer/Admin)

- **Companies:**
  - `GET /api/companies` - Get all companies
  - `GET /api/companies/{id}` - Get company by ID

- **CVs:**
  - `GET /api/cvs` - Get all CVs
  - `POST /api/cvs` - Create CV
  - `PUT /api/cvs/{id}` - Update CV

## Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/jobportal
spring.datasource.username=jobportal
spring.datasource.password=jobportal123

# JWT Configuration
jwt.secret=your-secret-key
jwt.expiration=604800000

# Server Configuration
server.port=8080
```

### Frontend Configuration
Edit `frontend/.env`:

```env
VUE_APP_API_URL=http://localhost:8080/api
```

## AI/ML Services

The system includes AI-powered features for:

1. **CV Analysis:** Parses and extracts information from resumes
2. **CV-Job Matching:** Matches candidates with suitable job openings
3. **Chatbot:** Provides automated support and assistance

These services use TensorFlow and Deeplearning4j for machine learning capabilities.

## Security

The application uses JWT-based authentication with role-based access control:

- **ADMIN:** Full system access
- **EMPLOYER:** Job posting and candidate management
- **JOBSEEKER:** Job search and application

## Development

### Backend Development
```bash
cd backend
mvn spring-boot:run
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Testing
```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend
npm run test
```

## Deployment

### Docker Deployment
```bash
docker-compose up --build -d
```

### Manual Deployment
1. Build the backend JAR:
   ```bash
   cd backend
   mvn clean package
   ```
2. Deploy the JAR to your server
3. Build and deploy the frontend:
   ```bash
   cd frontend
   npm run build
   # Deploy to web server
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

## Acknowledgments

- Spring Boot documentation
- Vue.js documentation
- Element Plus documentation
- TensorFlow documentation
- Deeplearning4j documentation