<template>
  <div class="vuejs-view">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">VueJS - Frontend hiện đại</h1>
        <p class="text-subtitle-1 mb-8">
          VueJS là framework frontend nhẹ nhàng, dễ học và hiệu quả. 
          Khóa học này giúp bạn xây dựng các ứng dụng web động và responsive.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-vuejs</v-icon>
            Vue Basics
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Làm quen với VueJS, cấu trúc ứng dụng và các khái niệm cơ bản.</p>
            <ul class="topic-list">
              <li class="topic-item">Giới thiệu VueJS và ưu điểm</li>
              <li class="topic-item">Vue Instance và Options API</li>
              <li class="topic-item">Template syntax và directives</li>
              <li class="topic-item">Data binding và computed properties</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/vuejs/basics'" block>
              Tìm hiểu chi tiết
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-puzzle</v-icon>
            Components
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Xây dựng ứng dụng với các component độc lập và tái sử dụng.</p>
            <ul class="topic-list">
              <li class="topic-item">Component structure và lifecycle</li>
              <li class="topic-item">Props và Events</li>
              <li class="topic-item">Slots và scoped slots</li>
              <li class="topic-item">Component communication</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/vuejs/components'" block>
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
            <v-icon left>mdi-routes</v-icon>
            Routing
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Xử lý điều hướng trong ứng dụng Single Page Application.</p>
            <ul class="topic-list">
              <li class="topic-item">Vue Router setup và configuration</li>
              <li class="topic-item">Route parameters và query params</li>
              <li class="topic-item">Nested routes và named views</li>
              <li class="topic-item">Route guards và navigation</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/vuejs/routing'" block>
              Tìm hiểu chi tiết
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-state-machine</v-icon>
            State Management
          </v-card-title>
          <v-card-text class="topic-content">
            <p class="mb-4">Quản lý trạng thái ứng dụng với Pinia.</p>
            <ul class="topic-list">
              <li class="topic-item">Introduction to state management</li>
              <li class="topic-item">Pinia stores và state</li>
              <li class="topic-item">Getters và actions</li>
              <li class="topic-item">State persistence</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/vuejs/state'" block>
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
            <p>Xây dựng một ứng dụng quản lý công việc (Task Manager):</p>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>CRUD operations cho tasks</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Filtering và searching</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>State management với Pinia</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-circle-medium</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Responsive design và animations</v-list-item-title>
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
// VueJSView.vue
</script>

<style scoped>
.vuejs-view {
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
  background: linear-gradient(135deg, #4CAF50, #81C784);
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
  color: #4CAF50;
  position: absolute;
  left: 0;
}

.project-section {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .vuejs-view {
    padding: 10px;
  }
}
</style>