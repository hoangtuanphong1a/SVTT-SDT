<template>
  <v-app>
    <v-app-bar app color="primary" dark elevation="4">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-2"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">HỆ THỐNG ĐÀO TẠO</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text class="mr-2" to="/">
        <v-icon left>mdi-home</v-icon>
        Trang chủ
      </v-btn>

      <v-btn text class="mr-2" to="/java-core">
        <v-icon left>mdi-language-java</v-icon>
        Java Core
      </v-btn>

      <v-btn text class="mr-2" to="/spring-boot">
        <v-icon left>mdi-spring</v-icon>
        Spring Boot
      </v-btn>

      <v-btn text class="mr-2" to="/vuejs">
        <v-icon left>mdi-vuejs</v-icon>
        VueJS
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary width="280">
      <v-list dense>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-icon size="40" color="white">mdi-school</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-bold">
              HỆ THỐNG ĐÀO TẠO
            </v-list-item-title>
            <v-list-item-subtitle>Chuyên nghiệp</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item link to="/" active-class="active-menu">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Trang chủ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/java-core" active-class="active-menu">
          <v-list-item-icon>
            <v-icon>mdi-language-java</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Java Core</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/spring-boot" active-class="active-menu">
          <v-list-item-icon>
            <v-icon>mdi-spring</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Spring Boot</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/vuejs" active-class="active-menu">
          <v-list-item-icon>
            <v-icon>mdi-vuejs</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>VueJS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="training-container">
        <slot></slot>
      </div>
    </v-main>

    <v-footer app color="primary" dark class="pa-0">
      <v-card flat tile width="100%" class="text-center">
        <v-card-text class="py-2">
          <strong>© {{ new Date().getFullYear() }} HỆ THỐNG ĐÀO TẠO CHUYÊN NGHIỆP</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>

<style scoped>
.training-container {
  padding: 20px 0;
  min-height: calc(100vh - 128px);
}

.v-app-bar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}

.v-navigation-drawer {
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
}

.v-footer {
  font-size: 14px;
  font-weight: 500;
}

.active-menu {
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 4px solid #ffffff;
}

.v-btn.text {
  font-weight: 500;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .v-btn.text {
    display: none;
  }
}
</style>