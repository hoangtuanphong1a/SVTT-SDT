<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { store } from "../store";

const route = useRoute();
const router = useRouter();
const showToolsDropdown = ref(false);
const showJobsDropdown = ref(false);
const showCompanyDropdown = ref(false);
const showCVDropdown = ref(false);
const showBlogDropdown = ref(false);
const showMobileMenu = ref(false);

const isPublicRoute = computed(() => {
  return true; // Always show navigation
});

const userRole = computed(() => localStorage.getItem("role"));

const jobsMenu = [
  { name: "📌 Việc làm đang tuyển", path: "/jobs/active" },
  { name: "🔥 Việc làm hot", path: "/jobs/hot" },
  { name: "⏰ Việc làm mới", path: "/jobs/recent" },
  { name: "💼 Theo ngành nghề", path: "/jobs/by-category" },
];

const companiesMenu = [
  { name: "🏢 Danh sách công ty", path: "/companies/list" },
  { name: "⭐ Công ty top", path: "/companies/top-rated" },
  { name: "📈 Công ty đang tuyển", path: "/companies/hiring" },
  { name: "🌟 Công ty nổi bật", path: "/companies/featured" },
];

const cvMenu = [
  { name: "📄 Mẫu CV cơ bản", path: "/cv-template/basic" },
  { name: "✨ Mẫu CV nâng cao", path: "/cv-template/advanced" },
  { name: "🎨 Mẫu CV sáng tạo", path: "/cv-template/creative" },
  { name: "🚀 Tạo CV mới", path: "/cv-builder" },
];

const blogMenu = [
  { name: "📚 Tất cả bài viết", path: "/blog" },
  { name: "💡 Mẹo tìm việc", path: "/blog/job-tips" },
  { name: "🎯 Hướng nghiệp", path: "/blog/career-guidance" },
  { name: "💼 Kinh nghiệm công việc", path: "/blog/work-experience" },
  { name: "🏆 Success stories", path: "/blog/success-stories" },
];

const toolsMenu = [
  { name: "🔔 Thông báo việc làm", path: "/job-alerts" },
  { name: "💰 Tính lương", path: "/salary-calculator" },
  { name: "🎥 Chuẩn bị phỏng vấn", path: "/interview-prep" },
  { name: "⭐ Đánh giá công ty", path: "/company-reviews" },
  { name: "📊 Phân tích thị trường", path: "/analytics" },
];

const logout = () => {
  store.logout();
  router.push("/login");
};

const navigateToDropdown = (path) => {
  showJobsDropdown.value = false;
  showCompanyDropdown.value = false;
  showCVDropdown.value = false;
  showBlogDropdown.value = false;
  showToolsDropdown.value = false;
  showMobileMenu.value = false;
  router.push(path);
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  if (!showMobileMenu.value) {
    showJobsDropdown.value = false;
    showCompanyDropdown.value = false;
    showCVDropdown.value = false;
    showBlogDropdown.value = false;
    showToolsDropdown.value = false;
  }
};
</script>

<template>
  <div class="layout">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <router-link to="/" class="logo-link">
              <span class="logo-icon">💼</span>
              <span class="logo-text"
                >Việc<span class="logo-accent">Làm</span>Plus</span
              >
            </router-link>
          </div>

          <nav class="nav">
            <router-link to="/" class="nav-link">Trang chủ</router-link>

            <!-- Jobs Dropdown -->
            <div class="nav-dropdown">
              <button
                class="nav-link dropdown-trigger"
                @click="showJobsDropdown = !showJobsDropdown"
              >
                Việc làm
                <svg
                  class="chevron"
                  :class="{ open: showJobsDropdown }"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div v-if="showJobsDropdown" class="dropdown-menu">
                <button
                  v-for="item in jobsMenu"
                  :key="item.path"
                  @click="navigateToDropdown(item.path)"
                  class="dropdown-item"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>

            <!-- Companies Dropdown -->
            <div class="nav-dropdown">
              <button
                class="nav-link dropdown-trigger"
                @click="showCompanyDropdown = !showCompanyDropdown"
              >
                Công ty
                <svg
                  class="chevron"
                  :class="{ open: showCompanyDropdown }"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div v-if="showCompanyDropdown" class="dropdown-menu">
                <button
                  v-for="item in companiesMenu"
                  :key="item.path"
                  @click="navigateToDropdown(item.path)"
                  class="dropdown-item"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>

            <!-- CV Template Dropdown -->
            <div class="nav-dropdown">
              <button
                class="nav-link dropdown-trigger"
                @click="showCVDropdown = !showCVDropdown"
              >
                Mẫu CV
                <svg
                  class="chevron"
                  :class="{ open: showCVDropdown }"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div v-if="showCVDropdown" class="dropdown-menu">
                <button
                  v-for="item in cvMenu"
                  :key="item.path"
                  @click="navigateToDropdown(item.path)"
                  class="dropdown-item"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>

            <!-- Tools Dropdown -->
            <div class="nav-dropdown">
              <button
                class="nav-link dropdown-trigger"
                @click="showToolsDropdown = !showToolsDropdown"
              >
                Công cụ
                <svg
                  class="chevron"
                  :class="{ open: showToolsDropdown }"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div v-if="showToolsDropdown" class="dropdown-menu">
                <button
                  v-for="item in toolsMenu"
                  :key="item.path"
                  @click="navigateToDropdown(item.path)"
                  class="dropdown-item"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>

            <!-- Blog Dropdown -->
            <div class="nav-dropdown">
              <button
                class="nav-link dropdown-trigger"
                @click="showBlogDropdown = !showBlogDropdown"
              >
                Blog
                <svg
                  class="chevron"
                  :class="{ open: showBlogDropdown }"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div v-if="showBlogDropdown" class="dropdown-menu">
                <button
                  v-for="item in blogMenu"
                  :key="item.path"
                  @click="navigateToDropdown(item.path)"
                  class="dropdown-item"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>
          </nav>

          <!-- Mobile Menu Button -->
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <svg
              v-if="!showMobileMenu"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg
              v-else
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <div class="auth-buttons">
            <template v-if="store.isAuthenticated">
              <span class="user-info"
                >Xin chào, {{ store.user?.fullName }}</span
              >
              <button @click="logout" class="btn btn-secondary">
                Đăng xuất
              </button>
            </template>
            <template v-else>
              <router-link to="/login" class="btn btn-secondary"
                >Đăng nhập</router-link
              >
              <router-link to="/register" class="btn btn-primary"
                >Đăng ký</router-link
              >
            </template>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="showMobileMenu" class="mobile-menu">
          <router-link
            to="/"
            class="mobile-nav-link"
            @click="showMobileMenu = false"
            >Trang chủ</router-link
          >
          <router-link
            to="/jobs"
            class="mobile-nav-link"
            @click="showMobileMenu = false"
            >Việc làm</router-link
          >
          <router-link
            to="/companies"
            class="mobile-nav-link"
            @click="showMobileMenu = false"
            >Công ty</router-link
          >
          <router-link
            to="/cv-template"
            class="mobile-nav-link"
            @click="showMobileMenu = false"
            >Mẫu CV</router-link
          >
          <router-link
            to="/blog"
            class="mobile-nav-link"
            @click="showMobileMenu = false"
            >Blog</router-link
          >
          <router-link
            to="/tools"
            class="mobile-nav-link"
            @click="showMobileMenu = false"
            >Công cụ</router-link
          >

          <div class="mobile-auth-buttons">
            <template v-if="store.isAuthenticated">
              <span class="mobile-user-info"
                >Xin chào, {{ store.user?.fullName }}</span
              >
              <button @click="logout" class="btn btn-secondary btn-block">
                Đăng xuất
              </button>
            </template>
            <template v-else>
              <router-link
                to="/login"
                class="btn btn-secondary btn-block"
                @click="showMobileMenu = false"
                >Đăng nhập</router-link
              >
              <router-link
                to="/register"
                class="btn btn-primary btn-block"
                @click="showMobileMenu = false"
                >Đăng ký</router-link
              >
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="container">
          <div class="footer-grid">
            <!-- Brand Section -->
            <div class="footer-section">
              <div class="footer-logo">
                <h3>💼 JobVista</h3>
                <p class="footer-tagline">
                  Nền tảng tuyển dụng hàng đầu Việt Nam
                </p>
              </div>
              <p class="footer-description">
                Kết nối nhà tuyển dụng và ứng viên tài năng. Tìm công việc mơ
                ước của bạn hoặc tuyển dụng nhân viên xuất sắc.
              </p>
              <div class="social-links">
                <a href="#" class="social-link" title="Facebook">f</a>
                <a href="#" class="social-link" title="Twitter">𝕏</a>
                <a href="#" class="social-link" title="LinkedIn">in</a>
                <a href="#" class="social-link" title="Instagram">📷</a>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="footer-section">
              <h4 class="footer-title">Cho Ứng Viên</h4>
              <ul class="footer-links">
                <li><router-link to="/jobs">Tìm Việc Làm</router-link></li>
                <li><router-link to="/companies">Công Ty</router-link></li>
                <li><router-link to="/blog">Blog & Tips</router-link></li>
                <li>
                  <router-link to="/salary-calculator">Tính Lương</router-link>
                </li>
              </ul>
            </div>

            <!-- For Employers -->
            <div class="footer-section">
              <h4 class="footer-title">Cho Nhà Tuyển Dụng</h4>
              <ul class="footer-links">
                <li><a href="#post-job">Đăng Tuyển Dụng</a></li>
                <li><a href="#talent">Tìm Nhân Tài</a></li>
                <li><a href="#pricing">Gói Dịch Vụ</a></li>
                <li><a href="#resources">Tài Liệu & Hướng Dẫn</a></li>
              </ul>
            </div>

            <!-- Company -->
            <div class="footer-section">
              <h4 class="footer-title">Về JobVista</h4>
              <ul class="footer-links">
                <li><router-link to="/about">Về Chúng Tôi</router-link></li>
                <li><router-link to="/contact">Liên Hệ</router-link></li>
                <li><a href="#privacy">Chính Sách Bảo Mật</a></li>
                <li><a href="#terms">Điều Khoản Sử Dụng</a></li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div class="footer-section">
              <h4 class="footer-title">Liên Hệ</h4>
              <div class="contact-info">
                <p class="contact-item">
                  <span class="contact-icon">📍</span>
                  <span>TP. Hồ Chí Minh, Việt Nam</span>
                </p>
                <p class="contact-item">
                  <span class="contact-icon">📧</span>
                  <a href="mailto:info@jobvista.vn">info@jobvista.vn</a>
                </p>
                <p class="contact-item">
                  <span class="contact-icon">📞</span>
                  <a href="tel:+84283456789">+84 (28) 3456 789</a>
                </p>
              </div>
            </div>
          </div>

          <!-- Footer Bottom -->
          <div class="footer-bottom">
            <div class="footer-bottom-content">
              <p class="copyright">
                &copy; 2024 JobVista. Tất cả quyền được bảo lưu.
              </p>
              <div class="footer-bottom-links">
                <a href="#privacy">Chính Sách Bảo Mật</a>
                <span class="separator">•</span>
                <a href="#terms">Điều Khoản Sử Dụng</a>
                <span class="separator">•</span>
                <a href="#cookies">Chính Sách Cookie</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.header .container {
  padding: 0;
  max-width: 80%;
  width: 100%;
  margin: 0 auto;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 2rem;
  display: flex;
  align-items: center;
  filter: drop-shadow(0 2px 4px rgba(255, 140, 66, 0.3));
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1f2937;
  letter-spacing: -0.02em;
}

.logo-accent {
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a3d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
}

.logo h1 {
  margin: 0;
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a3d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.5rem;
  font-weight: 700;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #1f2937;
  font-weight: 500;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #ff8c42;
}

/* Dropdown Menu */
.nav-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chevron {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
  display: inline-block;
  width: 16px;
  height: 16px;
  color: currentColor;
}

.chevron.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  margin-top: 0.5rem;
  z-index: 1000;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  color: #374151;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background-color: #f9fafb;
  color: #ff8c42;
  padding-left: 1.25rem;
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  color: #374151;
  font-weight: 500;
}

.btn {
  padding: 0.625rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
}

.btn-primary {
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a3d 100%);
  color: white;
  border-color: #ff8c42;
  box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #ff7a3d 0%, #ff6b28 100%);
  border-color: #ff7a3d;
  box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4);
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #ffffff;
  color: #1f2937;
  border: 2px solid #e5e7eb;
  font-weight: 600;
}

.btn-secondary:hover {
  background-color: #1f2937;
  color: white;
  border-color: #1f2937;
  transform: translateY(-2px);
}

.main {
  flex: 1;
  padding: 0;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 4rem;
  max-width: 80%;
}

.main .container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  flex: 1;
  max-width: 80%;
}

.footer .container {
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 100%;
}

.footer p {
  margin: 0;
  text-align: center;
  color: #6b7280;
}

/* ==================== FOOTER STYLING ==================== */
.footer {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: #d1d5db;
  padding: 60px 0 0;
  margin-top: 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.footer-content {
  width: 100%;
  padding: 0;
}

.footer-content .container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 3rem;
  width: 100%;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  padding: 60px 0 40px;
  border-bottom: 1px solid rgba(255, 140, 66, 0.1);
}

/* Footer Section */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo h3 {
  margin: 0 0 8px;
  font-size: 1.5rem;
  color: #ff8c42;
  font-weight: 700;
}

.footer-tagline {
  margin: 0;
  font-size: 0.9rem;
  color: #9ca3af;
  font-weight: 600;
}

.footer-description {
  margin: 0;
  font-size: 0.95rem;
  color: #9ca3af;
  line-height: 1.6;
}

.footer-title {
  margin: 0;
  font-size: 1.1rem;
  color: #ffffff;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links li a {
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-links li a:hover {
  color: #ff8c42;
  transform: translateX(4px);
}

/* Social Links */
.social-links {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 140, 66, 0.2);
  color: #ff8c42;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.social-link:hover {
  background: #ff8c42;
  color: white;
  transform: translateY(-4px);
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #d1d5db;
  font-size: 0.95rem;
}

.contact-icon {
  font-size: 1.3rem;
  min-width: 24px;
}

.contact-item a {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: #ff8c42;
}

/* Footer Bottom */
.footer-bottom {
  background: linear-gradient(
    90deg,
    rgba(255, 140, 66, 0.05) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(255, 140, 66, 0.05) 100%
  );
  padding: 40px 3rem;
  border-top: 2px solid rgba(255, 140, 66, 0.2);
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.footer-bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}

.copyright {
  margin: 0;
  color: #ff8c42;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-bottom-links a {
  color: #d1d5db;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-bottom-links a:hover {
  color: #ff8c42;
  text-decoration: underline;
  transform: translateY(-2px);
}

.separator {
  color: #6b7280;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #1f2937;
  transition: color 0.2s;
}

.mobile-menu-btn:hover {
  color: #ff8c42;
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 1rem 0;
}

.mobile-nav-link {
  padding: 0.75rem 2rem;
  text-decoration: none;
  color: #1f2937;
  font-weight: 500;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background: #f9fafb;
  color: #ff8c42;
  border-left-color: #ff8c42;
}

.mobile-auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 0.5rem;
}

.mobile-user-info {
  font-size: 0.9rem;
  color: #6b7280;
  padding: 0.5rem 0;
}

.btn-block {
  width: 100%;
  text-align: center;
}

/* Responsive Footer */
@media (max-width: 1024px) {
  .header-content {
    padding: 1rem 2rem;
  }

  .nav {
    gap: 1.5rem;
  }

  .auth-buttons {
    gap: 0.75rem;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 1rem 1.5rem;
  }

  .nav {
    display: none;
  }

  .auth-buttons {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: flex;
  }

  .logo-text {
    font-size: 1.25rem;
  }

  .logo-icon {
    font-size: 1.5rem;
  }

  .dropdown-menu {
    position: fixed;
    left: 0;
    right: 0;
    top: auto;
    width: 100%;
    border-radius: 0;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  }

  .dropdown-item {
    padding: 0.75rem 1rem;
  }

  /* Footer Responsive */
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px 0 32px;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .footer-bottom-links {
    justify-content: center;
  }

  .footer-title {
    font-size: 1rem;
  }

  .footer-links li a:hover {
    transform: none;
  }

  .copyright {
    font-size: 1rem;
  }

  .footer-bottom-links a {
    font-size: 0.95rem;
  }

  /* Mobile dropdown menu */
  .dropdown-menu {
    position: fixed;
    left: 0;
    right: 0;
    top: auto;
    width: 100%;
    border-radius: 0;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  }

  .dropdown-item {
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 40px 0 0;
    margin-top: 40px;
  }

  .footer-grid {
    gap: 24px;
    padding: 32px 0 24px;
  }

  .footer-content .container {
    padding: 0 1rem;
  }

  .footer-logo h3 {
    font-size: 1.3rem;
  }

  .social-links {
    gap: 8px;
  }

  .social-link {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }

  .contact-item {
    font-size: 0.9rem;
  }

  .footer-bottom {
    padding: 28px 0;
  }

  .footer-bottom-content {
    gap: 16px;
  }

  .copyright {
    font-size: 0.95rem;
  }

  .footer-bottom-links {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .footer-bottom-links a {
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
  }

  .separator {
    display: none;
  }
}
</style>
