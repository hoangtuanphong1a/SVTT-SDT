# Auth API Testing Guide

## Base URL
```
http://localhost:8081/api/auth
```

---

## 1. Register (General)
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "12345678",
    "email": "test@example.com",
    "fullName": "Test User"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": 1,
    "uuid": "xxx-xxx-xxx",
    "token": "eyJ...",
    "username": "testuser",
    "email": "test@example.com",
    "fullName": "Test User",
    "role": "JOB_SEEKER",
    "isVerified": false
  }
}
```

---

## 2. Register Job Seeker
```bash
curl -X POST http://localhost:8081/api/auth/register-jobseeker \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jobseeker1",
    "password": "12345678",
    "email": "jobseeker@example.com",
    "fullName": "John Job Seeker"
  }'
```

---

## 3. Register Company/Employer
```bash
curl -X POST http://localhost:8081/api/auth/register-company \
  -H "Content-Type: application/json" \
  -d '{
    "username": "employer1",
    "password": "12345678",
    "email": "company@example.com",
    "fullName": "HR Manager"
  }'
```

---

## 4. Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "12345678"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJ...",
    "username": "testuser",
    "email": "test@example.com",
    "role": "JOB_SEEKER"
  }
}
```

---

## 5. Get Current User (Requires Auth)
```bash
curl -X GET http://localhost:8081/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 6. Change Password (Requires Auth)
```bash
curl -X POST http://localhost:8081/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "username": "testuser",
    "currentPassword": "12345678",
    "newPassword": "newpassword123"
  }'
```

---

## 7. Request Password Reset
```bash
curl -X POST http://localhost:8081/api/auth/request-reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

**Note:** This sends an OTP to the user's email (if email is configured).

---

## 8. Reset Password with OTP
```bash
curl -X POST http://localhost:8081/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "otp": "123456",
    "newPassword": "newpassword123"
  }'
```

---

## 9. Verify Email with OTP
```bash
curl -X POST http://localhost:8081/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "otp": "123456"
  }'
```

---

## 10. Refresh Token
```bash
curl -X POST http://localhost:8081/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_EXPIRED_JWT_TOKEN"
  }'
```

---

## 11. Logout
```bash
curl -X POST http://localhost:8081/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## ⚠️ Important Notes

### Email Configuration
If email is not configured, the registration will still work but:
- Verification email won't be sent
- Password reset OTP won't be sent

To enable emails, configure in `application.properties`:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### JWT Token
- Store the token from login/register
- Use it in `Authorization: Bearer TOKEN` header for protected routes
- Token expires based on `jwt.expiration` in `application.properties`

### Testing without Email
1. Register a user - it will succeed (email exception is caught)
2. Login with the credentials
3. The user will have `isVerified: false`
4. Email verification step can be skipped for testing