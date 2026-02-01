<template>
  <div class="java-core-view">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Java Core - Lập trình hướng đối tượng</h1>
        <p class="text-subtitle-1 mb-8">
          Java là ngôn ngữ lập trình hướng đối tượng mạnh mẽ, được sử dụng rộng rãi trong phát triển ứng dụng doanh nghiệp.
          Khóa học này cung cấp nền tảng vững chắc về Java từ cơ bản đến nâng cao.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-code-braces</v-icon>
            Cài đặt môi trường
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Hướng dẫn cài đặt JDK, thiết lập môi trường phát triển và viết chương trình Java đầu tiên.</p>
            <ul class="topic-list">
              <li class="topic-item">Cài đặt JDK và cấu hình PATH</li>
              <li class="topic-item">Thiết lập IDE (IntelliJ IDEA, Eclipse)</li>
              <li class="topic-item">Viết và chạy chương trình "Hello World"</li>
              <li class="topic-item">Hiểu về cấu trúc chương trình Java</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/java-core/setup'" block>
              Tìm hiểu chi tiết
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-puzzle</v-icon>
            OOP Fundamentals
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Làm chủ các khái niệm lập trình hướng đối tượng: Class, Object, Inheritance, Polymorphism.</p>
            <ul class="topic-list">
              <li class="topic-item">Class và Object trong Java</li>
              <li class="topic-item">Encapsulation và Access Modifiers</li>
              <li class="topic-item">Inheritance và Polymorphism</li>
              <li class="topic-item">Abstract Class và Interface</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/java-core/oop'" block>
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
            <v-icon left>mdi-loop</v-icon>
            Vòng lặp và Collection
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Làm việc với các cấu trúc điều khiển và Collection Framework trong Java.</p>
            <ul class="topic-list">
              <li class="topic-item">Các loại vòng lặp: for, while, do-while</li>
              <li class="topic-item">Enhanced for loop và Iterator</li>
              <li class="topic-item">Collection Framework: List, Set, Map</li>
              <li class="topic-item">Các thuật toán sắp xếp và tìm kiếm</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/java-core/collections'" block>
              Tìm hiểu chi tiết
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-alert-circle</v-icon>
            Exception Handling
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Xử lý ngoại lệ và lỗi trong Java để xây dựng ứng dụng ổn định.</p>
            <ul class="topic-list">
              <li class="topic-item">Hiểu về Exception và Error</li>
              <li class="topic-item">Try-catch-finally blocks</li>
              <li class="topic-item">Custom Exception Classes</li>
              <li class="topic-item">Best practices trong xử lý ngoại lệ</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/java-core/exceptions'" block>
              Tìm hiểu chi tiết
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <v-card class="practice-section">
          <v-card-title class="text-h6">Thực hành</v-card-title>
          <v-card-text>
            <p>Để củng cố kiến thức, hãy thực hiện các bài tập sau:</p>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Viết chương trình quản lý sinh viên sử dụng OOP</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Thực hiện các bài tập về Collection Framework</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Viết chương trình xử lý file với exception handling</v-list-item-title>
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
// JavaCoreView.vue
</script>

<style scoped>
.java-core-view {
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
  background: linear-gradient(135deg, #2E7D32, #81C784);
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
  color: #2E7D32;
  position: absolute;
  left: 0;
}

.practice-section {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .java-core-view {
    padding: 10px;
  }
}
</style>