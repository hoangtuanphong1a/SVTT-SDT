<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const router = useRouter()

// Mock article data - in real app, fetch from API
const article = ref({
  id: 1,
  title: '10 Kỹ năng mềm quan trọng giúp bạn thành công trong công việc',
  excerpt: 'Khám phá những kỹ năng thiết yếu mà mọi chuyên gia cần có để phát triển sự nghiệp trong thời đại số hóa.',
  category: 'Kỹ năng',
  date: '25/11/2024',
  readTime: '5 phút đọc',
  author: 'Nguyễn Văn A',
  authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  image: 'https://images.unsplash.com/photo-1722149493669-30098ef78f9f?w=1200&h=600&fit=crop',
  content: `
Trong thời đại số hóa hiện nay, bên cạnh các kỹ năng chuyên môn, kỹ năng mềm đóng vai trò quan trọng không kém trong việc xây dựng sự nghiệp thành công. Nghiên cứu cho thấy những nhân viên có kỹ năng mềm tốt thường có xu hướng thăng tiến nhanh hơn và có thu nhập cao hơn.

## 1. Kỹ năng giao tiếp

Giao tiếp hiệu quả là nền tảng của mọi mối quan hệ trong công việc. Điều này bao gồm khả năng diễn đạt ý kiến rõ ràng, lắng nghe chủ động và thích nghi với phong cách giao tiếp khác nhau của đồng nghiệp và khách hàng.

## 2. Tư duy phản biện

Khả năng phân tích vấn đề một cách logic và đưa ra quyết định sáng suốt là kỹ năng được các nhà tuyển dụng đánh giá rất cao. Tư duy phản biện giúp bạn giải quyết vấn đề nhanh chóng và hiệu quả hơn.

## 3. Quản lý thời gian

Trong môi trường làm việc hiện đại với khối lượng công việc lớn, kỹ năng quản lý thời gian giúp bạn ưu tiên công việc, hoàn thành deadline đúng hạn và cân bằng giữa công việc cuộc sống.

## 4. Làm việc nhóm

Khả năng hợp tác với người khác, chia sẻ ý tưởng và cùng nhau đạt mục tiêu chung là kỹ năng không thể thiếu trong hầu hết các vị trí công việc hiện nay.

## 5. Khả năng thích nghi

Thị trường lao động thay đổi nhanh chóng, đòi hỏi mỗi người phải liên tục học hỏi và thích nghi với những thay đổi. Những người có khả năng thích nghi tốt thường dễ dàng vượt qua thách thức và nắm bắt cơ hội mới.
  `,
  tags: ['Kỹ năng mềm', 'Sự nghiệp', 'Phát triển bản thân']
})

const relatedArticles = ref([
  {
    id: 2,
    title: 'Cách viết CV xin việc ấn tượng thu hút nhà tuyển dụng',
    category: 'CV & Phỏng vấn',
    image: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=400&h=300&fit=crop',
    date: '23/11/2024'
  },
  {
    id: 3,
    title: 'Xu hướng tuyển dụng IT năm 2024: Những vị trí hot nhất',
    category: 'Xu hướng',
    image: 'https://images.unsplash.com/photo-1624555130858-7ea5b8192c49?w=400&h=300&fit=crop',
    date: '20/11/2024'
  },
  {
    id: 4,
    title: 'Bí quyết phỏng vấn thành công',
    category: 'CV & Phỏng vấn',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    date: '18/11/2024'
  }
])

const isSaved = ref(false)
const shareUrl = ref('')

onMounted(() => {
  shareUrl.value = window.location.href
})

const toggleSave = () => {
  isSaved.value = !isSaved.value
}

const shareArticle = (platform) => {
  const url = encodeURIComponent(shareUrl.value)
  const title = encodeURIComponent(article.value.title)
  
  let shareLink = ''
  if (platform === 'facebook') {
    shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`
  } else if (platform === 'linkedin') {
    shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
  } else if (platform === 'twitter') {
    shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
  }
  
  if (shareLink) {
    window.open(shareLink, '_blank')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Article Header -->
    <section class="relative py-12 lg:py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <router-link to="/" class="hover:text-[#f26b38]">Trang chủ</router-link>
            <span>/</span>
            <router-link to="/blog" class="hover:text-[#f26b38]">Blog</router-link>
            <span>/</span>
            <span class="text-gray-700">{{ article.category }}</span>
          </nav>
          
          <!-- Category & Title -->
          <span class="inline-block px-3 py-1 bg-orange-100 text-[#f26b38] text-sm font-medium rounded-full mb-4">
            {{ article.category }}
          </span>
          <h1 class="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            {{ article.title }}
          </h1>
          
          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div class="flex items-center gap-2">
              <img :src="article.authorAvatar" :alt="article.author" class="w-10 h-10 rounded-full object-cover" />
              <span class="font-medium text-gray-900">{{ article.author }}</span>
            </div>
            <span>•</span>
            <span>{{ article.date }}</span>
            <span>•</span>
            <span>{{ article.readTime }}</span>
          </div>
          
          <!-- Actions -->
          <div class="flex flex-wrap gap-3">
            <button 
              @click="toggleSave"
              class="px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors"
              :class="isSaved ? 'bg-[#f26b38] text-white border-[#f26b38]' : 'border-gray-300 hover:border-[#f26b38] hover:text-[#f26b38]'"
            >
              <svg class="h-5 w-5" :fill="isSaved ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
              {{ isSaved ? 'Đã lưu' : 'Lưu bài viết' }}
            </button>
            <div class="relative group">
              <button class="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:border-[#f26b38] hover:text-[#f26b38] transition-colors">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
                Chia sẻ
              </button>
              <div class="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button @click="shareArticle('facebook')" class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 rounded-t-lg">Facebook</button>
                <button @click="shareArticle('linkedin')" class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">LinkedIn</button>
                <button @click="shareArticle('twitter')" class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 rounded-b-lg">Twitter</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Image -->
    <section class="pb-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <img :src="article.image" :alt="article.title" class="w-full h-64 lg:h-96 object-cover rounded-xl" />
        </div>
      </div>
    </section>

    <!-- Article Content -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto grid lg:grid-cols-4 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-3">
            <div class="bg-white rounded-xl border border-gray-200 p-8">
              <!-- Excerpt -->
              <p class="text-lg text-gray-600 mb-8 pb-8 border-b border-gray-200">
                {{ article.excerpt }}
              </p>
              
              <!-- Content -->
              <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {{ article.content.replace(/## /g, '') }}
              </div>
              
              <!-- Tags -->
              <div class="mt-8 pt-8 border-t border-gray-200">
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in article.tags" :key="tag" class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    #{{ tag }}
                  </span>
                </div>
              </div>
              
              <!-- Author Box -->
              <div class="mt-8 p-6 bg-orange-50 rounded-xl">
                <div class="flex items-start gap-4">
                  <img :src="article.authorAvatar" :alt="article.author" class="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h4 class="font-bold text-lg mb-1">{{ article.author }}</h4>
                    <p class="text-sm text-gray-600 mb-2">Chuyên gia tuyển dụng với hơn 10 năm kinh nghiệm trong ngành HR</p>
                    <p class="text-sm text-gray-600">Chia sẻ kiến thức và kinh nghiệm về phát triển sự nghiệp, giúp hàng nghìn ứng viên tìm được việc làm ưng ý.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Related Articles -->
            <div class="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div class="font-bold text-lg mb-4">Bài viết liên quan</div>
              <div class="space-y-4">
                <router-link 
                  v-for="related in relatedArticles" 
                  :key="related.id" 
                  :to="`/blog/${related.id}`"
                  class="block group"
                >
                  <div class="relative h-32 rounded-lg overflow-hidden mb-2">
                    <img :src="related.image" :alt="related.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span class="text-xs text-[#f26b38] font-medium">{{ related.category }}</span>
                  <h4 class="text-sm font-medium group-hover:text-[#f26b38] transition-colors line-clamp-2">
                    {{ related.title }}
                  </h4>
                  <span class="text-xs text-gray-500">{{ related.date }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Articles Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-8">Bài viết khác</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <router-link 
            v-for="related in relatedArticles" 
            :key="related.id" 
            :to="`/blog/${related.id}`"
            class="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
          >
            <div class="relative h-48 overflow-hidden">
              <img :src="related.image" :alt="related.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div class="absolute top-4 left-4">
                <span class="px-2 py-1 bg-white text-gray-900 text-xs rounded-full">{{ related.category }}</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium mb-2 group-hover:text-[#f26b38] transition-colors line-clamp-2">
                {{ related.title }}
              </h3>
              <span class="text-sm text-gray-500">{{ related.date }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.prose h2 {
  @apply text-2xl font-bold mt-8 mb-4 text-gray-900;
}
</style>
