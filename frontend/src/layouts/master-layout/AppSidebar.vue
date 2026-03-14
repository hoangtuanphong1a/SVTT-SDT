<template>
  <div class="app-sidebar h-dvh w-64 bg-slate-800 text-white">
    <div class="p-4 border-b border-slate-700">
      <h2 class="text-xl font-bold">Frontend</h2>
    </div>
    <nav class="p-4 space-y-2">
      <router-link
        to="/"
        class="block px-4 py-2 rounded hover:bg-slate-700 transition"
        active-class="bg-slate-600"
      >
        Trang chủ
      </router-link>
      <router-link
        to="/blog"
        class="block px-4 py-2 rounded hover:bg-slate-700 transition"
        active-class="bg-slate-600"
      >
        Blog
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts"></script>
