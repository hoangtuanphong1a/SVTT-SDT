<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store } from "../../store";
import api from "../../services/api";

const router = useRouter();
const route = useRoute();

const email = ref("");
const otp = ref("");
const isLoading = ref(false);
const error = ref("");
const success = ref(false);

onMounted(() => {
  if (route.query.email) {
    email.value = route.query.email;
  }
});

const verifyOtp = async () => {
  isLoading.value = true;
  error.value = "";

  if (!email.value) {
    error.value = "Email không được để trống";
    isLoading.value = false;
    return;
  }

  if (!otp.value) {
    error.value = "Vui lòng nhập mã OTP";
    isLoading.value = false;
    return;
  }

  if (otp.value.length !== 6) {
    error.value = "Mã OTP phải có 6 chữ số";
    isLoading.value = false;
    return;
  }

  try {
    const response = await api.post("/auth/verify-otp", {
      email: email.value,
      otp: otp.value,
    });

    const { success: isSuccess, message } = response;

    if (isSuccess) {
      success.value = true;
      store.addNotification({
        type: "success",
        message: message || "Xác minh OTP thành công!",
      });

      // Redirect to reset password page with email param
      setTimeout(() => {
        router.push({
          path: "/reset-password",
          query: { email: email.value },
        });
      }, 2000);
    } else {
      error.value = message || "Mã OTP không đúng";
    }
  } catch (err) {
    console.error("Verify OTP error:", err);
    error.value =
      err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
  } finally {
    isLoading.value = false;
  }
};

const resendOtp = async () => {
  if (!email.value) {
    error.value = "Vui lòng nhập email trước";
    return;
  }

  try {
    const response = await api.post("/auth/request-reset-password", {
      email: email.value,
    });

    const { success: isSuccess, message } = response;

    if (isSuccess) {
      store.addNotification({
        type: "success",
        message: message || "Mã OTP đã được gửi lại!",
      });
    } else {
      error.value = message || "Có lỗi xảy ra";
    }
  } catch (err) {
    console.error("Resend OTP error:", err);
    error.value =
      err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
  }
};
</script>

<template>
  <div class="verify-otp-page">
    <div class="container">
      <div class="card">
        <div class="brand-logo">
          <span class="logo-icon">💼</span>
          <span class="logo-text"
            >Việc<span class="logo-accent">Làm</span>Plus</span
          >
        </div>

        <div class="form-header">
          <h2>Xác minh OTP</h2>
          <p>Nhập mã OTP đã được gửi đến email của bạn</p>
        </div>

        <form @submit.prevent="verifyOtp" class="form">
          <div class="form-group">
            <input
              v-model="email"
              type="email"
              placeholder="Email của bạn"
              required
            />
          </div>

          <div class="form-group otp-group">
            <input
              v-model="otp"
              type="text"
              placeholder="Nhập mã OTP (6 chữ số)"
              maxlength="6"
              required
            />
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div v-if="success" class="success-message">
            ✓ Xác minh thành công! Đang chuyển hướng...
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading || success">
            {{ isLoading ? "Đang xác minh..." : "Xác minh OTP" }}
          </button>

          <div class="resend-section">
            <p>Chưa nhận được mã?</p>
            <button type="button" class="btn-resend" @click="resendOtp">
              Gửi lại mã OTP
            </button>
          </div>
        </form>

        <div class="form-footer">
          <p>
            <router-link to="/login" class="link">← Quay lại đăng nhập</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.verify-otp-page {
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

.otp-group input {
  text-align: center;
  letter-spacing: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
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

.btn-submit {
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

.resend-section {
  text-align: center;
  margin-top: 1rem;
}

.resend-section p {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.btn-resend {
  background: none;
  border: none;
  color: #ff8c42;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;
}

.btn-resend:hover {
  color: #ff7a3d;
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

  .otp-group input {
    letter-spacing: 0.25rem;
    font-size: 1rem;
  }
}
</style>