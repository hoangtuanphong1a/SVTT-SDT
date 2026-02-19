<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const savedCompanies = ref(new Set())
const activeTab = ref('all')
const searchKeyword = ref('')

const tabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'featured', label: 'Nổi bật' },
  { id: 'verified', label: 'Đã xác minh' }
]

const industries = [
  'Công nghệ thông tin',
  'Tài chính - Ngân hàng',
  'E-commerce',
  'Game & Entertainment',
  'Marketing - Quảng cáo',
  'Giáo dục',
  'Y tế',
  'Sản xuất'
]

const companySizes = [
  { value: '1-50', label: '1-50 nhân viên' },
  { value: '51-200', label: '51-200 nhân viên' },
  { value: '201-500', label: '201-500 nhân viên' },
  { value: '500+', label: 'Trên 500 nhân viên' }
]

const companies = ref([
  { id: 1, name: 'FPT Software', industry: 'Công nghệ thông tin', location: 'Hà Nội', jobs: 127, featured: true, verified: true, desc: 'FPT Software là công ty công nghệ hàng đầu Việt Nam với hơn 35.000 nhân viên.', logo: 'FPT' },
  { id: 2, name: 'VNG Corporation', industry: 'Game & Entertainment', location: 'Hồ Chí Minh', jobs: 89, featured: true, verified: true, desc: 'VNG Corporation - Công ty game và dịch vụ số hàng đầu Đông Nam Á.', logo: 'VNG' },
  { id: 3, name: 'Tiki', industry: 'E-commerce', location: 'Hồ Chí Minh', jobs: 54, featured: false, verified: true, desc: 'Tiki - Sàn thương mại điện tử hàng đầu Việt Nam.', logo: 'TIKI' },
  { id: 4, name: 'Grab Vietnam', industry: 'Công nghệ thông tin', location: 'Hà Nội', jobs: 76, featured: true, verified: true, desc: 'Grab - Nền tảng di động hàng đầu Đông Nam Á.', logo: 'GRAB' },
  { id: 5, name: 'Sendo', industry: 'E-commerce', location: 'Hà Nội', jobs: 43, featured: false, verified: false, desc: 'Sendo - Sàn TMĐT uy tín tại Việt Nam.', logo: 'SENDO' },
  { id: 6, name: 'MoMo', industry: 'Tài chính - Ngân hàng', location: 'Hồ Chí Minh', jobs: 62, featured: true, verified: true, desc: 'MoMo - Ví điện tử hàng đầu Việt Nam.', logo: 'MOMO' },
  { id: 7, name: 'Shopee Vietnam', industry: 'E-commerce', location: 'Hồ Chí Minh', jobs: 156, featured: true, verified: true, desc: 'Shopee - Nền tảng thương mại điện tử hàng đầu khu vực.', logo: 'SHOPEE' },
  { id: 8, name: 'Zalo', industry: 'Công nghệ thông tin', location: 'Hồ Chí Minh', jobs: 98, featured: true, verified: true, desc: 'Zalo - Ứng dụng nhắn tin và thanh toán số hàng đầu Việt Nam.', logo: 'ZALO' }
])

const toggleSaveCompany = (companyId) => {
  if (savedCompanies.value.has(companyId)) {
    savedCompanies.value.delete(companyId)
  } else {
    savedCompanies.value.add(companyId)
  }
}

const filteredCompanies = () => {
  return companies.value.filter(company => {
    const matchesTab = activeTab.value === 'all' || 
      (activeTab.value === 'featured' && company.featured) ||
      (activeTab.value === 'verified' && company.verified)
    const matchesSearch = searchKeyword.value === '' || 
      company.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      company.desc.toLowerCase().includes(searchKeyword.value.toLowerCase())
    return matchesTab && matchesSearch
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Hero Section -->
    <section class="relative py-16 lg:py-24">
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=800&fit=crop" 
          alt="Office workspace" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-800/60"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full mb-6">
            <span class="text-sm font-medium">5000+ công ty uy tín</span>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Khám phá các nhà tuyển dụng
            <span class="text-[#f26b38]">hàng đầu</span>
          </h1>
          <p class="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Tìm hiểu về văn hóa công ty, đãi ngộ nhân viên và cơ hội phát triển sự nghiệp tại các doanh nghiệp hàng đầu Việt Nam
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <button class="px-6 py-3 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg font-medium">Khám phá ngay</button>
            <button class="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white rounded-lg font-medium">Đăng ký nhà tuyển dụng</button>
          </div>
        </div>
      </div>
    </section>

    <main class="py-8 lg:py-12 -mt-8 relative z-20">
      <div class="container mx-auto px-4">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl lg:text-4xl font-bold mb-2">Tìm công ty</h1>
          <p class="text-gray-600 text-lg">Khám phá các nhà tuyển dụng uy tín và cơ hội phát triển sự nghiệp</p>
        </div>

        <!-- Search Bar -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div class="grid md:grid-cols-3 gap-4">
            <div class="relative">
              <input 
                v-model="searchKeyword"
                type="text" 
                placeholder="Tìm kiếm công ty..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent pl-10"
              />
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            
            <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent">
              <option value="">Tất cả ngành nghề</option>
              <option v-for="ind in industries" :key="ind" :value="ind">{{ ind }}</option>
            </select>
            
            <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent">
              <option value="">Tất cả quy mô</option>
              <option v-for="size in companySizes" :key="size.value" :value="size.value">{{ size.label }}</option>
            </select>
          </div>
        </div>

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
            <span class="font-medium">{{ filteredCompanies().length }}</span> công ty
          </div>
        </div>

        <!-- Companies Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="company in filteredCompanies()" 
            :key="company.id" 
            class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:border-[#f26b38] transition-all duration-300 relative cursor-pointer group"
          >
            <!-- Header: Logo + Info -->
            <div class="flex items-start gap-3 mb-4">
              <!-- Logo -->
              <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-[#f26b38] to-[#e05a27] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {{ company.logo }}
              </div>
              
              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span v-if="company.featured" class="px-2 py-0.5 bg-gradient-to-r from-[#f26b38] to-[#e05a27] text-white text-xs rounded-full">Top</span>
                  <span v-if="company.verified" class="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">✓</span>
                </div>
                <h3 class="text-lg font-bold group-hover:text-[#f26b38] transition-colors truncate">{{ company.name }}</h3>
                <p class="text-sm text-[#f26b38] font-medium truncate">{{ company.industry }}</p>
              </div>
              
              <!-- Save Button -->
              <button @click="toggleSaveCompany(company.id)" class="text-gray-400 hover:text-[#f26b38] transition-colors flex-shrink-0">
                <svg class="h-5 w-5" :fill="savedCompanies.has(company.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </button>
            </div>

            <!-- Meta Info -->
            <div class="space-y-1 mb-4">
              <p class="text-sm text-gray-600">📍 {{ company.location }}</p>
              <p class="text-sm text-gray-600">💼 {{ company.jobs }} việc làm</p>
            </div>

            <!-- Footer Buttons -->
            <div class="flex gap-3 pt-4 border-t border-gray-100">
              <router-link 
                :to="`/companies/${company.id}`" 
                class="flex-1 text-center px-4 py-2 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Xem việc làm
              </router-link>
              <a href="#" class="flex-1 text-center px-4 py-2 border border-gray-300 hover:bg-orange-50 text-gray-700 rounded-lg text-sm transition-colors">
                Xem profile
              </a>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <div class="text-center mt-12">
          <button class="px-8 py-3 border border-gray-300 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors font-medium">
            Xem thêm công ty
          </button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>