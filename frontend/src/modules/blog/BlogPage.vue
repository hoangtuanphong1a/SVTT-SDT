<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-slate-800">Danh sách Blog</h1>

    <div v-if="isLoading" class="flex justify-center py-12">
      <Loader2 class="w-8 h-8 animate-spin text-primary" />
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-500">
      Lỗi: {{ error.message }}
    </div>

    <el-row v-else :gutter="20">
      <el-col v-for="post in posts" :key="post.id" :span="8">
        <el-card shadow="hover" class="cursor-pointer" @click="goToDetail(post.id)">
          <h3 class="text-lg font-semibold mb-2 line-clamp-2">{{ post.title }}</h3>
          <p class="text-slate-600 text-sm line-clamp-2">{{ post.excerpt }}</p>
          <div class="mt-2 text-xs text-slate-400">
            {{ post.author }} · {{ formatDate(post.publishedAt) }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

import { useBlogPostsQuery } from './composables/useBlogQuery';

const router = useRouter();
const { data: posts, isLoading, error } = useBlogPostsQuery();

function goToDetail(id: string) {
  router.push(`/blog/${id}`);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN');
}
</script>
