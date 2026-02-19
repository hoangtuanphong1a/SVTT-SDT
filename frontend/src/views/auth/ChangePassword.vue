<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { store } from "../../store";
import api from "../../services/api";

const router = useRouter();
const user = JSON.parse(localStorage.getItem("user") || "{}");
const username = ref(user.username || "");

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const error = ref("");
const success = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const changePassword = async () => {
  isLoading.value = true;
  error.value = "";

  // Validation
  if (!currentPassword.value) {
    error.value = "Vui lòng nhập mật khẩu hiện tại";
    isLoading.value = false;
    return;
  }

  if (newPassword.value.length < 6) {
    error.value = "Mật khẩu mới phải có ít nhất 6 ký tự";
    isLoading.value = false;
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = "Mật khẩu mới và xác nhận mật khẩu không khớp";
    isLoading.value = false;
    return;
  }

  if (currentPassword.value === newPassword.value) {
    error.value = "Mật khẩu mới không được trùng với mật khẩu hiện tại";
    isLoading.value = false;
    return;
  }

  try {
    const response = await api.post("/auth/change-password", {
      username: username.value,
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    });

    const { success: isSuccess, message } = response;

    if (isSuccess) {
      success.value = true;
      store.addNotification({
        type: "success",
        message: message || "Đổi mật khẩu thành công!",
      });

      // Clear form after success
      currentPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
    } else {
      error.value = message || "Có lỗi xảy ra";
    }
  } catch (err) {
    console.error("Change password error:", err);
    error.value =
      err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="change-password-page">
    <div class="container">
      <div class="card">
        <div class="brand-logo">
          <span class="logo-icon">💼</span>
          <span class="logo-text"
            >Việc<span class="logo-accent">Làm</span>Plus</span
          >
        </div>

        <div class="form-header">
          <h2>Đổi mật khẩu</h2>
          <p>Cập nhật mật khẩu của bạn</p>
        </div>

        <form @submit.prevent="changePassword" class="form">
          <div class="form-group password-group">
            <input
              v-model="currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              placeholder="Mật khẩu hiện tại"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="showCurrentPassword = !showCurrentPassword"
            >
              {{ showCurrentPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>

          <div class="form-group password-group">
            <input
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="Mật khẩu mới"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="showNewPassword = !showNewPassword"
            >
              {{ showNewPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>

          <div class="form-group password-group">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Xác nhận mật khẩu mới"
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

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div v-if="success" class="success-message">
            ✓ Đổi mật khẩu thành công!
          </div>

          <div class="button-group">
            <button
              type="button"
              class="btn-cancel"
              @click="router.back()"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="btn-submit"
              :disabled="isLoading"
            >
              {{ isLoading ? "Đang xử lý..." : "Đổi mật khẩu" }}
            </button>
          </div>
        </form>

        <div class="form-footer">
          <p>
            <router-link to="/" class="link">← Quay lại trang chủ</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.change-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%);
  padding: 2rem 1rem;
}

.container {
  width: 100%;
  max-width: 450px;
}

.card {
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
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

.form {
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

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn-cancel {
  flex: 1;
  padding: 1rem;
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background: #e5e7eb;
}

.btn-submit {
  flex: 2;
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
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #ff7a3d 0%, #ff6b28 100%);
  box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4);
  transform: translateY(-2px);
}

.btn-submit:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.form-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
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

@media (max-width: 480px) {
  .card {
    padding: 2rem 1.5rem;
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

  .button-group {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-submit {
    width: 100%;
  }
}
</style>