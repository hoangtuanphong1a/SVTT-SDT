<template>
  <div class="app-layout h-dvh grid grid-cols-[auto_1fr]">
    <AppSidebar />
    <div class="app-container flex flex-col">
      <AppHeader />
      <AppContent>
        <RouterView />
      </AppContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppContent from './AppContent.vue';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
</script>
