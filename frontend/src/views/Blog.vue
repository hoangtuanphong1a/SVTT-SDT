<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const savedPosts = ref(new Set())
const activeCategory = ref('all')
const searchKeyword = ref('')

const categories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'skills', label: 'Kỹ năng mềm' },
  { id: 'cv-interview', label: 'CV & Phỏng vấn' },
  { id: 'trends', label: 'Xu hướng' },
  { id: 'career', label: 'Chuyện nghề nghiệp' },
  { id: 'salary', label: 'Lương & Phúc lợi' }
]

const articles = ref([
  {
    id: 1,
    title: '10 Kỹ năng mềm quan trọng giúp bạn thành công trong công việc',
    excerpt: 'Khám phá những kỹ năng thiết yếu mà mọi chuyên gia cần có để phát triển sự nghiệp trong thời đại số hóa.',
    category: 'Kỹ năng',
    categoryId: 'skills',
    date: '25/11/2024',
    readTime: '5 phút đọc',
    author: 'Nguyễn Văn A',
    image: 'https://images.unsplash.com/photo-1722149493669-30098ef78f9f?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Cách viết CV xin việc ấn tượng thu hút nhà tuyển dụng',
    excerpt: 'Hướng dẫn chi tiết từng bước tạo một bản CV chuyên nghiệp, nổi bật và tăng cơ hội được nhận vào làm.',
    category: 'CV & Phỏng vấn',
    categoryId: 'cv-interview',
    date: '23/11/2024',
    readTime: '7 phút đọc',
    author: 'Trần Thị B',
    image: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Xu hướng tuyển dụng IT năm 2024: Những vị trí hot nhất',
    excerpt: 'Phân tích thị trường lao động IT Việt Nam và dự báo những công nghệ, vị trí việc làm được săn đón nhất.',
    category: 'Xu hướng',
    categoryId: 'trends',
    date: '20/11/2024',
    readTime: '6 phút đọc',
    author: 'Lê Hoàng C',
    image: 'https://images.unsplash.com/photo-1624555130858-7ea5b8192c49?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Bí quyết phỏng vấn thành công - Những điều nhà tuyển dụng muốn thấy ở ứng viên',
    excerpt: 'Chia sẻ những mẹo và chiến lược giúp bạn tự tin hơn trong buổi phỏng vấn và gây ấn tượng với nhà tuyển dụng.',
    category: 'CV & Phỏng vấn',
    categoryId: 'cv-interview',
    date: '18/11/2024',
    readTime: '8 phút đọc',
    author: 'Phạm Minh D',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Lộ trình nghề nghiệp cho lập trình viên từ Junior lên Senior',
    excerpt: 'Hướng dẫn chi tiết các bước phát triển kỹ năng và kinh nghiệm để trở thành Senior Developer.',
    category: 'Kỹ năng',
    categoryId: 'skills',
    date: '15/11/2024',
    readTime: '10 phút đọc',
    author: 'Hoàng Văn E',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'So sánh mức lương các vị trí IT tại Việt Nam năm 2024',
    excerpt: 'Cập nhật chi tiết mức lương của các vị trí phổ biến trong ngành CNTT tại Việt Nam.',
    category: 'Lương & Phúc lợi',
    categoryId: 'salary',
    date: '12/11/2024',
    readTime: '6 phút đọc',
    author: 'Đặng Thị F',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop'
  },
  {
    id: 7,
    title: 'Cách xây dựng thương hiệu cá nhân cho người đi làm',
    excerpt: 'Tìm hiểu tại sao thương hiệu cá nhân quan trọng và cách xây dựng nó để thăng tiến trong sự nghiệp.',
    category: 'Chuyện nghề nghiệp',
    categoryId: 'career',
    date: '10/11/2024',
    readTime: '5 phút đọc',
    author: 'Bùi Văn G',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=400&fit=crop'
  },
  {
    id: 8,
    title: 'Remote work - Xu hướng làm việc từ xa tại Việt Nam',
    excerpt: 'Khám phá cơ hội và thách thức của việc làm remote, cùng những công ty đang tuyển dụng vị trí này.',
    category: 'Xu hướng',
    categoryId: 'trends',
    date: '08/11/2024',
    readTime: '7 phút đọc',
    author: 'Vũ Thị H',
    image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=600&h=400&fit=crop'
  }
])

const toggleSavePost = (postId) => {
  if (savedPosts.value.has(postId)) {
    savedPosts.value.delete(postId)
  } else {
    savedPosts.value.add(postId)
  }
}

const filteredArticles = () => {
  return articles.value.filter(article => {
    const matchesCategory = activeCategory.value === 'all' || article.categoryId === activeCategory.value
    const matchesSearch = searchKeyword.value === '' || 
      article.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchKeyword.value.toLowerCase())
    return matchesCategory && matchesSearch
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
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=800&fit=crop" 
          alt="Career development" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-800/60"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full mb-6">
            <span class="text-sm font-medium">1000+ bài viết hữu ích</span>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Blog & Cẩm nang
            <span class="text-[#f26b38]">nghề nghiệp</span>
          </h1>
          <p class="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Chia sẻ kiến thức, kinh nghiệm và lời khuyên từ các chuyên gia để giúp bạn xây dựng sự nghiệp thành công
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <button class="px-6 py-3 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg font-medium">Đọc ngay</button>
            <button class="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white rounded-lg font-medium">Đăng bài viết</button>
          </div>
        </div>
      </div>
    </section>

    <main class="py-8 lg:py-12 -mt-8 relative z-20">
      <div class="container mx-auto px-4">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl lg:text-4xl font-bold mb-2">Blog & Cẩm nang nghề nghiệp</h1>
          <p class="text-gray-600 text-lg">Kiến thức và kinh nghiệm hữu ích cho sự nghiệp của bạn</p>
        </div>

        <!-- Search Bar -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div class="relative">
            <input 
              v-model="searchKeyword"
              type="text" 
              placeholder="Tìm kiếm bài viết..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent pl-10"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap gap-2 mb-8">
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

        <!-- Articles Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <article 
            v-for="article in filteredArticles()" 
            :key="article.id" 
            class="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="article.image" 
                :alt="article.title" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div class="absolute top-4 left-4">
                <span class="px-2 py-1 bg-white text-gray-900 text-xs rounded-full">{{ article.category }}</span>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-lg mb-2 line-clamp-2 group-hover:text-[#f26b38] transition-colors">
                {{ article.title }}
              </h3>
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">{{ article.excerpt }}</p>
              
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm text-gray-500 text-xs">{{ article.author }}</span>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <span>📅 {{ article.date }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <span class="text-sm text-gray-500 flex items-center gap-1">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ article.readTime }}
                </span>
                <button @click="toggleSavePost(article.id)" class="text-gray-400 hover:text-[#f26b38] transition-colors">
                  <svg class="h-5 w-5" :fill="savedPosts.has(article.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                </button>
              </div>
              
              <router-link 
                :to="`/blog/${article.id}`" 
                class="mt-4 inline-flex items-center gap-1 text-[#f26b38] hover:text-[#e05a27] font-medium text-sm"
              >
                Đọc thêm
                <svg class="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </router-link>
            </div>
          </article>
        </div>

        <!-- Load More -->
        <div class="text-center mt-12">
          <button class="px-8 py-3 border border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors font-medium">
            Xem thêm bài viết
          </button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>