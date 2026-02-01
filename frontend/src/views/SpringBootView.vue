<template>
  <div class="spring-boot-view">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Spring Boot - Backend hiện đại</h1>
        <p class="text-subtitle-1 mb-8">
          Spring Boot là framework phát triển ứng dụng Java dễ dàng và nhanh chóng. 
          Khóa học này giúp bạn xây dựng các ứng dụng web và RESTful API chuyên nghiệp.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-spring</v-icon>
            Spring Boot Basics
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Làm quen với Spring Boot, cấu trúc dự án và các khái niệm cơ bản.</p>
            <ul class="topic-list">
              <li class="topic-item">Giới thiệu Spring Boot và ưu điểm</li>
              <li class="topic-item">Cấu trúc dự án Spring Boot</li>
              <li class="topic-item">Spring Boot Auto-configuration</li>
              <li class="topic-item">Application Properties và Profiles</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/spring-boot/basics'" block>
              Tìm hiểu chi tiết
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-database</v-icon>
            Database & JPA
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Làm việc với cơ sở dữ liệu sử dụng Spring Data JPA.</p>
            <ul class="topic-list">
              <li class="topic-item">Cấu hình kết nối database</li>
              <li class="topic-item">Entity và Repository</li>
              <li class="topic-item">CRUD Operations</li>
              <li class="topic-item">Relationships và Query Methods</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/spring-boot/database'" block>
              Tìm hiểu chi tiết
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-api</v-icon>
            RESTful API
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Xây dựng RESTful API chuyên nghiệp với Spring Boot.</p>
            <ul class="topic-list">
              <li class="topic-item">REST principles và best practices</li>
              <li class="topic-item">Controller và Request Mapping</li>
              <li class="topic-item">Request/Response handling</li>
              <li class="topic-item">Validation và Error Handling</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/spring-boot/api'" block>
              Tìm hiểu chi tiết
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-shield-lock</v-icon>
            Security
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Bảo mật ứng dụng Spring Boot với Spring Security.</p>
            <ul class="topic-list">
              <li class="topic-item">Authentication và Authorization</li>
              <li class="topic-item">JWT Authentication</li>
              <li class="topic-item">Method Security</li>
              <li class="topic-item">CORS và CSRF Protection</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/spring-boot/security'" block>
              Tìm hiểu chi tiết
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <v-card class="project-section">
          <v-card-title class="text-h6">Dự án thực tế</v-card-title>
          <v-card-text>
            <p>Xây dựng một ứng dụng quản lý nhân sự hoàn chỉnh:</p>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>RESTful API cho quản lý nhân viên</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Authentication và Authorization</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Database design và JPA</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Testing và Deployment</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
// SpringBootView.vue
</script>

<style scoped>
.spring-boot-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.topic-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.topic-header {
  background: linear-gradient(135deg, #6A1B9A, #BA68C8);
  color: white;
  padding: 16px;
}

.topic-content {
  flex-grow: 1;
}

.topic-list {
  list-style-type: none;
  padding-left: 0;
}

.topic-item {
  padding: 8px 0;
  position: relative;
  padding-left: 20px;
}

.topic-item::before {
  content: "•";
  color: #6A1B9A;
  position: absolute;
  left: 0;
}

.project-section {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .spring-boot-view {
    padding: 10px;
  }
}
</style>