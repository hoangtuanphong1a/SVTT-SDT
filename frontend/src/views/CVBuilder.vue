<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const cvTemplates = ref([
  { id: 1, name: 'CV Hiện đại', description: 'Thiết kế tối giản, phù hợp cho các vị trí chuyên môn', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop', popular: true },
  { id: 2, name: 'CV Sáng tạo', description: 'Nổi bật, phù hợp với ngành sáng tạo và marketing', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=560&fit=crop', popular: false },
  { id: 3, name: 'CV Classic', description: 'Phong cách truyền thống, chuyên nghiệp', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=560&fit=crop', popular: false },
  { id: 4, name: 'CV Tối giản', description: 'Đơn giản nhưng vẫn chuyên nghiệp', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=560&fit=crop', popular: true },
  { id: 5, name: 'CV Kỹ thuật', description: 'Phù hợp cho các vị trí IT, kỹ thuật', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=560&fit=crop', popular: false },
  { id: 6, name: 'CV Quản lý', description: 'Thiết kế cho vị trí quản lý, lãnh đạo', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=560&fit=crop', popular: false }
])

const selectedTemplate = ref(null)
const showPreview = ref(false)

const selectTemplate = (template) => {
  selectedTemplate.value = template
}

const useTemplate = (template) => {
  // Navigate to CV Editor with selected template
  window.location.href = `/cv-editor?template=${template.id}`
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Hero Section -->
    <section class="relative py-16 lg:py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-[#f26b38] rounded-full mb-6">
            <span class="text-sm font-medium">✓ Miễn phí 100%</span>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold mb-4">
            Tạo CV <span class="text-[#f26b38]">Chuyên nghiệp</span>
          </h1>
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Chọn từ hàng trăm mẫu CV đẹp mắt, được thiết kế chuẩn theo yêu cầu của nhà tuyển dụng Việt Nam
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a href="#templates" class="px-6 py-3 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg font-medium">Chọn mẫu CV</a>
            <router-link to="/cv-templates" class="px-6 py-3 border border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors font-medium">Xem tất cả mẫu</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 lg:py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">🎨</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Hàng trăm mẫu đẹp</h3>
            <p class="text-gray-600">Nhiều mẫu CV đa dạng, phù hợp mọi ngành nghề và vị trí</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">✏️</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Dễ dàng chỉnh sửa</h3>
            <p class="text-gray-600">Giao diện trực quan, kéo thả dễ dàng</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">📥</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Tải PDF miễn phí</h3>
            <p class="text-gray-600">Xuất file PDF chất lượng cao, sẵn sàng nộp</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Templates Section -->
    <section id="templates" class="py-12 lg:py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">Mẫu CV nổi bật</h2>
          <p class="text-lg text-gray-600">Chọn mẫu CV phù hợp với phong cách của bạn</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="template in cvTemplates" 
            :key="template.id" 
            class="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group"
          >
            <div class="relative h-72 overflow-hidden">
              <img 
                :src="template.image" 
                :alt="template.name" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-if="template.popular" class="absolute top-4 left-4 px-3 py-1 bg-[#f26b38] text-white text-xs rounded-full font-medium">
                Phổ biến nhất
              </div>
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  @click="useTemplate(template)"
                  class="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform"
                >
                  Sử dụng mẫu
                </button>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-bold mb-2 group-hover:text-[#f26b38] transition-colors">{{ template.name }}</h3>
              <p class="text-sm text-gray-600">{{ template.description }}</p>
              <button 
                @click="useTemplate(template)"
                class="mt-4 w-full py-2 border border-[#f26b38] text-[#f26b38] rounded-lg hover:bg-[#f26b38] hover:text-white transition-colors font-medium"
              >
                Tạo CV ngay
              </button>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/cv-templates" class="px-8 py-3 border border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors font-medium inline-flex items-center gap-2">
            Xem tất cả mẫu CV
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- How it works Section -->
    <section class="py-12 lg:py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">Cách tạo CV trong 3 bước</h2>
          <p class="text-lg text-gray-600">Nhanh chóng và dễ dàng</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="relative text-center p-6">
            <div class="w-16 h-16 bg-gradient-to-br from-[#f26b38] to-[#e05a27] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              1
            </div>
            <h3 class="text-xl font-bold mb-2">Chọn mẫu CV</h3>
            <p class="text-gray-600">Chọn từ hàng trăm mẫu CV chuyên nghiệp</p>
          </div>
          <div class="relative text-center p-6">
            <div class="w-16 h-16 bg-gradient-to-br from-[#f26b38] to-[#e05a27] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              2
            </div>
            <h3 class="text-xl font-bold mb-2">Nhập thông tin</h3>
            <p class="text-gray-600">Điền thông tin cá nhân, kinh nghiệm, kỹ năng</p>
          </div>
          <div class="relative text-center p-6">
            <div class="w-16 h-16 bg-gradient-to-br from-[#f26b38] to-[#e05a27] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              3
            </div>
            <h3 class="text-xl font-bold mb-2">Tải về ngay</h3>
            <p class="text-gray-600">Xuất file PDF chất lượng cao, sẵn sàng nộp</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 lg:py-16 bg-gradient-to-r from-[#f26b38] to-[#e05a27]">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-white">Sẵn sàng tạo CV ấn tượng?</h2>
        <p class="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Hàng nghìn ứng viên đã tìm được việc mơ ước với CV chuyên nghiệp từ CVKing</p>
        <a href="#templates" class="px-8 py-3 bg-white text-[#f26b38] rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
          Tạo CV ngay
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </section>

    <Footer />
  </div>
</template>
