<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const savedJobs = ref(new Set())
const savedCompanies = ref(new Set())
const savedPosts = ref(new Set())

const stats = [
  { value: '10,000+', label: 'Việc làm' },
  { value: '5,000+', label: 'Công ty' },
  { value: '50,000+', label: 'Ứng viên' }
]

const jobCategories = [
  { id: 1, name: 'Công nghệ thông tin', count: 2547, icon: '💻' },
  { id: 2, name: 'Thiết kế - Đồ họa', count: 1234, icon: '🎨' },
  { id: 3, name: 'Kinh doanh - Bán hàng', count: 1876, icon: '📈' },
  { id: 4, name: 'Marketing - PR', count: 987, icon: '📢' },
  { id: 5, name: 'Nhân sự', count: 654, icon: '👥' },
  { id: 6, name: 'Kế toán - Tài chính', count: 823, icon: '📊' },
  { id: 7, name: 'Kỹ thuật - Công nghệ', count: 1432, icon: '🔧' },
  { id: 8, name: 'Y tế - Chăm sóc sức khỏe', count: 765, icon: '❤️' }
]

const featuredJobs = [
  { id: 1, title: 'Senior Frontend Developer', company: 'Tech Solutions Vietnam', location: 'Hà Nội', salary: '25-35 triệu', type: 'Full-time', level: 'Senior', tags: ['ReactJS', 'TypeScript'], posted: '2 giờ trước', featured: true, urgent: true },
  { id: 2, title: 'UI/UX Designer', company: 'Creative Studio', location: 'Hồ Chí Minh', salary: '15-25 triệu', type: 'Full-time', level: 'Middle', tags: ['Figma', 'Adobe XD'], posted: '5 giờ trước', featured: true, urgent: false },
  { id: 3, title: 'Backend Developer', company: 'FinTech Innovations', location: 'Đà Nẵng', salary: '20-30 triệu', type: 'Full-time', level: 'Middle', tags: ['NodeJS', 'MongoDB'], posted: '1 ngày trước', featured: false, urgent: true },
  { id: 4, title: 'Product Manager', company: 'E-commerce Giant', location: 'Hà Nội', salary: '30-45 triệu', type: 'Full-time', level: 'Senior', tags: ['Agile', 'Scrum'], posted: '1 ngày trước', featured: true, urgent: false },
  { id: 5, title: 'Marketing Executive', company: 'Digital Agency Pro', location: 'Hồ Chí Minh', salary: '12-18 triệu', type: 'Full-time', level: 'Junior', tags: ['SEO', 'Social Media'], posted: '2 ngày trước', featured: false, urgent: false },
  { id: 6, title: 'Data Analyst', company: 'Analytics Corp', location: 'Remote', salary: '18-28 triệu', type: 'Remote', level: 'Middle', tags: ['Python', 'SQL'], posted: '3 ngày trước', featured: false, urgent: false }
]

const featuredCompanies = [
  { id: 1, name: 'FPT Software', industry: 'Công nghệ thông tin', location: 'Hà Nội', jobs: 127, featured: true, desc: 'FPT Software là công ty công nghệ hàng đầu Việt Nam với hơn 35.000 nhân viên.', logo: 'FPT' },
  { id: 2, name: 'VNG Corporation', industry: 'Game & Entertainment', location: 'Hồ Chí Minh', jobs: 89, featured: true, desc: 'VNG Corporation - Công ty game và dịch vụ số hàng đầu Đông Nam Á.', logo: 'VNG' },
  { id: 3, name: 'Tiki', industry: 'E-commerce', location: 'Hồ Chí Minh', jobs: 54, featured: false, desc: 'Tiki - Sàn thương mại điện tử hàng đầu Việt Nam.', logo: 'TIKI' },
  { id: 4, name: 'Grab Vietnam', industry: 'Technology', location: 'Hà Nội', jobs: 76, featured: true, desc: 'Grab - Nền tảng di động hàng đầu Đông Nam Á.', logo: 'GRAB' },
  { id: 5, name: 'Sendo', industry: 'E-commerce', location: 'Hà Nội', jobs: 43, featured: false, desc: 'Sendo - Sàn TMĐT uy tín tại Việt Nam.', logo: 'SENDO' },
  { id: 6, name: 'MoMo', industry: 'FinTech', location: 'Hồ Chí Minh', jobs: 62, featured: true, desc: 'MoMo - Ví điện tử hàng đầu Việt Nam.', logo: 'MOMO' }
]

const blogPosts = [
  {
    id: 1,
    title: '10 Kỹ năng mềm quan trọng giúp bạn thành công trong công việc',
    excerpt: 'Khám phá những kỹ năng thiết yếu mà mọi chuyên gia cần có để phát triển sự nghiệp trong thời đại số...',
    category: 'Kỹ năng',
    date: '25/11/2024',
    readTime: '5 phút đọc',
    image: 'https://images.unsplash.com/photo-1722149493669-30098ef78f9f?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Cách viết CV xin việc ấn tượng thu hút nhà tuyển dụng',
    excerpt: 'Hướng dẫn chi tiết từng bước tạo một bản CV chuyên nghiệp, nổi bật và tăng cơ hội được nhận vào làm...',
    category: 'CV & Phỏng vấn',
    date: '23/11/2024',
    readTime: '7 phút đọc',
    image: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Xu hướng tuyển dụng IT năm 2024: Những vị trí hot nhất',
    excerpt: 'Phân tích thị trường lao động IT Việt Nam và dự báo những công nghệ, vị trí việc làm được săn đón nhất...',
    category: 'Xu hướng',
    date: '20/11/2024',
    readTime: '6 phút đọc',
    image: 'https://images.unsplash.com/photo-1624555130858-7ea5b8192c49?w=600&h=400&fit=crop'
  }
]

const toggleSaveJob = (jobId) => {
  if (savedJobs.value.has(jobId)) {
    savedJobs.value.delete(jobId)
  } else {
    savedJobs.value.add(jobId)
  }
}

const toggleSaveCompany = (companyId) => {
  if (savedCompanies.value.has(companyId)) {
    savedCompanies.value.delete(companyId)
  } else {
    savedCompanies.value.add(companyId)
  }
}

const toggleSavePost = (postId) => {
  if (savedPosts.value.has(postId)) {
    savedPosts.value.delete(postId)
  } else {
    savedPosts.value.add(postId)
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <Header />
    <main class="flex-1">
      <section class="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20 lg:py-28">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
        </div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-6">
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-[#f26b38] rounded-full">
                <span class="text-sm">1000+ việc làm mới mỗi ngày</span>
              </div>
              <h1 class="text-4xl lg:text-6xl font-bold">
                Tìm công việc<br />
                <span class="bg-gradient-to-r from-[#f26b38] to-[#e05a27] bg-clip-text text-transparent">mơ ước của bạn</span>
              </h1>
              <p class="text-lg text-gray-600 max-w-xl">Khám phá hàng nghìn cơ hội nghề nghiệp từ các công ty hàng đầu.</p>
              <div class="flex flex-wrap gap-4">
                <button class="px-6 py-3 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg font-medium">Tìm việc ngay</button>
                <button class="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400">Tạo CV miễn phí</button>
              </div>
              <div class="flex flex-wrap gap-8 pt-8">
                <div v-for="stat in stats" :key="stat.label">
                  <div class="text-3xl font-bold text-[#f26b38]">{{ stat.value }}</div>
                  <div class="text-sm text-gray-600">{{ stat.label }}</div>
                </div>
              </div>
            </div>
            <div class="relative hidden lg:block">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1589979034086-5885b60c8f59?w=600&h=500&fit=crop" alt="Workspace" class="w-full h-[500px] object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent"></div>
              </div>
              <div class="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">
                <div class="flex items-center gap-3">
                  <div class="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span class="text-xl">✓</span>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Ứng tuyển thành công</div>
                    <div class="font-bold">+1,247 hôm nay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 lg:py-24">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold mb-4">Khám phá theo ngành nghề</h2>
            <p class="text-lg text-gray-600">Tìm kiếm cơ hội việc làm phù hợp với chuyên môn và đam mê của bạn</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            <button v-for="cat in jobCategories" :key="cat.id" class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:border-[#f26b38] hover:bg-orange-50 transition-all text-left">
              <div class="text-3xl mb-3">{{ cat.icon }}</div>
              <h3 class="font-medium hover:text-[#f26b38] mb-1">{{ cat.name }}</h3>
              <p class="text-sm text-gray-500">{{ cat.count.toLocaleString() }} việc làm</p>
            </button>
          </div>
        </div>
      </section>

      <section class="py-16 lg:py-24 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold mb-2">Việc làm nổi bật</h2>
            <p class="text-lg text-gray-600">Cơ hội nghề nghiệp tốt nhất từ các công ty hàng đầu</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="job in featuredJobs" :key="job.id" class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:border-[#f26b38] transition-all relative">
              <!-- Header: Badge + Logo + Info -->
              <div class="flex items-start gap-3 mb-4">
                <!-- Logo -->
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-600 text-lg font-bold flex-shrink-0 flex-shrink-0">💼</div>
                
                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span v-if="job.featured" class="px-2 py-0.5 bg-gradient-to-r from-[#f26b38] to-[#e05a27] text-white text-xs rounded-full">Nổi bật</span>
                    <span v-if="job.urgent" class="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">Gấp</span>
                  </div>
                  <h3 class="text-lg font-medium hover:text-[#f26b38] truncate">{{ job.title }}</h3>
                  <p class="text-sm text-gray-600 truncate">{{ job.company }}</p>
                </div>
                
                <!-- Save Button -->
                <button @click="toggleSaveJob(job.id)" class="text-gray-400 hover:text-[#f26b38] flex-shrink-0">
                  <svg class="h-5 w-5" :fill="savedJobs.has(job.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                </button>
              </div>
              
              <!-- Details -->
              <div class="space-y-2 mb-4">
                <p class="text-sm text-gray-600">📍 {{ job.location }}</p>
                <p class="text-sm text-gray-600">💰 {{ job.salary }}</p>
                <p class="text-sm text-gray-600">💼 {{ job.type }} • {{ job.level }}</p>
              </div>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tag in job.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{{ tag }}</span>
              </div>
              
              <!-- Footer -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <span class="text-sm text-gray-500">{{ job.posted }}</span>
                <a href="#" class="px-4 py-2 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg text-sm font-medium">Ứng tuyển</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 lg:py-24">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold mb-4">Công ty hàng đầu</h2>
            <p class="text-lg text-gray-600">Khám phá các nhà tuyển dụng uy tín</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="company in featuredCompanies" :key="company.id" class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:border-[#f26b38] transition-all relative cursor-pointer group">
              <!-- Header: Logo + Info -->
              <div class="flex items-start gap-3 mb-4">
                <!-- Logo -->
                <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-[#f26b38] to-[#e05a27] flex items-center justify-center text-white text-xl font-bold flex-shrink-0 flex-shrink-0">{{ company.logo }}</div>
                
                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span v-if="company.featured" class="px-2 py-0.5 bg-gradient-to-r from-[#f26b38] to-[#e05a27] text-white text-xs rounded-full">Top</span>
                  </div>
                  <h3 class="text-lg font-bold hover:text-[#f26b38] truncate">{{ company.name }}</h3>
                  <p class="text-sm text-[#f26b38] font-medium truncate">{{ company.industry }}</p>
                </div>
                
                <!-- Save Button -->
                <button @click="toggleSaveCompany(company.id)" class="text-gray-400 hover:text-[#f26b38] transition-colors flex-shrink-0">
                  <svg class="h-5 w-5" :fill="savedCompanies.has(company.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                </button>
              </div>
              
              <!-- Description -->
              <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ company.desc }}</p>
              
              <!-- Meta -->
              <div class="space-y-1 mb-4">
                <p class="text-sm text-gray-600">📍 {{ company.location }}</p>
                <p class="text-sm text-gray-600">💼 {{ company.jobs }} việc làm đang tuyển</p>
              </div>
              
              <!-- Footer Buttons -->
              <div class="flex gap-3 pt-4 border-t border-gray-100">
                <a href="#" class="flex-1 text-center px-4 py-2 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg text-sm font-medium transition-colors">Xem việc làm</a>
                <a href="#" class="flex-1 text-center px-4 py-2 border border-gray-300 hover:bg-orange-50 text-gray-700 rounded-lg text-sm transition-colors">Xem profile</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Blog Section -->
      <section class="py-16 lg:py-24 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between mb-12">
            <div>
              <h2 class="text-3xl lg:text-4xl mb-2">Blog & Cẩm nang nghề nghiệp</h2>
              <p class="text-lg text-gray-600">Kiến thức và kinh nghiệm hữu ích cho sự nghiệp của bạn</p>
            </div>
            <router-link to="/blog" class="hidden md:flex px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 text-sm">Xem tất cả</router-link>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article v-for="post in blogPosts" :key="post.id" class="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div class="relative h-48 overflow-hidden">
                <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div class="absolute top-4 left-4">
                  <span class="px-2 py-1 bg-white text-gray-900 text-xs rounded-full">{{ post.category }}</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-lg mb-2 line-clamp-2 group-hover:text-[#f26b38] transition-colors">{{ post.title }}</h3>
                <p class="text-sm text-gray-600 mb-4 line-clamp-3">{{ post.excerpt }}</p>
                <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>📅 {{ post.date }}</span>
                  <span>🕐 {{ post.readTime }}</span>
                </div>
                <router-link to="/blog" class="text-[#f26b38] hover:text-[#e05a27] font-medium text-sm inline-flex items-center gap-1">
                  Đọc thêm
                  <svg class="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </router-link>
              </div>
            </article>
          </div>
          <div class="text-center mt-8 md:hidden">
            <router-link to="/blog" class="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 text-sm w-full inline-block">Xem tất cả bài viết</router-link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>