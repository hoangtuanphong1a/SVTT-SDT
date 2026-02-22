<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const cvTemplates = ref([
  { id: 1, name: 'CV Hiện đại', description: 'Thiết kế tối giản, phù hợp cho các vị trí chuyên môn. Phong cách clean, hiện đại.', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop', popular: true, category: 'modern' },
  { id: 2, name: 'CV Sáng tạo', description: 'Nổi bật, phù hợp với ngành sáng tạo, marketing, designer.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=560&fit=crop', popular: true, category: 'creative' },
  { id: 3, name: 'CV Classic', description: 'Phong cách truyền thống, chuyên nghiệp, phù hợp mọi ngành nghề.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=560&fit=crop', popular: false, category: 'classic' },
  { id: 4, name: 'CV Tối giản', description: 'Đơn giản nhưng vẫn chuyên nghiệp, tập trung vào nội dung.', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=560&fit=crop', popular: true, category: 'minimal' },
  { id: 5, name: 'CV Kỹ thuật', description: 'Phù hợp cho các vị trí IT, kỹ thuật, developer.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=560&fit=crop', popular: false, category: 'tech' },
  { id: 6, name: 'CV Quản lý', description: 'Thiết kế cho vị trí quản lý, lãnh đạo.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=560&fit=crop', popular: false, category: 'manager' },
  { id: 7, name: 'CV Tài chính', description: 'Phù hợp cho ngành tài chính, kế toán, ngân hàng.', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=560&fit=crop', popular: false, category: 'finance' },
  { id: 8, name: 'CV Y tế', description: 'Thiết kế cho ngành y tế, bác sĩ, dược sĩ.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=560&fit=crop', popular: false, category: 'medical' },
  { id: 9, name: 'CV Giáo dục', description: 'Phù hợp cho ngành giáo dục, giáo viên, giảng viên.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=560&fit=crop', popular: false, category: 'education' }
])

const activeCategory = ref('all')
const categories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'modern', label: 'Hiện đại' },
  { id: 'creative', label: 'Sáng tạo' },
  { id: 'classic', label: 'Classic' },
  { id: 'minimal', label: 'Tối giản' },
  { id: 'tech', label: 'Kỹ thuật' },
  { id: 'manager', label: 'Quản lý' }
]

const filteredTemplates = () => {
  if (activeCategory.value === 'all') {
    return cvTemplates.value
  }
  return cvTemplates.value.filter(t => t.category === activeCategory.value)
}

const useTemplate = (template) => {
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
          <h1 class="text-4xl lg:text-5xl font-bold mb-4">
            Kho mẫu CV <span class="text-[#f26b38]">đẹp nhất</span>
          </h1>
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Hơn 100+ mẫu CV chuyên nghiệp, được thiết kế sẵn. Chọn mẫu phù hợp và tạo CV trong vài phút
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a href="#templates" class="px-6 py-3 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg font-medium">Khám phá ngay</a>
            <router-link to="/cv-builder" class="px-6 py-3 border border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors font-medium">Tạo CV ngay</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Templates Section -->
    <section id="templates" class="py-12 lg:py-16">
      <div class="container mx-auto px-4">
        <!-- Category Tabs -->
        <div class="flex flex-wrap gap-2 mb-8 justify-center">
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="activeCategory = cat.id"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="activeCategory === cat.id ? 'bg-[#f26b38] text-white' : 'bg-white text-gray-700 hover:bg-orange-100 border border-gray-200'"
          >
            {{ cat.label }}
          </button>
        </div>

        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">Mẫu CV theo phong cách</h2>
          <p class="text-lg text-gray-600">Chọn mẫu CV phù hợp với ngành nghề và phong cách của bạn</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="template in filteredTemplates()" 
            :key="template.id" 
            class="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group"
          >
            <div class="relative h-80 overflow-hidden">
              <img 
                :src="template.image" 
                :alt="template.name" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-if="template.popular" class="absolute top-4 left-4 px-3 py-1 bg-[#f26b38] text-white text-xs rounded-full font-medium">
                Phổ biến
              </div>
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  @click="useTemplate(template)"
                  class="px-6 py-2.5 bg-white text-gray-900 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform"
                >
                  Sử dụng mẫu
                </button>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-bold mb-2 group-hover:text-[#f26b38] transition-colors">{{ template.name }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ template.description }}</p>
              <button 
                @click="useTemplate(template)"
                class="w-full py-2.5 border border-[#f26b38] text-[#f26b38] rounded-lg hover:bg-[#f26b38] hover:text-white transition-colors font-medium"
              >
                Tạo CV với mẫu này
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-12 lg:py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">Tại sao chọn CVKing?</h2>
          <p class="text-lg text-gray-600">Chúng tôi mang đến những gì tốt nhất cho bạn</p>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">🎨</span>
            </div>
            <h3 class="text-lg font-bold mb-2">100+ Mẫu đẹp</h3>
            <p class="text-sm text-gray-600">Nhiều mẫu CV đa dạng, cập nhật liên tục</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">✏️</span>
            </div>
            <h3 class="text-lg font-bold mb-2">Dễ chỉnh sửa</h3>
            <p class="text-sm text-gray-600">Giao diện trực quan, thao tác đơn giản</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">📄</span>
            </div>
            <h3 class="text-lg font-bold mb-2">PDF Chất lượng</h3>
            <p class="text-sm text-gray-600">Xuất file PDF sắc nét, chuẩn in ấn</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">⚡</span>
            </div>
            <h3 class="text-lg font-bold mb-2">Nhanh chóng</h3>
            <p class="text-sm text-gray-600">Tạo CV chỉ trong 5-10 phút</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 lg:py-16 bg-gradient-to-r from-[#f26b38] to-[#e05a27]">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-white">Sẵn sàng tạo CV ấn tượng?</h2>
        <p class="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Hàng nghìn ứng viên đã tìm được việc mơ ước với CV chuyên nghiệp từ CVKing</p>
        <router-link to="/cv-builder" class="px-8 py-3 bg-white text-[#f26b38] rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
          Tạo CV ngay
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </router-link>
      </div>
    </section>

    <Footer />
  </div>
</template>
