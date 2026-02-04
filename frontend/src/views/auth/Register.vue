<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { store } from "../../store";
import api from "../../services/api";

const router = useRouter();
const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const role = ref("jobseeker");
const isLoading = ref(false);
const error = ref("");
const success = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const register = async () => {
  isLoading.value = true;
  error.value = "";

  // Validation
  if (password.value !== confirmPassword.value) {
    error.value = "Mật khẩu và xác nhận mật khẩu không khớp";
    isLoading.value = false;
    return;
  }

  if (password.value.length < 6) {
    error.value = "Mật khẩu phải có ít nhất 6 ký tự";
    isLoading.value = false;
    return;
  }

  try {
    const response = await api.post("/auth/register", {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      role: role.value,
    });

    success.value = true;
    store.addNotification({
      type: "success",
      message: "Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.",
    });

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (err) {
    console.error("Register error:", err);
    error.value =
      err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <!-- Left Side - Illustration -->
      <div class="illustration-section">
        <div class="illustration-content">
          <div class="illustration-icon">💼</div>
          <h2>Chào mừng đến với</h2>
          <h1>Việc<span class="highlight">Làm</span>Plus</h1>
          <p>Nền tảng tuyển dụng hàng đầu Việt Nam</p>
          <div class="features">
            <div class="feature-item">✓ Hàng ngàn việc làm hấp dẫn</div>
            <div class="feature-item">✓ Kết nối với doanh nghiệp uy tín</div>
            <div class="feature-item">✓ CV chuyên nghiệp miễn phí</div>
          </div>
        </div>
      </div>

      <!-- Right Side - Register Form -->
      <div class="form-section">
        <div class="form-card">
          <div class="brand-logo">
            <span class="logo-icon">💼</span>
            <span class="logo-text"
              >Việc<span class="logo-accent">Làm</span>Plus</span
            >
          </div>

          <div class="form-header">
            <h2>Tạo tài khoản</h2>
            <p>Đăng ký để bắt đầu hành trình nghề nghiệp</p>
          </div>

          <form @submit.prevent="register" class="register-form">
            <div class="form-group">
              <input
                v-model="fullName"
                type="text"
                placeholder="Họ và tên"
                required
              />
            </div>

            <div class="form-group">
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div class="form-group password-group">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Mật khẩu"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? "👁️" : "👁️‍🗨️" }}
              </button>
            </div>

            <div class="form-group password-group">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Xác nhận mật khẩu"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? "👁️" : "👁️‍🗨️" }}
              </button>
            </div>

            <div class="form-group">
              <select v-model="role">
                <option value="jobseeker">👤 Người tìm việc</option>
                <option value="employer">🏢 Nhà tuyển dụng</option>
              </select>
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div v-if="success" class="success-message">
              ✓ Đăng ký thành công! Đang chuyển hướng...
            </div>

            <button type="submit" class="btn-register" :disabled="isLoading">
              {{ isLoading ? "Đang xử lý..." : "Tạo tài khoản" }}
            </button>
          </form>

          <div class="divider">
            <span>hoặc đăng ký với</span>
          </div>

          <div class="social-buttons">
            <button class="social-btn google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
            <button class="social-btn microsoft">
              <svg width="20" height="20" viewBox="0 0 23 23">
                <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
            </button>
            <button class="social-btn github">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </button>
          </div>

          <div class="form-footer">
            <p>
              Đã có tài khoản?
              <router-link to="/login" class="link">Đăng nhập</router-link>
            </p>
          </div>

          <div class="terms">
            <p>
              Bằng việc đăng ký, bạn đồng ý với
              <a href="#">Điều khoản dịch vụ</a> và
              <a href="#">Chính sách bảo mật</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%);
  padding: 2rem 1rem;
}

.register-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  width: 100%;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

/* Left Side - Illustration */
.illustration-section {
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a3d 100%);
  padding: 4rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.illustration-section::before {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -100px;
  right: -100px;
}

.illustration-section::after {
  content: "";
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  bottom: -50px;
  left: -50px;
}

.illustration-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.illustration-icon {
  font-size: 5rem;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.illustration-content h2 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
  font-weight: 500;
  opacity: 0.95;
}

.illustration-content h1 {
  font-size: 3rem;
  margin: 0 0 1rem;
  font-weight: 800;
}

.illustration-content .highlight {
  color: #fef3c7;
}

.illustration-content p {
  font-size: 1.1rem;
  margin: 0 0 2rem;
  opacity: 0.9;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

/* Right Side - Form */
.form-section {
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-card {
  width: 100%;
  max-width: 450px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1f2937;
}

.logo-accent {
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a3d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h2 {
  font-size: 2rem;
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-weight: 700;
}

.form-header p {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  position: relative;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: #f9fafb;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #ff8c42;
  background: white;
  box-shadow: 0 0 0 4px rgba(255, 140, 66, 0.1);
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 3rem;
}

.password-group {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.toggle-password:hover {
  opacity: 1;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  border: 1px solid #fecaca;
}

.success-message {
  background: #d1fae5;
  color: #065f46;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  border: 1px solid #a7f3d0;
}

.btn-register {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a3d 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);
  margin-top: 0.5rem;
}

.btn-register:hover:not(:disabled) {
  background: linear-gradient(135deg, #ff7a3d 0%, #ff6b28 100%);
  box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4);
  transform: translateY(-2px);
}

.btn-register:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0 1rem;
  color: #9ca3af;
  font-size: 0.875rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.divider span {
  padding: 0 1rem;
}

.social-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.social-btn {
  width: 48px;
  height: 48px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-btn:hover {
  border-color: #ff8c42;
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 140, 66, 0.15);
}

.form-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.form-footer p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.link {
  color: #ff8c42;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.link:hover {
  color: #ff7a3d;
  text-decoration: underline;
}

.terms {
  text-align: center;
  margin-top: 1rem;
}

.terms p {
  margin: 0;
  font-size: 0.75rem;
  color: #9ca3af;
  line-height: 1.5;
}

.terms a {
  color: #6b7280;
  text-decoration: none;
}

.terms a:hover {
  color: #ff8c42;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 968px) {
  .register-container {
    grid-template-columns: 1fr;
  }

  .illustration-section {
    display: none;
  }

  .form-section {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .register-page {
    padding: 1rem;
  }

  .form-section {
    padding: 1.5rem 1rem;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }

  .brand-logo {
    margin-bottom: 1.5rem;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .social-buttons {
    gap: 0.75rem;
  }

  .social-btn {
    width: 44px;
    height: 44px;
  }
}
</style>
