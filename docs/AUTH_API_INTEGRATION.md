# Backend - Frontend API Integration Guide

## Base URL
```
http://localhost:8081/api/auth
```

## API Response Format

All responses follow this structure:
```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

---

## 1. Đăng nhập (Login)

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "username": "testuser",
  "password": "12345678"
}
```

**Frontend Usage:**
```typescript
import api from '@/services/api'

const login = async () => {
  const response = await api.post('/auth/login', {
    username: 'testuser',
    password: '12345678'
  })
  
  const { success, data } = response
  if (success && data) {
    const { token, user } = data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    
    // Redirect based on role
    if (user.role === 'JOB_SEEKER') {
      router.push('/jobseeker/dashboard')
    } else if (user.role === 'EMPLOYER') {
      router.push('/employer/dashboard')
    } else if (user.role === 'ADMIN') {
      router.push('/admin/dashboard')
    }
  }
}
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
    "fullName": "Test User",
    "role": "JOB_SEEKER",
    "isVerified": false
  }
}
```

---

## 2. Đăng ký (Register)

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "12345678",
  "fullName": "Test User"
}
```

**Frontend Usage:**
```typescript
const register = async () => {
  const response = await api.post('/auth/register', {
    username: 'testuser',
    email: 'test@example.com',
    password: '12345678',
    fullName: 'Test User'
  })
  
  const { success, data, message } = response
}
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

### Register as Job Seeker
**Endpoint:** `POST /auth/register-jobseeker`

### Register as Employer
**Endpoint:** `POST /auth/register-company`

---

## 3. Lấy thông tin User hiện tại

**Endpoint:** `GET /auth/me`

**Requires:** `Authorization: Bearer <token>`

**Frontend Usage:**
```typescript
const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  const { data } = response
  return data
}
```

---

## 4. Đổi mật khẩu (Change Password)

**Endpoint:** `POST /auth/change-password`

**Requires:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "username": "testuser",
  "currentPassword": "12345678",
  "newPassword": "newpassword123"
}
```

**Frontend Usage:**
```typescript
const changePassword = async () => {
  const response = await api.post('/auth/change-password', {
    username: user.username,
    currentPassword: '12345678',
    newPassword: 'newpassword123'
  })
  
  const { success, message } = response
}
```

---

## 5. Quên mật khẩu (Forgot Password)

**Endpoint:** `POST /auth/request-reset-password`

**Request Body:**
```json
{
  "email": "test@example.com"
}
```

**Frontend Usage:**
```typescript
const requestResetPassword = async (email) => {
  const response = await api.post('/auth/request-reset-password', { email })
  const { success, message } = response
  
  if (success) {
    // Redirect to reset password page
    router.push({ path: '/reset-password', query: { email } })
  }
}
```

---

## 6. Đặt lại mật khẩu (Reset Password)

**Endpoint:** `POST /auth/reset-password`

**Request Body:**
```json
{
  "email": "test@example.com",
  "otp": "123456Password": "newpassword123"
}
",
  "new```

**Frontend Usage:**
```typescript
const resetPassword = async (email, otp, newPassword) => {
  const response = await api.post('/auth/reset-password', {
    email,
    otp,
    newPassword
  })
  
  const { success, message } = response
  
  if (success) {
    router.push('/login')
  }
}
```

---

## 7. Xác thực Email (Verify OTP)

**Endpoint:** `POST /auth/verify-otp`

**Request Body:**
```json
{
  "email": "test@example.com",
  "otp": "123456"
}
```

---

## 8. Refresh Token

**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "token": "YOUR_EXPIRED_JWT_TOKEN"
}
```

---

## 9. Đăng xuất (Logout)

**Endpoint:** `POST /auth/logout`

**Frontend Usage:**
```typescript
const logout = async () => {
  await api.post('/auth/logout')
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
```

---

## User Roles

| Role | Description | Dashboard |
|------|-------------|-----------|
| `ADMIN` | Administrator | /admin/dashboard |
| `EMPLOYER` | Employer/Company | /employer/dashboard |
| `JOB_SEEKER` | Job Seeker | /jobseeker/dashboard |

---

## Frontend Routes

| Route | Name | Description |
|-------|------|-------------|
| `/login` | Login | User login page |
| `/register` | Register | User registration page |
| `/forgot-password` | ForgotPassword | Request password reset |
| `/reset-password` | ResetPassword | Reset password with OTP |
| `/change-password` | ChangePassword | Change password (requires auth) |

---

## Protected Routes

Routes requiring authentication and specific roles:

| Route | Required Role |
|-------|---------------|
| `/admin/*` | ADMIN |
| `/employer/*` | EMPLOYER |
| `/jobseeker/*` | JOB_SEEKER |

---

## Testing without Email Configuration

If email is not configured:
1. Registration will still succeed
2. Verification email won't be sent
3. Password reset OTP won't be sent
4. User will have `isVerified: false`

To enable emails, configure in `application.properties`:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

---

## JWT Token Usage

1. Store the token from login/register response
2. Include in header: `Authorization: Bearer <token>`
3. Token expires based on `jwt.expiration` in `application.properties`

---

## Error Handling

```typescript
try {
  const response = await api.post('/auth/login', credentials)
  const { success, data, message } = response
  
  if (!success) {
    error.value = message || 'Có lỗi xảy ra'
    return
  }
  
  // Handle success
} catch (err) {
  error.value = err.response?.data?.message || 'Có lỗi xảy ra'
}