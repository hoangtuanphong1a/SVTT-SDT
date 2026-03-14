<template>
  <div class="space-y-6 max-w-3xl">
    <el-button @click="$router.push('/blog')" type="primary" plain>
      ← Quay lại
    </el-button>

    <div v-if="isLoading" class="flex justify-center py-12">
      <Loader2 class="w-8 h-8 animate-spin text-primary" />
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-500">
      Lỗi: {{ error.message }}
    </div>

    <div v-else-if="post" class="blog-detail">
      <h1 class="text-3xl font-bold text-slate-800 mb-4">{{ post.title }}</h1>
      <div class="text-slate-500 text-sm mb-6">
        {{ post.author }} · {{ formatDate(post.publishedAt) }}
      </div>
      <div class="prose text-slate-700 leading-relaxed">
        {{ post.content }}
      </div>
    </div>

    <div v-else class="text-center py-12 text-slate-500">
      Không tìm thấy bài viết
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

import { useBlogPostQuery } from './composables/useBlogQuery';

const route = useRoute();
const postId = route.params.id as string;
const { data: post, isLoading, error } = useBlogPostQuery(postId);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN');
}
</script>
