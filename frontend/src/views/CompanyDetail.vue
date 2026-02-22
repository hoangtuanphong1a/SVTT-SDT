<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

// Mock company data
const company = ref({
  id: 1,
  name: 'FPT Software',
  logo: 'FPT',
  industry: 'Công nghệ thông tin',
  size: '25.000+ nhân viên',
  location: 'Hà Nội',
  address: 'Tòa nhà FPT, Phạm Hùng, Cầu Giấy, Hà Nội',
  website: 'https://fptsoftware.com',
  description: `FPT Software là công ty công nghệ thông tin hàng đầu Việt Nam, thành lập năm 1999. Với hơn 25.000 nhân viên, chúng tôi cung cấp các giải pháp công nghệ toàn diện cho khách hàng trên toàn thế giới.

FPT Software có mạng lưới chi nhánh tại 27 quốc gia với hơn 60 văn phòng, phục vụ khách hàng tại Nhật Bản, Hoa Kỳ, châu Âu, Trung Đông, châu Úc và các thị trường khác.`,
  founded: 1999,
  revenue: 'Hơn 1.5 tỷ USD',
  benefits: [
    'Lương tháng 13',
    'Bảo hiểm xã hội đầy đủ',
    'Phụ cấp ăn trưa',
    'Hỗ trợ di chuyển',
    'Đào tạo chuyên sâu',
    'Cơ hội đi nước ngoài',
    'Lịch nghỉ phép linh hoạt',
    'Công việc ổn định'
  ],
  culture: [
    'Môi trường năng động',
    'Văn hóa sáng tạo',
    'Công bằng, minh bạch',
    'Phát triển nghề nghiệp',
    'Cân bằng công việc - cuộc sống'
  ],
  workingTime: 'Thứ 2 - Thứ 6 (8h/ngày)',
  jobsCount: 127
})

const jobs = ref([
  {
    id: 1,
    title: 'Senior Frontend Developer',
    location: 'Hà Nội',
    salary: '25-35 triệu',
    type: 'Full-time',
    level: 'Senior',
    tags: ['ReactJS', 'TypeScript'],
    posted: '2 giờ trước',
    featured: true
  },
  {
    id: 2,
    title: 'Backend Developer (Java)',
    location: 'Hà Nội',
    salary: '20-30 triệu',
    type: 'Full-time',
    level: 'Middle',
    tags: ['Java', 'Spring Boot'],
    posted: '5 giờ trước',
    featured: false
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    location: 'Hồ Chí Minh',
    salary: '22-32 triệu',
    type: 'Full-time',
    level: 'Middle',
    tags: ['AWS', 'Docker', 'Kubernetes'],
    posted: '1 ngày trước',
    featured: true
  }
])

const photos = ref([
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop'
])

const isFollowing = ref(false)
const activeTab = ref('overview')

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Company Header -->
    <section class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-5xl mx-auto">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <router-link to="/" class="hover:text-[#f26b38]">Trang chủ</router-link>
            <span>/</span>
            <router-link to="/companies" class="hover:text-[#f26b38]">Công ty</router-link>
            <span>/</span>
            <span class="text-gray-700">{{ company.name }}</span>
          </nav>
          
          <div class="flex flex-col md:flex-row gap-6 items-start">
            <!-- Company Logo -->
            <div class="w-24 h-24 rounded-xl bg-gradient-to-br from-[#f26b38] to-[#e05a27] flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              {{ company.logo }}
            </div>
            
            <!-- Company Info -->
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <h1 class="text-3xl font-bold mb-2">{{ company.name }}</h1>
                  <p class="text-[#f26b38] font-medium mb-3">{{ company.industry }}</p>
                  <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span class="flex items-center gap-1">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {{ company.location }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                      {{ company.size }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                      </svg>
                      Thành lập {{ company.founded }}
                    </span>
                  </div>
                </div>
                
                <div class="flex gap-2">
                  <button 
                    @click="toggleFollow"
                    class="px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors"
                    :class="isFollowing ? 'bg-[#f26b38] text-white border-[#f26b38]' : 'border-gray-300 hover:border-[#f26b38] hover:text-[#f26b38]'"
                  >
                    <svg class="h-5 w-5" :fill="isFollowing ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                    </svg>
                    {{ isFollowing ? 'Đã theo dõi' : 'Theo dõi' }}
                  </button>
                  <a 
                    :href="company.website" 
                    target="_blank"
                    class="px-4 py-2 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg transition-colors"
                  >
                    Truy cập website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs -->
    <section class="bg-white border-b border-gray-200 sticky top-16 z-30">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="flex gap-8">
            <button 
              @click="activeTab = 'overview'"
              class="py-4 font-medium transition-colors border-b-2"
              :class="activeTab === 'overview' ? 'border-[#f26b38] text-[#f26b38]' : 'border-transparent text-gray-600 hover:text-gray-900'"
            >
              Tổng quan
            </button>
            <button 
              @click="activeTab = 'jobs'"
              class="py-4 font-medium transition-colors border-b-2"
              :class="activeTab === 'jobs' ? 'border-[#f26b38] text-[#f26b38]' : 'border-transparent text-gray-600 hover:text-gray-900'"
            >
              Việc làm ({{ company.jobsCount }})
            </button>
            <button 
              @click="activeTab = 'photos'"
              class="py-4 font-medium transition-colors border-b-2"
              :class="activeTab === 'photos' ? 'border-[#f26b38] text-[#f26b38]' : 'border-transparent text-gray-600 hover:text-gray-900'"
            >
              Hình ảnh
            </button>
            <button 
              @click="activeTab = 'reviews'"
              class="py-4 font-medium transition-colors border-b-2"
              :class="activeTab === 'reviews' ? 'border-[#f26b38] text-[#f26b38]' : 'border-transparent text-gray-600 hover:text-gray-900'"
            >
              Đánh giá
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <!-- Overview Tab -->
          <div v-show="activeTab === 'overview'" class="grid lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-6">
              <!-- About -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h2 class="text-xl font-bold mb-4">Giới thiệu công ty</h2>
                <div class="text-gray-600 whitespace-pre-line">{{ company.description }}</div>
              </div>
              
              <!-- Benefits -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h2 class="text-xl font-bold mb-4">Phúc lợi</h2>
                <div class="grid grid-cols-2 gap-3">
                  <div v-for="benefit in company.benefits" :key="benefit" class="flex items-center gap-2">
                    <span class="text-[#f26b38]">✓</span>
                    <span class="text-gray-700">{{ benefit }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Culture -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h2 class="text-xl font-bold mb-4">Văn hóa công ty</h2>
                <div class="grid grid-cols-2 gap-3">
                  <div v-for="item in company.culture" :key="item" class="flex items-center gap-2">
                    <span class="text-[#f26b38]">★</span>
                    <span class="text-gray-700">{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Quick Info -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h3 class="font-bold mb-4">Thông tin nhanh</h3>
                <div class="space-y-4">
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Quy mô</div>
                    <div class="font-medium">{{ company.size }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Ngành</div>
                    <div class="font-medium">{{ company.industry }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Quốc gia</div>
                    <div class="font-medium">Việt Nam</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Năm thành lập</div>
                    <div class="font-medium">{{ company.founded }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Doanh thu</div>
                    <div class="font-medium">{{ company.revenue }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Giờ làm việc</div>
                    <div class="font-medium">{{ company.workingTime }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Location -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h3 class="font-bold mb-4">Địa chỉ</h3>
                <p class="text-gray-600 mb-4">{{ company.address }}</p>
                <div class="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span class="text-gray-400">Bản đồ</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Jobs Tab -->
          <div v-show="activeTab === 'jobs'" class="space-y-4">
            <h2 class="text-xl font-bold mb-6">Việc làm tại {{ company.name }}</h2>
            <div v-for="job in jobs" :key="job.id" class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-600 text-lg font-bold flex-shrink-0">
                  💼
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span v-if="job.featured" class="px-2 py-0.5 bg-gradient-to-r from-[#f26b38] to-[#e05a27] text-white text-xs rounded-full">Nổi bật</span>
                  </div>
                  <h3 class="text-lg font-medium hover:text-[#f26b38]">{{ job.title }}</h3>
                  <div class="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                    <span>📍 {{ job.location }}</span>
                    <span>💰 {{ job.salary }}</span>
                    <span>💼 {{ job.type }} • {{ job.level }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2 mt-3">
                    <span v-for="tag in job.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <router-link :to="`/jobs/${job.id}`" class="px-4 py-2 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg text-sm font-medium">
                  Xem chi tiết
                </router-link>
              </div>
            </div>
          </div>
          
          <!-- Photos Tab -->
          <div v-show="activeTab === 'photos'" class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(photo, index) in photos" :key="index" class="aspect-video rounded-lg overflow-hidden">
              <img :src="photo" :alt="`Photo ${index + 1}`" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          
          <!-- Reviews Tab -->
          <div v-show="activeTab === 'reviews'" class="text-center py-12">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-4xl">💬</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Chưa có đánh giá</h3>
            <p class="text-gray-600">Hãy là người đầu tiên đánh giá công ty này!</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>
