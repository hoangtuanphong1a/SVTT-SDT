<template>
  <div class="home-view">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Hệ thống đào tạo chuyên nghiệp</h1>
        <p class="text-subtitle-1 mb-8">
          Chào mừng bạn đến với hệ thống đào tạo toàn diện về Java Core, Spring Boot và VueJS.
          Hệ thống được thiết kế theo mô hình hiện đại, giúp bạn phát triển kỹ năng từ cơ bản đến nâng cao.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="course-card">
          <v-card-title class="course-header">
            <v-icon left>mdi-language-java</v-icon>
            Java Core
          </v-card-title>
          <v-card-text class="course-content">
            <p class="mb-4">Khóa học Java Core trang bị kiến thức nền tảng về ngôn ngữ Java, từ cú pháp cơ bản đến lập trình hướng đối tượng.</p>
            <ul class="topic-list">
              <li class="topic-item">Cài đặt môi trường và chương trình đầu tiên</li>
              <li class="topic-item">Các khái niệm cơ bản: Object, Class, Method</li>
              <li class="topic-item">Vòng lặp và các lớp số</li>
              <li class="topic-item">Xử lý ngoại lệ và Collection Framework</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" to="/java-core" block>
              Khám phá Java Core
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="course-card">
          <v-card-title class="course-header">
            <v-icon left>mdi-spring</v-icon>
            Spring Boot
          </v-card-title>
          <v-card-text class="course-content">
            <p class="mb-4">Khóa học Spring Boot giúp bạn làm quen với framework backend hiện đại, xây dựng ứng dụng web và microservices.</p>
            <ul class="topic-list">
              <li class="topic-item">Tổng quan về Spring Boot</li>
              <li class="topic-item">Xây dựng ứng dụng CRUD</li>
              <li class="topic-item">Web Service: SOAP và RESTful</li>
              <li class="topic-item">Chuyển đổi sang mô hình microservices</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" to="/spring-boot" block>
              Khám phá Spring Boot
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="course-card">
          <v-card-title class="course-header">
            <v-icon left>mdi-vuejs</v-icon>
            VueJS
          </v-card-title>
          <v-card-text class="course-content">
            <p class="mb-4">Khóa học VueJS tập trung vào xây dựng frontend động với framework hiện đại và dễ học.</p>
            <ul class="topic-list">
              <li class="topic-item">Tổng quan VueJS và thiết lập môi trường</li>
              <li class="topic-item">Component và template</li>
              <li class="topic-item">Data binding và event handling</li>
              <li class="topic-item">Routing và lifecycle hooks</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" to="/vuejs" block>
              Khám phá VueJS
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <v-card class="training-overview">
          <v-card-title class="text-h5">Tổng quan chương trình đào tạo</v-card-title>
          <v-card-text>
            <p>Hệ thống đào tạo của chúng tôi được thiết kế theo mô hình hiện đại, kết hợp lý thuyết và thực hành để giúp học viên phát triển kỹ năng toàn diện.</p>
            <v-divider class="my-4"></v-divider>
            <v-row>
              <v-col cols="12" md="6">
                <h3 class="text-h6 mb-3">Đặc điểm nổi bật</h3>
                <v-list>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Học liệu cập nhật theo xu hướng công nghệ mới nhất</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Dự án thực tế giúp củng cố kiến thức</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="success">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Hỗ trợ từ cộng đồng và mentor</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="text-h6 mb-3">Lộ trình học tập</h3>
                <v-timeline dense>
                  <v-timeline-item small>
                    <template v-slot:icon>
                      <v-icon>mdi-numeric-1-circle</v-icon>
                    </template>
                    <v-card class="elevation-2">
                      <v-card-text>Java Core - Nền tảng lập trình</v-card-text>
                    </v-card>
                  </v-timeline-item>
                  <v-timeline-item small>
                    <template v-slot:icon>
                      <v-icon>mdi-numeric-2-circle</v-icon>
                    </template>
                    <v-card class="elevation-2">
                      <v-card-text>Spring Boot - Backend hiện đại</v-card-text>
                    </v-card>
                  </v-timeline-item>
                  <v-timeline-item small>
                    <template v-slot:icon>
                      <v-icon>mdi-numeric-3-circle</v-icon>
                    </template>
                    <v-card class="elevation-2">
                      <v-card-text>VueJS - Frontend động</v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
// HomeView.vue
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.course-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.course-header {
  background: linear-gradient(135deg, #1976D2, #82B1FF);
  color: white;
  padding: 16px;
}

.course-content {
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
  color: #1976D2;
  position: absolute;
  left: 0;
}

.training-overview {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .home-view {
    padding: 10px;
  }
}
</style>