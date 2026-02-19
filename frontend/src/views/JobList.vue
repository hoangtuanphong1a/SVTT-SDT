<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useStore } from 'vuex'

const store = useStore()
const isLoading = ref(false)
const savedJobs = ref(new Set())
const activeTab = ref('all')

const filters = ref({
  keyword: '',
  location: '',
  type: '',
  experience: '',
  salary: '',
  level: ''
})

const locations = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Biên Hòa', 'Remote']
const jobTypes = ['Toàn thời gian', 'Bán thời gian', 'Remote', 'Thực tập']
const experienceLevels = ['Không yêu cầu', 'Dưới 1 năm', '1 năm', '2 năm', '3 năm', '5 năm']
const salaryRanges = ['Dưới 10 triệu', '10-20 triệu', '20-30 triệu', '30-50 triệu', 'Trên 50 triệu']
const levels = ['Intern', 'Junior', 'Middle', 'Senior', 'Lead', 'Manager']

const jobs = ref([
  { id: 1, title: 'Senior Frontend Developer', company: 'Tech Solutions Vietnam', location: 'Hà Nội', salary: '25-35 triệu', type: 'Full-time', level: 'Senior', tags: ['ReactJS', 'TypeScript', 'TailwindCSS'], posted: '2 giờ trước', featured: true, urgent: true },
  { id: 2, title: 'UI/UX Designer', company: 'Creative Studio', location: 'Hồ Chí Minh', salary: '15-25 triệu', type: 'Full-time', level: 'Middle', tags: ['Figma', 'Adobe XD', 'Sketch'], posted: '5 giờ trước', featured: true, urgent: false },
  { id: 3, title: 'Backend Developer', company: 'FinTech Innovations', location: 'Đà Nẵng', salary: '20-30 triệu', type: 'Full-time', level: 'Middle', tags: ['NodeJS', 'MongoDB', 'AWS'], posted: '1 ngày trước', featured: false, urgent: true },
  { id: 4, title: 'Product Manager', company: 'E-commerce Giant', location: 'Hà Nội', salary: '30-45 triệu', type: 'Full-time', level: 'Senior', tags: ['Agile', 'Scrum', 'Product Strategy'], posted: '1 ngày trước', featured: true, urgent: false },
  { id: 5, title: 'Marketing Executive', company: 'Digital Agency Pro', location: 'Hồ Chí Minh', salary: '12-18 triệu', type: 'Full-time', level: 'Junior', tags: ['SEO', 'Social Media', 'Content'], posted: '2 ngày trước', featured: false, urgent: false },
  { id: 6, title: 'Data Analyst', company: 'Analytics Corp', location: 'Remote', salary: '18-28 triệu', type: 'Remote', level: 'Middle', tags: ['Python', 'SQL', 'Tableau'], posted: '3 ngày trước', featured: false, urgent: false },
  { id: 7, title: 'DevOps Engineer', company: 'CloudTech Vietnam', location: 'Hà Nội', salary: '25-40 triệu', type: 'Full-time', level: 'Senior', tags: ['Docker', 'Kubernetes', 'AWS'], posted: '4 giờ trước', featured: true, urgent: true },
  { id: 8, title: 'Mobile Developer', company: 'AppWorks Inc', location: 'Hồ Chí Minh', salary: '20-35 triệu', type: 'Full-time', level: 'Middle', tags: ['React Native', 'Flutter', 'iOS'], posted: '6 giờ trước', featured: false, urgent: false }
])

const tabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'featured', label: 'Nổi bật' },
  { id: 'urgent', label: 'Tuyển gấp' },
  { id: 'remote', label: 'Remote' }
]

const toggleSaveJob = (jobId) => {
  if (savedJobs.value.has(jobId)) {
    savedJobs.value.delete(jobId)
  } else {
    savedJobs.value.add(jobId)
  }
}

const applyFilters = () => {
  console.log('Filters applied:', filters.value)
}

const clearFilters = () => {
  filters.value = {
    keyword: '',
    location: '',
    type: '',
    experience: '',
    salary: '',
    level: ''
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Hero Section -->
    <section class="relative py-16 lg:py-24">
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=800&fit=crop" 
          alt="Job search" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-800/60"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full mb-6">
            <span class="text-sm font-medium">10000+ việc làm mỗi ngày</span>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Tìm việc làm
            <span class="text-[#f26b38]">mơ ước</span>
          </h1>
          <p class="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Khám phá hàng ngàn cơ hội nghề nghiệp hấp dẫn từ các công ty hàng đầu Việt Nam
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <button class="px-6 py-3 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg font-medium">Tìm việc ngay</button>
            <button class="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white rounded-lg font-medium">Tạo CV miễn phí</button>
          </div>
        </div>
      </div>
    </section>

    <main class="py-8 lg:py-12 -mt-8 relative z-20">
      <div class="container mx-auto px-4">
        <!-- Page Header -->
        <div class="mb-6">
          <h1 class="text-3xl lg:text-4xl font-bold mb-2">Tìm việc làm</h1>
          <p class="text-gray-600">Khám phá hàng ngàn cơ hội việc làm phù hợp với bạn</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Sidebar Filters (3/7) -->
          <aside class="lg:w-3/7">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-bold">Bộ lọc</h2>
                <button @click="clearFilters" class="text-sm text-[#f26b38] hover:text-[#e05a27]">Xóa tất cả</button>
              </div>

              <!-- Search -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Từ khóa</label>
                <div class="relative">
                  <input 
                    v-model="filters.keyword"
                    type="text" 
                    placeholder="Nhập từ khóa, chức danh..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent pl-10"
                  />
                  <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
              </div>

              <!-- Location Checkboxes -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-3">Địa điểm</label>
                <div class="flex flex-col gap-2">
                  <label v-for="loc in locations" :key="loc" class="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      :value="loc" 
                      v-model="filters.location"
                      class="w-4 h-4 text-[#f26b38] border-gray-300 rounded focus:ring-[#f26b38]"
                    />
                    <span class="text-sm text-gray-600 group-hover:text-gray-900">{{ loc }}</span>
                  </label>
                </div>
              </div>

              <!-- Job Type Checkboxes -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-3">Loại hình</label>
                <div class="flex flex-col gap-2">
                  <label v-for="type in jobTypes" :key="type" class="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      :value="type" 
                      v-model="filters.type"
                      class="w-4 h-4 text-[#f26b38] border-gray-300 rounded focus:ring-[#f26b38]"
                    />
                    <span class="text-sm text-gray-600 group-hover:text-gray-900">{{ type }}</span>
                  </label>
                </div>
              </div>

              <!-- Salary Checkboxes -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-3">Mức lương</label>
                <div class="flex flex-col gap-2">
                  <label v-for="salary in salaryRanges" :key="salary" class="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      :value="salary" 
                      v-model="filters.salary"
                      class="w-4 h-4 text-[#f26b38] border-gray-300 rounded focus:ring-[#f26b38]"
                    />
                    <span class="text-sm text-gray-600 group-hover:text-gray-900">{{ salary }}</span>
                  </label>
                </div>
              </div>

              <!-- Level Checkboxes -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-3">Cấp bậc</label>
                <div class="flex flex-col gap-2">
                  <label v-for="level in levels" :key="level" class="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      :value="level" 
                      v-model="filters.level"
                      class="w-4 h-4 text-[#f26b38] border-gray-300 rounded focus:ring-[#f26b38]"
                    />
                    <span class="text-sm text-gray-600 group-hover:text-gray-900">{{ level }}</span>
                  </label>
                </div>
              </div>

              <!-- Experience Checkboxes -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-3">Kinh nghiệm</label>
                <div class="flex flex-col gap-2">
                  <label v-for="exp in experienceLevels" :key="exp" class="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      :value="exp" 
                      v-model="filters.experience"
                      class="w-4 h-4 text-[#f26b38] border-gray-300 rounded focus:ring-[#f26b38]"
                    />
                    <span class="text-sm text-gray-600 group-hover:text-gray-900">{{ exp }}</span>
                  </label>
                </div>
              </div>

              <button @click="applyFilters" class="w-full px-6 py-3 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg font-medium transition-colors">
                Áp dụng bộ lọc
              </button>
            </div>
          </aside>

          <!-- Job List (4/7) -->
          <div class="lg:w-4/7">
            <!-- Tabs -->
            <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                :class="activeTab === tab.id ? 'bg-[#f26b38] text-white' : 'bg-white text-gray-700 hover:bg-orange-100 border border-gray-200'"
              >
                {{ tab.label }}
              </button>
              <div class="ml-auto text-sm text-gray-600">
                <span class="font-medium">{{ jobs.length }}</span> việc làm
              </div>
            </div>

            <!-- Jobs Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="job in jobs" 
                :key="job.id" 
                class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:border-[#f26b38] transition-all duration-300 relative group"
              >
                <!-- Header: Logo + Info -->
                <div class="flex items-start gap-4 mb-4">
                  <!-- Logo -->
                  <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-600 text-xl font-bold flex-shrink-0">💼</div>
                  
                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-2">
                      <span v-if="job.featured" class="px-2 py-0.5 bg-gradient-to-r from-[#f26b38] to-[#e05a27] text-white text-xs rounded-full">Nổi bật</span>
                      <span v-if="job.urgent" class="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">Gấp</span>
                    </div>
                    <h3 class="text-lg font-medium hover:text-[#f26b38] truncate">{{ job.title }}</h3>
                    <p class="text-sm text-gray-600 truncate">{{ job.company }}</p>
                  </div>
                  
                  <!-- Save Button -->
                  <button @click="toggleSaveJob(job.id)" class="text-gray-400 hover:text-[#f26b38] transition-colors flex-shrink-0">
                    <svg class="h-5 w-5" :fill="savedJobs.has(job.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                    </svg>
                  </button>
                </div>
                
                <!-- Details -->
                <div class="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <span class="flex items-center gap-1">📍 {{ job.location }}</span>
                  <span class="flex items-center gap-1">💰 {{ job.salary }}</span>
                  <span class="flex items-center gap-1">💼 {{ job.type }}</span>
                  <span class="flex items-center gap-1">📊 {{ job.level }}</span>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="tag in job.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{{ tag }}</span>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span class="text-sm text-gray-500">{{ job.posted }}</span>
                  <a href="#" class="px-6 py-2 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg text-sm font-medium transition-colors">Ứng tuyển ngay</a>
                </div>
              </div>
            </div>

            <!-- Load More -->
            <div class="text-center mt-8">
              <button class="px-8 py-3 border border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors font-medium">
                Xem thêm việc làm
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>