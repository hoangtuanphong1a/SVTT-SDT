<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { store } from "../../store";
import api from "../../services/api";

const router = useRouter();
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref("");

const login = async () => {
  isLoading.value = true;
  error.value = "";

  try {
    const response = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    const { token, user } = response.data;

    // Save token and user info
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    store.setUser(user);

    // Redirect based on role
    if (user.role === "jobseeker") {
      router.push("/dashboard");
    } else if (user.role === "employer") {
      router.push("/employer/dashboard");
    } else if (user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }

    store.addNotification({
      type: "success",
      message: "Đăng nhập thành công!",
    });
  } catch (err) {
    console.error("Login error:", err);
    error.value =
      err.response?.data?.message ||
      "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Left Side - Form Section -->
      <div class="form-section">
        <div class="form-card">
          <div class="brand-logo">
            <span class="logo-icon">💼</span>
            <span class="logo-text"
              >Việc<span class="logo-accent">Làm</span>Plus</span
            >
          </div>

          <div class="form-header">
            <h2>Đăng nhập</h2>
            <p>Chào mừng bạn quay trở lại! Hãy đăng nhập để tiếp tục.</p>
          </div>

          <form @submit.prevent="login" class="login-form">
            <div class="form-group">
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="Email của bạn"
                required
              />
            </div>

            <div class="form-group">
              <div class="password-group">
                <input
                  id="password"
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
            </div>

            <div class="forgot-password">
              <a href="#" class="link">Quên mật khẩu?</a>
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <button type="submit" class="btn-login" :disabled="isLoading">
              {{ isLoading ? "Đang đăng nhập..." : "Đăng nhập" }}
            </button>
          </form>

          <div class="divider">
            <span>hoặc đăng nhập với</span>
          </div>

          <div class="social-buttons">
            <button
              type="button"
              class="social-btn"
              title="Đăng nhập với Google"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
                  fill="#4285F4"
                />
                <path
                  d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z"
                  fill="#34A853"
                />
                <path
                  d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
                  fill="#FBBC04"
                />
                <path
                  d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z"
                  fill="#EA4335"
                />
              </svg>
            </button>
            <button
              type="button"
              class="social-btn"
              title="Đăng nhập với Microsoft"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill="#f25022" d="M0 0h9.5v9.5H0z" />
                <path fill="#00a4ef" d="M10.5 0H20v9.5h-9.5z" />
                <path fill="#7fba00" d="M0 10.5h9.5V20H0z" />
                <path fill="#ffb900" d="M10.5 10.5H20V20h-9.5z" />
              </svg>
            </button>
            <button
              type="button"
              class="social-btn"
              title="Đăng nhập với GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#24292e">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                />
              </svg>
            </button>
          </div>

          <div class="form-footer">
            <p>
              Chưa có tài khoản?
              <router-link to="/register" class="link"
                >Đăng ký ngay</router-link
              >
            </p>
          </div>

          <div class="terms">
            <p>
              Bằng việc đăng nhập, bạn đồng ý với
              <a href="#">Điều khoản sử dụng</a> và
              <a href="#">Chính sách bảo mật</a> của chúng tôi.
            </p>
          </div>
        </div>
      </div>

      <!-- Right Side - Illustration Section -->
      <div class="illustration-section">
        <div class="illustration-content">
          <div class="illustration-icon">💼</div>
          <h2>Chào mừng trở lại!</h2>
          <h1>Việc<span class="highlight">Làm</span>Plus</h1>
          <p>Kết nối với hàng nghìn cơ hội việc làm hấp dẫn</p>

          <div class="features">
            <div class="feature-item">
              <span>✓</span>
              <span>Tìm kiếm việc làm phù hợp</span>
            </div>
            <div class="feature-item">
              <span>✓</span>
              <span>Kết nối với nhà tuyển dụng</span>
            </div>
            <div class="feature-item">
              <span>✓</span>
              <span>Quản lý hồ sơ ứng tuyển</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%);
  padding: 2rem 1rem;
}

.login-container {
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

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  position: relative;
}

.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: #f9fafb;
}

.form-group input:focus {
  outline: none;
  border-color: #ff8c42;
  background: white;
  box-shadow: 0 0 0 4px rgba(255, 140, 66, 0.1);
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

.forgot-password {
  text-align: right;
  margin-top: -0.5rem;
}

.forgot-password .link {
  font-size: 0.875rem;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  border: 1px solid #fecaca;
}

.btn-login {
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

.btn-login:hover:not(:disabled) {
  background: linear-gradient(135deg, #ff7a3d 0%, #ff6b28 100%);
  box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4);
  transform: translateY(-2px);
}

.btn-login:disabled {
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
  .login-container {
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
  .login-page {
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
