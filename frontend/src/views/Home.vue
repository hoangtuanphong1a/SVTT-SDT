<script setup>
import { onMounted, ref } from "vue";
import { store } from "../store";
import api from "../services/api";

const stats = ref({
  totalJobs: 0,
  totalCompanies: 0,
  totalUsers: 0,
  totalApplications: 0,
});
const featuredJobs = ref([]);
const latestCompanies = ref([]);
const latestBlogs = ref([]);
const isLoading = ref(false);
const error = ref("");
const searchQuery = ref("");
const selectedLocation = ref("");
const selectedJobType = ref("");

// Categorized jobs and blogs
const jobsByCategory = ref({
  frontend: [
    {
      id: 1,
      title: "Lập trình viên Frontend",
      company: "Công ty Công nghệ",
      salary: "15-20M",
      location: "HN",
    },
    {
      id: 2,
      title: "Chuyên gia React",
      company: "Phòng thí nghiệm",
      salary: "18-22M",
      location: "HCM",
    },
    {
      id: 3,
      title: "Lập trình viên Vue.js",
      company: "Xưởng Kỹ thuật",
      salary: "14-18M",
      location: "DN",
    },
  ],
  backend: [
    {
      id: 4,
      title: "Lập trình viên Backend",
      company: "Hệ thống máy chủ",
      salary: "16-21M",
      location: "HN",
    },
    {
      id: 5,
      title: "Kỹ sư Node.js",
      company: "Khởi động Cộng",
      salary: "17-22M",
      location: "HCM",
    },
    {
      id: 6,
      title: "Lập trình viên Java",
      company: "Công ty Doanh nghiệp",
      salary: "15-20M",
      location: "HN",
    },
  ],
  fullstack: [
    {
      id: 7,
      title: "Lập trình viên Full Stack",
      company: "Giải pháp Web",
      salary: "18-24M",
      location: "HCM",
    },
    {
      id: 8,
      title: "Lập trình viên MERN Stack",
      company: "Khởi động Công nghệ",
      salary: "17-23M",
      location: "HN",
    },
    {
      id: 9,
      title: "Kỹ sư Full Stack",
      company: "Công ty Kỹ thuật Số",
      salary: "16-22M",
      location: "DN",
    },
  ],
  mobile: [
    {
      id: 10,
      title: "Lập trình viên Mobile",
      company: "Xưởng Ứng dụng",
      salary: "16-21M",
      location: "HCM",
    },
    {
      id: 11,
      title: "Lập trình viên iOS",
      company: "Đối tác Apple",
      salary: "17-22M",
      location: "HN",
    },
    {
      id: 12,
      title: "Lập trình viên Android",
      company: "Mobile Tiên phong",
      salary: "15-20M",
      location: "DN",
    },
  ],
});

const blogsByCategory = ref({
  jobTips: [
    {
      id: 1,
      title: "10 Mẹo tìm việc hiệu quả",
      category: "Mẹo Tìm Việc",
      author: "Admin",
      date: "2024-02-01",
    },
    {
      id: 2,
      title: "Cách viết CV hấp dẫn",
      category: "Mẹo Tìm Việc",
      author: "HR Expert",
      date: "2024-02-02",
    },
    {
      id: 3,
      title: "Phỏng vấn thành công",
      category: "Mẹo Tìm Việc",
      author: "Interview Coach",
      date: "2024-02-03",
    },
  ],
  career: [
    {
      id: 4,
      title: "Lộ trình phát triển sự nghiệp",
      category: "Hướng Nghiệp",
      author: "Career Coach",
      date: "2024-02-01",
    },
    {
      id: 5,
      title: "Những kỹ năng cần thiết",
      category: "Hướng Nghiệp",
      author: "Industry Expert",
      date: "2024-02-02",
    },
    {
      id: 6,
      title: "Chuyên đổi ngành",
      category: "Hướng Nghiệp",
      author: "Mentor",
      date: "2024-02-03",
    },
  ],
  salaryGuide: [
    {
      id: 7,
      title: "Mức lương các vị trí IT",
      category: "Mức Lương",
      author: "Data Analyst",
      date: "2024-02-01",
    },
    {
      id: 8,
      title: "Thương lượng lương thành công",
      category: "Mức Lương",
      author: "HR Manager",
      date: "2024-02-02",
    },
    {
      id: 9,
      title: "Top ngành lương cao",
      category: "Mức Lương",
      author: "Economist",
      date: "2024-02-03",
    },
  ],
  technology: [
    {
      id: 10,
      title: "Xu hướng công nghệ 2024",
      category: "Công Nghệ",
      author: "Tech Writer",
      date: "2024-02-01",
    },
    {
      id: 11,
      title: "AI trong tuyển dụng",
      category: "Công Nghệ",
      author: "Tech Expert",
      date: "2024-02-02",
    },
    {
      id: 12,
      title: "Remote work trends",
      category: "Công Nghệ",
      author: "Journalist",
      date: "2024-02-03",
    },
  ],
});

const companiesByCategory = ref({
  technology: [
    {
      id: 1,
      name: "Tech Corp",
      industry: "Công nghệ",
      jobCount: 45,
      logo: "https://ui-avatars.com/api/?name=TC&background=6b7280&color=fff&size=120&font-size=0.4",
      location: "Hà Nội",
      rating: "4.8",
    },
    {
      id: 2,
      name: "Innovation Lab",
      industry: "Công nghệ",
      jobCount: 32,
      logo: "https://ui-avatars.com/api/?name=IL&background=6b7280&color=fff&size=120&font-size=0.4",
      location: "TP. HCM",
      rating: "4.6",
    },
    {
      id: 3,
      name: "Digital Studio",
      industry: "Công nghệ",
      jobCount: 28,
      logo: "https://ui-avatars.com/api/?name=DS&background=6b7280&color=fff&size=120&font-size=0.4",
      location: "Đà Nẵng",
      rating: "4.5",
    },
  ],
  startup: [
    {
      id: 4,
      name: "StartUp Plus",
      industry: "Startup",
      jobCount: 18,
      logo: "https://ui-avatars.com/api/?name=SP&background=4b5563&color=fff&size=120&font-size=0.4",
      location: "TP. HCM",
      rating: "4.7",
    },
    {
      id: 5,
      name: "Tech Startup",
      industry: "Startup",
      jobCount: 22,
      logo: "https://ui-avatars.com/api/?name=TS&background=4b5563&color=fff&size=120&font-size=0.4",
      location: "Hà Nội",
      rating: "4.4",
    },
    {
      id: 6,
      name: "Venture Hub",
      industry: "Startup",
      jobCount: 15,
      logo: "https://ui-avatars.com/api/?name=VH&background=4b5563&color=fff&size=120&font-size=0.4",
      location: "TP. HCM",
      rating: "4.3",
    },
  ],
  finance: [
    {
      id: 7,
      name: "Financial Plus",
      industry: "Tài chính",
      jobCount: 35,
      logo: "https://ui-avatars.com/api/?name=FP&background=9ca3af&color=fff&size=120&font-size=0.4",
      location: "Hà Nội",
      rating: "4.7",
    },
    {
      id: 8,
      name: "Banking Solutions",
      industry: "Tài chính",
      jobCount: 40,
      logo: "https://ui-avatars.com/api/?name=BS&background=9ca3af&color=fff&size=120&font-size=0.4",
      location: "TP. HCM",
      rating: "4.6",
    },
    {
      id: 9,
      name: "Investment Corp",
      industry: "Tài chính",
      jobCount: 25,
      logo: "https://ui-avatars.com/api/?name=IC&background=9ca3af&color=fff&size=120&font-size=0.4",
      location: "Hà Nội",
      rating: "4.5",
    },
  ],
  ecommerce: [
    {
      id: 10,
      name: "Shop Online",
      industry: "E-commerce",
      jobCount: 50,
      logo: "https://ui-avatars.com/api/?name=SO&background=d1d5db&color=1f2937&size=120&font-size=0.4",
      location: "TP. HCM",
      rating: "4.8",
    },
    {
      id: 11,
      name: "Market Hub",
      industry: "E-commerce",
      jobCount: 42,
      logo: "https://ui-avatars.com/api/?name=MH&background=d1d5db&color=1f2937&size=120&font-size=0.4",
      location: "Hà Nội",
      rating: "4.6",
    },
    {
      id: 12,
      name: "Digital Market",
      industry: "E-commerce",
      jobCount: 38,
      logo: "https://ui-avatars.com/api/?name=DM&background=d1d5db&color=1f2937&size=120&font-size=0.4",
      location: "Đà Nẵng",
      rating: "4.4",
    },
  ],
});

const popularSearches = [
  "Lập trình viên Frontend",
  "Quản lý Marketing",
  "Nhà phân tích Dữ liệu",
  "Thiết kế UX",
  "Quản lý Sản phẩm",
];

const heroStats = [
  { icon: "💼", value: "10,000+", label: "Việc làm" },
  { icon: "🏢", value: "2,500+", label: "Công ty" },
  { icon: "👥", value: "50,000+", label: "Ứng viên" },
  { icon: "📈", value: "95%", label: "Thành công" },
];

const handleSearch = () => {
  // Navigate to jobs page with search params
  // Will implement with router
};

const loadStats = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    const response = await api.get("/stats");
    stats.value = response.data;
  } catch (err) {
    console.error("Error loading stats:", err);
    error.value = "Tải thông tin thất bại. Vui lòng thử lại.";
  } finally {
    isLoading.value = false;
  }
};

const loadFeaturedJobs = async () => {
  try {
    const response = await api.get("/jobs/featured");
    featuredJobs.value = response.data;
  } catch (err) {
    console.error("Error loading featured jobs:", err);
  }
};

const loadLatestCompanies = async () => {
  try {
    const response = await api.get("/companies/latest");
    latestCompanies.value = response.data;
  } catch (err) {
    console.error("Error loading latest companies:", err);
  }
};

const loadLatestBlogs = async () => {
  try {
    const response = await api.get("/blog/latest");
    latestBlogs.value = response.data;
  } catch (err) {
    console.error("Error loading latest blogs:", err);
  }
};

onMounted(() => {
  loadStats();
  loadFeaturedJobs();
  loadLatestCompanies();
  loadLatestBlogs();
});
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <!-- Background Pattern -->
      <div class="hero-background">
        <div class="hero-circle hero-circle-1"></div>
        <div class="hero-circle hero-circle-2"></div>
        <div class="hero-circle hero-circle-3"></div>
        <div class="hero-circle hero-circle-4"></div>
      </div>

      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            Tìm kiếm việc làm
            <span class="title-highlight">mơ ước của bạn</span>
          </h1>
          <p class="hero-subtitle">
            Kết nối với hàng ngàn cơ hội nghề nghiệp từ các công ty hàng đầu.
            Tạo CV chuyên nghiệp và ứng tuyển ngay hôm nay.
          </p>

          <!-- Enhanced Search Box -->
          <div class="search-box">
            <div class="search-input-group">
              <div class="search-input-wrapper">
                <span class="search-icon">🔍</span>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Vị trí, kỹ năng, công ty..."
                  class="search-input"
                />
              </div>

              <div class="search-input-wrapper">
                <span class="search-icon">📍</span>
                <select v-model="selectedLocation" class="search-input">
                  <option value="">Tất cả địa điểm</option>
                  <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="da-nang">Đà Nẵng</option>
                  <option value="remote">Làm từ xa</option>
                </select>
              </div>

              <div class="search-input-wrapper">
                <span class="search-icon">💼</span>
                <select v-model="selectedJobType" class="search-input">
                  <option value="">Tất cả loại hợp đồng</option>
                  <option value="full-time">Toàn thời gian</option>
                  <option value="part-time">Bán thời gian</option>
                  <option value="contract">Hợp đồng</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>

              <button @click="handleSearch" class="search-btn">Tìm kiếm</button>
            </div>
          </div>

          <!-- Popular Searches -->
          <div class="popular-searches">
            <span class="popular-label">Tìm kiếm phổ biến:</span>
            <div class="popular-tags">
              <span
                v-for="search in popularSearches"
                :key="search"
                class="popular-tag"
              >
                {{ search }}
              </span>
            </div>
          </div>
        </div>

        <!-- Hero Stats -->
        <div class="hero-stats">
          <div v-for="stat in heroStats" :key="stat.label" class="stat-card">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs Section -->
    <section class="featured-jobs">
      <div class="container">
        <div class="section-header">
          <h2>Việc làm nổi bật</h2>
          <p>Khám phá những cơ hội việc làm hấp dẫn nhất</p>
        </div>

        <div class="jobs-grid">
          <div v-for="job in featuredJobs" :key="job.id" class="job-card">
            <div class="job-card-header">
              <div class="job-card-title">
                <h3>{{ job.title }}</h3>
                <div class="job-company">{{ job.companyName }}</div>
              </div>
              <button class="bookmark-btn">🔖</button>
            </div>

            <div class="job-card-meta">
              <div class="meta-item">
                <span class="meta-icon">📍</span>
                <span>{{ job.location }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">💰</span>
                <span>{{ job.salary }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">⏱️</span>
                <span>{{ job.type }}</span>
              </div>
            </div>

            <div class="job-card-tags">
              <span class="tag">{{ job.type }}</span>
              <span v-if="job.urgent" class="tag urgent">🔥 Gấp</span>
            </div>

            <div class="job-card-footer">
              <router-link :to="`/jobs/${job.id}`" class="btn btn-primary">
                Xem chi tiết
              </router-link>
              <span class="posted-time">{{
                job.posted || "2 ngày trước"
              }}</span>
            </div>
          </div>
        </div>

        <div class="view-all">
          <router-link to="/jobs" class="btn btn-primary-outline">
            Xem tất cả việc làm →
          </router-link>
        </div>

        <!-- Jobs List Container -->
        <div class="list-container jobs-list-container">
          <div class="list-header">
            <h3>📋 Danh sách việc làm nổi bật</h3>
            <router-link to="/jobs" class="view-more">Xem thêm →</router-link>
          </div>
          <ul class="jobs-list">
            <li
              v-for="job in featuredJobs.slice(0, 6)"
              :key="job.id"
              class="list-item"
            >
              <div class="list-item-left">
                <div class="list-item-num">
                  {{ featuredJobs.indexOf(job) + 1 }}
                </div>
                <div class="list-item-content">
                  <strong class="list-title">{{ job.title }}</strong>
                  <span class="list-company">{{ job.companyName }}</span>
                </div>
              </div>
              <div class="list-item-right">
                <span class="list-salary">{{ job.salary }}</span>
                <span class="list-location">{{ job.location }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Job Categories Sections -->
    <!-- Frontend Jobs Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>💻 Frontend Developer Jobs</h2>
          <p>Tuyển dụng lập trình viên Frontend</p>
        </div>

        <div class="jobs-grid">
          <div
            v-for="job in jobsByCategory.frontend"
            :key="job.id"
            class="job-card"
          >
            <div class="job-card-header">
              <div class="job-card-title">
                <h3>{{ job.title }}</h3>
                <div class="job-company">{{ job.company }}</div>
              </div>
              <button class="bookmark-btn">🔖</button>
            </div>

            <div class="job-card-meta">
              <div class="meta-item">
                <span class="meta-icon">📍</span>
                <span>{{ job.location }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">💰</span>
                <span>{{ job.salary }}</span>
              </div>
            </div>

            <div class="job-card-footer">
              <router-link :to="`/jobs/${job.id}`" class="btn btn-primary">
                Xem chi tiết
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Backend Jobs Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>⚙️ Backend Developer Jobs</h2>
          <p>Tuyển dụng lập trình viên Backend</p>
        </div>

        <div class="jobs-grid">
          <div
            v-for="job in jobsByCategory.backend"
            :key="job.id"
            class="job-card"
          >
            <div class="job-card-header">
              <div class="job-card-title">
                <h3>{{ job.title }}</h3>
                <div class="job-company">{{ job.company }}</div>
              </div>
              <button class="bookmark-btn">🔖</button>
            </div>

            <div class="job-card-meta">
              <div class="meta-item">
                <span class="meta-icon">📍</span>
                <span>{{ job.location }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">💰</span>
                <span>{{ job.salary }}</span>
              </div>
            </div>

            <div class="job-card-footer">
              <router-link :to="`/jobs/${job.id}`" class="btn btn-primary">
                Xem chi tiết
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Full Stack Jobs Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>🔗 Full Stack Developer Jobs</h2>
          <p>Tuyển dụng lập trình viên Full Stack</p>
        </div>

        <div class="jobs-grid">
          <div
            v-for="job in jobsByCategory.fullstack"
            :key="job.id"
            class="job-card"
          >
            <div class="job-card-header">
              <div class="job-card-title">
                <h3>{{ job.title }}</h3>
                <div class="job-company">{{ job.company }}</div>
              </div>
              <button class="bookmark-btn">🔖</button>
            </div>

            <div class="job-card-meta">
              <div class="meta-item">
                <span class="meta-icon">📍</span>
                <span>{{ job.location }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">💰</span>
                <span>{{ job.salary }}</span>
              </div>
            </div>

            <div class="job-card-footer">
              <router-link :to="`/jobs/${job.id}`" class="btn btn-primary">
                Xem chi tiết
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile Jobs Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>📱 Mobile Developer Jobs</h2>
          <p>Tuyển dụng lập trình viên Mobile</p>
        </div>

        <div class="jobs-grid">
          <div
            v-for="job in jobsByCategory.mobile"
            :key="job.id"
            class="job-card"
          >
            <div class="job-card-header">
              <div class="job-card-title">
                <h3>{{ job.title }}</h3>
                <div class="job-company">{{ job.company }}</div>
              </div>
              <button class="bookmark-btn">🔖</button>
            </div>

            <div class="job-card-meta">
              <div class="meta-item">
                <span class="meta-icon">📍</span>
                <span>{{ job.location }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">💰</span>
                <span>{{ job.salary }}</span>
              </div>
            </div>

            <div class="job-card-footer">
              <router-link :to="`/jobs/${job.id}`" class="btn btn-primary">
                Xem chi tiết
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Companies Section -->
    <section class="featured-companies">
      <div class="container">
        <div class="section-header">
          <h2>Công ty hàng đầu</h2>
          <p>Làm việc cùng những công ty dẫn đầu trong ngành</p>
        </div>

        <div class="companies-grid">
          <div
            v-for="company in latestCompanies"
            :key="company.id"
            class="company-card"
          >
            <div class="company-card-header">
              <div class="company-logo">
                <img
                  v-if="company.logo"
                  :src="company.logo"
                  :alt="company.name"
                />
                <span v-else class="logo-fallback">{{
                  company.name.charAt(0).toUpperCase()
                }}</span>
              </div>
              <div class="company-info">
                <h3>{{ company.name }}</h3>
                <p class="company-industry">{{ company.industry }}</p>
              </div>
            </div>

            <div class="company-stats">
              <div class="company-stat">
                <span class="stat-num">{{ company.jobCount || 0 }}</span>
                <span class="stat-text">Việc làm</span>
              </div>
              <div class="company-stat">
                <span class="stat-num">{{ company.employeeCount || 0 }}</span>
                <span class="stat-text">Nhân viên</span>
              </div>
              <div class="company-stat">
                <span class="stat-num">⭐ 4.5</span>
                <span class="stat-text">Rating</span>
              </div>
            </div>

            <div class="company-location">📍 {{ company.location }}</div>

            <div class="company-actions">
              <router-link
                :to="`/companies/${company.id}`"
                class="btn btn-primary"
              >
                Xem công ty
              </router-link>
              <button class="btn btn-outline">Theo dõi</button>
            </div>
          </div>
        </div>

        <div class="view-all">
          <router-link to="/companies" class="btn btn-primary-outline">
            Xem tất cả công ty →
          </router-link>
        </div>

        <!-- Companies List Container -->
        <div class="list-container companies-list-container">
          <div class="list-header">
            <h3>🏆 Danh sách công ty hàng đầu</h3>
            <router-link to="/companies" class="view-more"
              >Xem thêm →</router-link
            >
          </div>
          <ul class="companies-list">
            <li
              v-for="(company, index) in latestCompanies.slice(0, 6)"
              :key="company.id"
              class="list-item"
            >
              <div class="list-item-left">
                <div class="list-item-num">{{ index + 1 }}</div>
                <div class="list-item-content">
                  <strong class="list-title">{{ company.name }}</strong>
                  <span class="list-company">{{ company.industry }}</span>
                </div>
              </div>
              <div class="list-item-right">
                <span class="list-meta"
                  >{{ company.jobCount || 0 }} job(s)</span
                >
                <span class="list-location">⭐ 4.5</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Company Category Sections -->
    <!-- Technology Companies Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>🖥️ Công ty Công nghệ</h2>
          <p>Những công ty công nghệ hàng đầu đang tuyển dụng</p>
        </div>

        <div class="companies-grid">
          <div
            v-for="company in companiesByCategory.technology"
            :key="company.id"
            class="company-card"
          >
            <div class="company-card-header">
              <div class="company-logo">
                <img :src="company.logo" :alt="company.name" />
              </div>
              <div class="company-info">
                <h3>{{ company.name }}</h3>
                <p class="company-industry">{{ company.industry }}</p>
              </div>
            </div>

            <div class="company-stats">
              <div class="company-stat">
                <span class="stat-num">{{ company.jobCount }}</span>
                <span class="stat-text">Việc làm</span>
              </div>
              <div class="company-stat">
                <span class="stat-num">⭐ {{ company.rating }}</span>
                <span class="stat-text">Rating</span>
              </div>
            </div>

            <div class="company-location">📍 {{ company.location }}</div>

            <div class="company-actions">
              <router-link
                :to="`/companies/${company.id}`"
                class="btn btn-primary"
              >
                Xem công ty
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Startup Companies Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>🚀 Công ty Startup</h2>
          <p>Cơ hội làm việc tại các startup đầy tiềm năng</p>
        </div>

        <div class="companies-grid">
          <div
            v-for="company in companiesByCategory.startup"
            :key="company.id"
            class="company-card"
          >
            <div class="company-card-header">
              <div class="company-logo">
                <img :src="company.logo" :alt="company.name" />
              </div>
              <div class="company-info">
                <h3>{{ company.name }}</h3>
                <p class="company-industry">{{ company.industry }}</p>
              </div>
            </div>

            <div class="company-stats">
              <div class="company-stat">
                <span class="stat-num">{{ company.jobCount }}</span>
                <span class="stat-text">Việc làm</span>
              </div>
              <div class="company-stat">
                <span class="stat-num">⭐ {{ company.rating }}</span>
                <span class="stat-text">Rating</span>
              </div>
            </div>

            <div class="company-location">📍 {{ company.location }}</div>

            <div class="company-actions">
              <router-link
                :to="`/companies/${company.id}`"
                class="btn btn-primary"
              >
                Xem công ty
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Finance Companies Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>💰 Công ty Tài chính</h2>
          <p>Các công ty tài chính, ngân hàng hàng đầu</p>
        </div>

        <div class="companies-grid">
          <div
            v-for="company in companiesByCategory.finance"
            :key="company.id"
            class="company-card"
          >
            <div class="company-card-header">
              <div class="company-logo">
                <img :src="company.logo" :alt="company.name" />
              </div>
              <div class="company-info">
                <h3>{{ company.name }}</h3>
                <p class="company-industry">{{ company.industry }}</p>
              </div>
            </div>

            <div class="company-stats">
              <div class="company-stat">
                <span class="stat-num">{{ company.jobCount }}</span>
                <span class="stat-text">Việc làm</span>
              </div>
              <div class="company-stat">
                <span class="stat-num">⭐ {{ company.rating }}</span>
                <span class="stat-text">Rating</span>
              </div>
            </div>

            <div class="company-location">📍 {{ company.location }}</div>

            <div class="company-actions">
              <router-link
                :to="`/companies/${company.id}`"
                class="btn btn-primary"
              >
                Xem công ty
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- E-commerce Companies Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>🛒 Công ty E-commerce</h2>
          <p>Những công ty e-commerce hàng đầu Việt Nam</p>
        </div>

        <div class="companies-grid">
          <div
            v-for="company in companiesByCategory.ecommerce"
            :key="company.id"
            class="company-card"
          >
            <div class="company-card-header">
              <div class="company-logo">
                <img :src="company.logo" :alt="company.name" />
              </div>
              <div class="company-info">
                <h3>{{ company.name }}</h3>
                <p class="company-industry">{{ company.industry }}</p>
              </div>
            </div>

            <div class="company-stats">
              <div class="company-stat">
                <span class="stat-num">{{ company.jobCount }}</span>
                <span class="stat-text">Việc làm</span>
              </div>
              <div class="company-stat">
                <span class="stat-num">⭐ {{ company.rating }}</span>
                <span class="stat-text">Rating</span>
              </div>
            </div>

            <div class="company-location">📍 {{ company.location }}</div>

            <div class="company-actions">
              <router-link
                :to="`/companies/${company.id}`"
                class="btn btn-primary"
              >
                Xem công ty
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Preview Section -->
    <section class="blog-preview">
      <div class="container">
        <div class="section-header">
          <h2>Blog mới nhất</h2>
          <p>Cập nhật kiến thức về tuyển dụng và phát triển sự nghiệp</p>
        </div>

        <div class="blog-grid">
          <div v-for="blog in latestBlogs" :key="blog.id" class="blog-card">
            <!-- Blog Image -->
            <div class="blog-image">
              <img
                v-if="blog.image"
                :src="blog.image"
                :alt="blog.title"
                class="blog-img"
              />
              <div v-else class="blog-img-placeholder">📰</div>
            </div>

            <!-- Blog Content -->
            <div class="blog-content">
              <div class="blog-meta">
                <span class="blog-category">{{ blog.category || "Blog" }}</span>
                <span class="blog-date">{{
                  new Date(blog.createdAt).toLocaleDateString("vi-VN")
                }}</span>
              </div>

              <h3 class="blog-title">{{ blog.title }}</h3>

              <p class="blog-excerpt">
                {{
                  blog.excerpt ||
                  blog.description ||
                  "Bài viết thú vị đang chờ bạn..."
                }}
              </p>

              <div class="blog-footer">
                <div class="blog-author">
                  <span class="author-avatar">👤</span>
                  <span class="author-name">{{ blog.author || "Admin" }}</span>
                </div>
                <router-link :to="`/blog/${blog.id}`" class="read-more">
                  Đọc tiếp →
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="view-all">
          <router-link to="/blog" class="btn btn-primary-outline">
            Xem tất cả bài viết →
          </router-link>
        </div>

        <!-- Blog List Container -->
        <div class="list-container blog-list-container">
          <div class="list-header">
            <h3>📰 Danh sách blog mới nhất</h3>
            <router-link to="/blog" class="view-more">Xem thêm →</router-link>
          </div>
          <ul class="blogs-list">
            <li
              v-for="(blog, index) in latestBlogs.slice(0, 6)"
              :key="blog.id"
              class="list-item"
            >
              <div class="list-item-left">
                <div class="list-item-num">{{ index + 1 }}</div>
                <div class="list-item-content">
                  <strong class="list-title">{{ blog.title }}</strong>
                  <span class="list-company">{{
                    blog.category || "Blog"
                  }}</span>
                </div>
              </div>
              <div class="list-item-right">
                <span class="list-meta">{{ blog.author || "Admin" }}</span>
                <span class="list-date">{{
                  new Date(blog.createdAt).toLocaleDateString("vi-VN")
                }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Blog Categories Sections -->
    <!-- Job Tips Blog Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>💡 Mẹo Tìm Việc</h2>
          <p>Những mẹo hữu ích để tìm kiếm việc làm hiệu quả</p>
        </div>

        <div class="blog-grid">
          <div
            v-for="blog in blogsByCategory.jobTips"
            :key="blog.id"
            class="blog-card"
          >
            <div class="blog-image">
              <div class="blog-img-placeholder">📝</div>
            </div>

            <div class="blog-content">
              <div class="blog-meta">
                <span class="blog-category">{{ blog.category }}</span>
              </div>

              <h3 class="blog-title">{{ blog.title }}</h3>

              <div class="blog-footer">
                <div class="blog-author">
                  <span class="author-avatar">👤</span>
                  <span class="author-name">{{ blog.author }}</span>
                </div>
                <router-link :to="`/blog/${blog.id}`" class="read-more">
                  Đọc tiếp →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Career Guidance Blog Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>🎯 Hướng Nghiệp</h2>
          <p>Hướng dẫn phát triển sự nghiệp của bạn</p>
        </div>

        <div class="blog-grid">
          <div
            v-for="blog in blogsByCategory.career"
            :key="blog.id"
            class="blog-card"
          >
            <div class="blog-image">
              <div class="blog-img-placeholder">📊</div>
            </div>

            <div class="blog-content">
              <div class="blog-meta">
                <span class="blog-category">{{ blog.category }}</span>
              </div>

              <h3 class="blog-title">{{ blog.title }}</h3>

              <div class="blog-footer">
                <div class="blog-author">
                  <span class="author-avatar">👤</span>
                  <span class="author-name">{{ blog.author }}</span>
                </div>
                <router-link :to="`/blog/${blog.id}`" class="read-more">
                  Đọc tiếp →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Salary Guide Blog Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>💰 Mức Lương & Thương Lượng</h2>
          <p>Hướng dẫn về mức lương và thương lượng</p>
        </div>

        <div class="blog-grid">
          <div
            v-for="blog in blogsByCategory.salaryGuide"
            :key="blog.id"
            class="blog-card"
          >
            <div class="blog-image">
              <div class="blog-img-placeholder">💵</div>
            </div>

            <div class="blog-content">
              <div class="blog-meta">
                <span class="blog-category">{{ blog.category }}</span>
              </div>

              <h3 class="blog-title">{{ blog.title }}</h3>

              <div class="blog-footer">
                <div class="blog-author">
                  <span class="author-avatar">👤</span>
                  <span class="author-name">{{ blog.author }}</span>
                </div>
                <router-link :to="`/blog/${blog.id}`" class="read-more">
                  Đọc tiếp →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Blog Section -->
    <section class="category-section">
      <div class="container">
        <div class="section-header">
          <h2>🚀 Xu Hướng Công Nghệ</h2>
          <p>Cập nhật xu hướng công nghệ và thị trường</p>
        </div>

        <div class="blog-grid">
          <div
            v-for="blog in blogsByCategory.technology"
            :key="blog.id"
            class="blog-card"
          >
            <div class="blog-image">
              <div class="blog-img-placeholder">🔬</div>
            </div>

            <div class="blog-content">
              <div class="blog-meta">
                <span class="blog-category">{{ blog.category }}</span>
              </div>

              <h3 class="blog-title">{{ blog.title }}</h3>

              <div class="blog-footer">
                <div class="blog-author">
                  <span class="author-avatar">👤</span>
                  <span class="author-name">{{ blog.author }}</span>
                </div>
                <router-link :to="`/blog/${blog.id}`" class="read-more">
                  Đọc tiếp →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon">💼</div>
            <div class="stat-content">
              <h3>{{ stats.totalJobs || 0 }}</h3>
              <p>Việc làm</p>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">🏢</div>
            <div class="stat-content">
              <h3>{{ stats.totalCompanies || 0 }}</h3>
              <p>Công ty</p>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">👥</div>
            <div class="stat-content">
              <h3>{{ stats.totalUsers || 0 }}</h3>
              <p>Người dùng</p>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">📝</div>
            <div class="stat-content">
              <h3>{{ stats.totalApplications || 0 }}</h3>
              <p>Đơn ứng tuyển</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Sẵn sàng bắt đầu sự nghiệp của bạn?</h2>
          <p>Đăng ký ngay hôm nay để tìm việc làm phù hợp với bạn</p>
          <div class="cta-actions">
            <router-link to="/register" class="btn btn-cta-primary">
              Đăng ký ngay
            </router-link>
            <router-link to="/login" class="btn btn-cta-secondary">
              Đã có tài khoản? Đăng nhập
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  background: #ffffff;
  margin: 0;
  padding: 0;
}

/* ==================== HERO SECTION ==================== */
.hero {
  background: linear-gradient(135deg, #ffa54d 0%, #ff8c42 50%, #ff7a3d 100%);
  position: relative;
  overflow: hidden;
  padding: 80px 0 60px;
  color: white;
  min-height: 600px;
  display: flex;
  align-items: center;
}

.hero-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.15;
  z-index: 0;
}

.hero-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
}

.hero-circle-1 {
  width: 200px;
  height: 200px;
  top: 20px;
  left: 10%;
}

.hero-circle-2 {
  width: 150px;
  height: 150px;
  top: 200px;
  right: 5%;
}

.hero-circle-3 {
  width: 100px;
  height: 100px;
  bottom: 10%;
  left: 25%;
}

.hero-circle-4 {
  width: 180px;
  height: 180px;
  bottom: 5%;
  right: 15%;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  position: relative;
  z-index: 1;
}

.hero-content {
  text-align: center;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
  line-height: 1.2;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.title-highlight {
  display: block;
  font-size: 3.5rem;
  color: #fff;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin: 0 0 2.5rem;
  opacity: 0.95;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Search Box */
.search-box {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 3rem;
}

.search-input-group {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 12px;
  align-items: center;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 1.2rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  background: white;
  color: #1f2937;
  font-family: inherit;
}

.search-input:focus {
  border-color: #ff8c42;
  box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a3d 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);
  height: 48px;
  white-space: nowrap;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4);
}

/* Popular Searches */
.popular-searches {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.popular-label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.popular-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.popular-tag {
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.9);
  color: #ff8c42;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 140, 66, 0.2);
}

.popular-tag:hover {
  background: white;
  transform: scale(1.05);
}

/* Hero Stats */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.stat-card:hover {
  transform: translateY(-8px);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: block;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: #ff8c42;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ==================== FEATURED JOBS SECTION ==================== */
.featured-jobs {
  padding: 80px 0;
  background: #ffffff;
  width: 100%;
}

.featured-jobs .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  margin: 0 0 1rem;
  color: #1f2937;
  font-weight: 800;
}

.section-header p {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.job-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
}

.job-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff8c42 0%, #ff7a3d 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.job-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(255, 140, 66, 0.15);
  border-color: #ff8c42;
}

.job-card:hover::before {
  transform: scaleX(1);
}

.job-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.job-card-title h3 {
  margin: 0 0 0.5rem;
  font-size: 1.3rem;
  color: #1f2937;
  font-weight: 700;
}

.job-company {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.bookmark-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.bookmark-btn:hover {
  transform: scale(1.2);
}

.job-card-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 0;
  border-top: 1px solid #f3f4f6;
  border-bottom: 1px solid #f3f4f6;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #4b5563;
}

.meta-icon {
  font-size: 1.1rem;
}

.job-card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: #f0f4f8;
  color: #4b5563;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
}

.tag.urgent {
  background: #fef2f2;
  color: #dc2626;
}

.job-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}

.posted-time {
  font-size: 0.8rem;
  color: #9ca3af;
}

.view-all {
  text-align: center;
  margin-top: 40px;
}

/* ==================== CATEGORY SECTIONS ==================== */
.category-section {
  padding: 60px 0;
  background: white;
  width: 100%;
  border-top: 1px solid #f0f0f0;
}

.category-section:nth-child(even) {
  background: #f9fafb;
}

.category-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ==================== FEATURED COMPANIES SECTION ==================== */
.featured-companies {
  padding: 80px 0;
  background: #f8fafc;
  width: 100%;
}

.featured-companies .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.companies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.company-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.company-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(255, 140, 66, 0.15);
  border-color: #ff8c42;
}

.company-card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.company-logo {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a3d 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);
  overflow: hidden;
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.3rem;
  color: #1f2937;
  font-weight: 700;
}

.company-industry {
  margin: 0;
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.company-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
}

.company-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-num {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ff8c42;
}

.stat-text {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
}

.company-location {
  font-size: 0.9rem;
  color: #6b7280;
  padding: 8px 0;
}

.company-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

/* ==================== BLOG PREVIEW SECTION ==================== */
.blog-preview {
  padding: 80px 0;
  background: white;
  width: 100%;
}

.blog-preview .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.blog-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(255, 140, 66, 0.15);
  border-color: #ff8c42;
}

.blog-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f0f4f8 0%, #e5e7eb 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-img {
  transform: scale(1.05);
}

.blog-img-placeholder {
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
}

.blog-category {
  display: inline-block;
  padding: 4px 12px;
  background: #fef3c7;
  color: #d97706;
  border-radius: 16px;
  font-weight: 600;
}

.blog-date {
  color: #9ca3af;
  font-weight: 500;
}

.blog-title {
  margin: 0;
  font-size: 1.2rem;
  color: #1f2937;
  font-weight: 700;
  line-height: 1.4;
}

.blog-excerpt {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
}

.blog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
}

.blog-author {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #6b7280;
}

.author-avatar {
  font-size: 1.4rem;
}

.author-name {
  font-weight: 600;
}

.read-more {
  color: #ff8c42;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.read-more:hover {
  color: #ff7a3d;
  text-decoration: underline;
}

/* ==================== LIST CONTAINERS ==================== */
.list-container {
  margin-top: 60px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f3f4f6;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.list-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #1f2937;
  font-weight: 700;
}

.view-more {
  color: #ff8c42;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.view-more:hover {
  color: #ff7a3d;
  transform: translateX(3px);
}

.jobs-list,
.companies-list,
.blogs-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item:hover {
  background-color: #fafafa;
  padding: 16px 12px;
  border-radius: 8px;
  transform: translateX(4px);
}

.list-item-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.list-item-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ff8c42, #ff7a3d);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.list-item-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.list-title {
  font-size: 1rem;
  color: #1f2937;
  margin: 0;
  display: block;
  font-weight: 600;
}

.list-company {
  font-size: 0.85rem;
  color: #9ca3af;
  display: block;
}

.list-item-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.list-salary,
.list-location,
.list-meta,
.list-date {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
}

.list-salary {
  color: #ff8c42;
  font-weight: 700;
}

.list-meta {
  color: #9ca3af;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .list-container {
    padding: 24px;
  }

  .list-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .list-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .list-item-right {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

/* ==================== STATS SECTION ==================== */
.stats {
  padding: 80px 0;
  background: white;
  width: 100%;
}

.stats .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.stat-item {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-8px);
  border-color: #ff8c42;
  box-shadow: 0 12px 24px rgba(255, 140, 66, 0.15);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.stat-content h3 {
  font-size: 2.2rem;
  margin: 0 0 0.5rem;
  color: #ff8c42;
  font-weight: 800;
}

.stat-content p {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
  font-weight: 600;
}

/* ==================== CTA SECTION ==================== */
.cta {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 20% 50%,
      rgba(255, 140, 66, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 140, 66, 0.05) 0%,
      transparent 50%
    );
  z-index: 0;
}

.cta .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin: 0 0 1rem;
  font-weight: 800;
}

.cta-content p {
  font-size: 1.2rem;
  margin: 0 0 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

/* ==================== BUTTONS ==================== */
.btn {
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a3d 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4);
}

.btn-primary-outline {
  background: transparent;
  color: #ff8c42;
  border: 2px solid #ff8c42;
  font-weight: 600;
}

.btn-primary-outline:hover {
  background: #ff8c42;
  color: white;
}

.btn-outline {
  background: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  font-weight: 600;
}

.btn-outline:hover {
  background: #1f2937;
  color: white;
  border-color: #1f2937;
}

.btn-cta-primary {
  background: #ff8c42;
  color: white;
  padding: 14px 36px;
  font-size: 1.05rem;
  box-shadow: 0 4px 16px rgba(255, 140, 66, 0.4);
}

.btn-cta-primary:hover {
  background: #ff7a3d;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 140, 66, 0.5);
}

.btn-cta-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 12px 32px;
}

.btn-cta-secondary:hover {
  background: white;
  color: #1f2937;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 1200px) {
  .hero-container,
  .container {
    padding: 0 1.5rem;
  }

  .jobs-grid,
  .companies-grid,
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 0 40px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .title-highlight {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    padding: 0 1rem;
  }

  .search-input-group {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .search-btn {
    grid-column: 1;
    width: 100%;
    padding: 14px 24px;
  }

  .popular-searches {
    flex-direction: column;
    gap: 8px;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-card {
    padding: 20px;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .section-header p {
    font-size: 1rem;
  }

  .jobs-grid,
  .companies-grid,
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-content h2 {
    font-size: 1.8rem;
  }

  .cta-content p {
    font-size: 1.1rem;
  }

  .cta-actions {
    flex-direction: column;
    width: 100%;
  }

  .cta-actions .btn {
    width: 100%;
  }

  .featured-jobs,
  .featured-companies,
  .blog-preview,
  .category-section,
  .stats,
  .cta {
    padding: 60px 0;
  }

  .hero-container,
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 0 30px;
    min-height: 400px;
  }

  .hero-container {
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .title-highlight {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .search-box {
    padding: 16px;
  }

  .search-input {
    padding: 10px 10px 10px 36px;
    font-size: 0.9rem;
  }

  .search-btn {
    padding: 12px 20px;
    font-size: 0.9rem;
  }

  .stat-card {
    padding: 16px 12px;
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .stat-label {
    font-size: 0.8rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .section-header p {
    font-size: 0.9rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .job-card,
  .company-card {
    padding: 16px;
  }

  .blog-card {
    padding: 0;
  }

  .blog-content {
    padding: 16px;
  }

  .blog-image {
    height: 180px;
  }

  .job-card-title h3 {
    font-size: 1.1rem;
  }

  .company-info h3 {
    font-size: 1.1rem;
  }

  .blog-title {
    font-size: 1.1rem;
  }

  .cta-content h2 {
    font-size: 1.5rem;
  }

  .cta-content p {
    font-size: 1rem;
  }

  .btn-cta-primary,
  .btn-cta-secondary {
    padding: 12px 24px;
    font-size: 0.95rem;
  }

  .featured-jobs,
  .featured-companies,
  .blog-preview,
  .category-section,
  .stats,
  .cta {
    padding: 40px 0;
  }

  .popular-tag {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
}
</style>
