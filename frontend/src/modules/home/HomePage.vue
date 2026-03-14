<template>
  <div class="space-y-6">
    <div class="text-center py-12">
      <h1 class="text-4xl font-bold text-slate-800 mb-4">Chào mừng đến với Frontend</h1>
      <p class="text-lg text-slate-600 max-w-2xl mx-auto">
        Đây là trang chủ ví dụ. Dự án sử dụng Vue 3, TypeScript, Vite, Pinia, Vue Router và TanStack Query.
      </p>
    </div>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="text-center">
          <h3 class="text-xl font-semibold mb-2">Trang chủ</h3>
          <p class="text-slate-600">Bạn đang ở đây</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="text-center cursor-pointer" @click="$router.push('/blog')">
          <h3 class="text-xl font-semibold mb-2">Blog</h3>
          <p class="text-slate-600">Xem danh sách bài viết</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="text-center">
          <h3 class="text-xl font-semibold mb-2">API</h3>
          <p class="text-slate-600">Ví dụ gọi API với TanStack Query</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>
