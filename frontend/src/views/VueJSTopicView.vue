<template>
  <div class="topic-view">
    <v-row>
      <v-col cols="12">
        <v-btn
          color="primary"
          class="mb-4"
          @click="$router.push('/vuejs')"
          prepend-icon="mdi-arrow-left"
        >
          Quay lại VueJS
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-vuejs</v-icon>
            {{ topicTitle }}
          </v-card-title>
          <v-card-text class="topic-content">
            <div class="content-section">
              <h3 class="text-h6 mb-4">Giới thiệu</h3>
              <p>{{ topicDescription }}</p>
            </div>

            <div class="content-section">
              <h3 class="text-h6 mb-4">Nội dung học</h3>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(content, index) in topicContent"
                  :key="index"
                >
                  <v-expansion-panel-title>
                    {{ content.title }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    {{ content.description }}
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>

            <div class="content-section">
              <h3 class="text-h6 mb-4">Ví dụ minh họa</h3>
              <v-card variant="outlined" class="code-example">
                <v-card-title class="text-subtitle-1">Code Example</v-card-title>
                <v-card-text>
                  <pre><code>{{ topicExample }}</code></pre>
                </v-card-text>
              </v-card>
            </div>

            <div class="content-section">
              <h3 class="text-h6 mb-4">Bài tập thực hành</h3>
              <v-list>
                <v-list-item
                  v-for="(exercise, index) in topicExercises"
                  :key="index"
                  class="exercise-item"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ exercise.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ exercise.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const topicData = {
  basics: {
    title: 'Vue Basics',
    description: 'Làm quen với VueJS, cấu trúc ứng dụng và các khái niệm cơ bản.',
    content: [
      { title: 'Vue Instance', description: 'Hiểu về Vue instance và lifecycle.' },
      { title: 'Template Syntax', description: 'Cú pháp template và directives cơ bản.' },
      { title: 'Data Binding', description: 'Two-way data binding với v-model.' },
      { title: 'Computed Properties', description: 'Sử dụng computed properties cho tính toán.' }
    ],
    example: `<template>
  <div>
    <h1>{{ message }}</h1>
    <input v-model="message" />
    <p>Computed: {{ reversedMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const message = ref('Hello Vue!')
const reversedMessage = computed(() => {
  return message.value.split('').reverse().join('')
})
</script>`,
    exercises: [
      { title: 'Bài tập 1', description: 'Tạo ứng dụng hiển thị và thay đổi message.' },
      { title: 'Bài tập 2', description: 'Thêm computed property để xử lý dữ liệu.' },
      { title: 'Bài tập 3', description: 'Tạo form đơn giản với validation.' }
    ]
  },
  components: {
    title: 'Components',
    description: 'Xây dựng ứng dụng với các component độc lập và tái sử dụng.',
    content: [
      { title: 'Component Structure', description: 'Cấu trúc component và lifecycle hooks.' },
      { title: 'Props & Events', description: 'Truyền dữ liệu giữa các component.' },
      { title: 'Slots', description: 'Sử dụng slots cho content projection.' },
      { title: 'Component Communication', description: 'Các cách giao tiếp giữa component.' }
    ],
    example: `// ParentComponent.vue
<template>
  <div>
    <ChildComponent 
      :title="parentTitle" 
      @update-title="updateTitle"
    >
      <template #default>
        <p>Content from parent</p>
      </template>
    </ChildComponent>
  </div>
</template>

// ChildComponent.vue
<template>
  <div>
    <h2>{{ title }}</h2>
    <slot></slot>
    <button @click="emitUpdate">Update Title</button>
  </div>
</template>

<script setup>
defineProps(['title'])
const emit = defineEmits(['update-title'])

const emitUpdate = () => {
  emit('update-title', 'Updated from child')
}
</script>`,
    exercises: [
      { title: 'Bài tập 1', description: 'Tạo component hiển thị danh sách.' },
      { title: 'Bài tập 2', description: 'Thực hiện truyền dữ liệu cha-con.' },
      { title: 'Bài tập 3', description: 'Sử dụng slots để tùy chỉnh nội dung.' }
    ]
  },
  routing: {
    title: 'Routing',
    description: 'Xử lý điều hướng trong ứng dụng Single Page Application.',
    content: [
      { title: 'Vue Router Setup', description: 'Cấu hình và thiết lập Vue Router.' },
      { title: 'Route Parameters', description: 'Sử dụng route parameters và query params.' },
      { title: 'Nested Routes', description: 'Các route lồng nhau và named views.' },
      { title: 'Route Guards', description: 'Bảo vệ route với navigation guards.' }
    ],
    example: `// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'

const routes = [
  { path: '/', component: HomeView },
  { 
    path: '/user/:id', 
    component: UserView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

// UserView.vue
<template>
  <div>
    <h2>User ID: {{ id }}</h2>
  </div>
</template>

<script setup>
const props = defineProps(['id'])
</script>`,
    exercises: [
      { title: 'Bài tập 1', description: 'Tạo các route cơ bản cho ứng dụng.' },
      { title: 'Bài tập 2', description: 'Sử dụng route parameters.' },
      { title: 'Bài tập 3', description: 'Thêm route guards cho authentication.' }
    ]
  },
  state: {
    title: 'State Management',
    description: 'Quản lý trạng thái ứng dụng với Pinia.',
    content: [
      { title: 'Pinia Stores', description: 'Tạo và sử dụng Pinia stores.' },
      { title: 'State & Getters', description: 'Quản lý state và getters.' },
      { title: 'Actions', description: 'Thực hiện các hành động với actions.' },
      { title: 'State Persistence', description: 'Lưu trữ state vào localStorage.' }
    ],
    example: `// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null
  }),
  
  getters: {
    userCount: (state) => state.users.length
  },
  
  actions: {
    async fetchUsers() {
      const response = await fetch('/api/users')
      this.users = await response.json()
    },
    
    setCurrentUser(user) {
      this.currentUser = user
    }
  }
})

// Component sử dụng
<script setup>
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>`,
    exercises: [
      { title: 'Bài tập 1', description: 'Tạo store cho quản lý sản phẩm.' },
      { title: 'Bài tập 2', description: 'Thêm actions cho CRUD operations.' },
      { title: 'Bài tập 3', description: 'Lưu trữ state vào localStorage.' }
    ]
  }
}

const topicTitle = computed(() => {
  const topic = route.params.topic
  return topicData[topic]?.title || 'VueJS Topic'
})

const topicDescription = computed(() => {
  const topic = route.params.topic
  return topicData[topic]?.description || 'Topic description not available'
})

const topicContent = computed(() => {
  const topic = route.params.topic
  return topicData[topic]?.content || []
})

const topicExample = computed(() => {
  const topic = route.params.topic
  return topicData[topic]?.example || '// No example available'
})

const topicExercises = computed(() => {
  const topic = route.params.topic
  return topicData[topic]?.exercises || []
})
</script>

<style scoped>
.topic-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.topic-card {
  margin-bottom: 20px;
}

.topic-header {
  background: linear-gradient(135deg, #4CAF50, #81C784);
  color: white;
  padding: 16px;
}

.topic-content {
  padding: 20px;
}

.content-section {
  margin-bottom: 30px;
}

.code-example {
  background-color: #f5f5f5;
  border-left: 4px solid #4CAF50;
}

.code-example pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
}

.exercise-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}

.exercise-item:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .topic-view {
    padding: 10px;
  }
}
</style>