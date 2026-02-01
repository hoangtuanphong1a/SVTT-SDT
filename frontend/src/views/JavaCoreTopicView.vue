<template>
  <div class="topic-view">
    <v-row>
      <v-col cols="12">
        <v-btn
          color="primary"
          class="mb-4"
          @click="$router.push('/java-core')"
          prepend-icon="mdi-arrow-left"
        >
          Quay lại Java Core
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-code-braces</v-icon>
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const topicData = {
  setup: {
    title: 'Cài đặt môi trường Java',
    description: 'Hướng dẫn cài đặt JDK, thiết lập môi trường phát triển và viết chương trình Java đầu tiên.',
    content: [
      { title: 'Cài đặt JDK', description: 'Hướng dẫn cài đặt Java Development Kit phiên bản mới nhất.' },
      { title: 'Thiết lập IDE', description: 'Cấu hình IntelliJ IDEA hoặc Eclipse cho phát triển Java.' },
      { title: 'Chương trình đầu tiên', description: 'Viết và chạy chương trình "Hello World" đầu tiên.' },
      { title: 'Cấu trúc chương trình', description: 'Hiểu về cấu trúc cơ bản của một chương trình Java.' }
    ],
    example: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    exercises: [
      { title: 'Bài tập 1', description: 'Viết chương trình in ra tên và tuổi của bạn.' },
      { title: 'Bài tập 2', description: 'Viết chương trình tính tổng hai số nguyên.' },
      { title: 'Bài tập 3', description: 'Viết chương trình chuyển đổi nhiệt độ từ Celsius sang Fahrenheit.' }
    ]
  },
  oop: {
    title: 'Lập trình hướng đối tượng',
    description: 'Làm chủ các khái niệm lập trình hướng đối tượng: Class, Object, Inheritance, Polymorphism.',
    content: [
      { title: 'Class và Object', description: 'Hiểu về Class như là bản mẫu và Object là thể hiện.' },
      { title: 'Encapsulation', description: 'Đóng gói dữ liệu và phương thức trong một class.' },
      { title: 'Inheritance', description: 'Kế thừa tính chất từ class cha sang class con.' },
      { title: 'Polymorphism', description: 'Đa hình - cùng một phương thức nhưng có thể có nhiều cách thực hiện khác nhau.' }
    ],
    example: `public class Animal {
    protected String name;
    
    public void makeSound() {
        System.out.println("Some generic sound");
    }
}

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}`,
    exercises: [
      { title: 'Bài tập 1', description: 'Tạo class Student với các thuộc tính và phương thức.' },
      { title: 'Bài tập 2', description: 'Thực hiện kế thừa với class Vehicle và các lớp con.' },
      { title: 'Bài tập 3', description: 'Áp dụng đa hình trong chương trình quản lý động vật.' }
    ]
  },
  collections: {
    title: 'Collection Framework',
    description: 'Làm việc với các cấu trúc dữ liệu và Collection Framework trong Java.',
    content: [
      { title: 'List Interface', description: 'ArrayList, LinkedList và các thao tác trên List.' },
      { title: 'Set Interface', description: 'HashSet, TreeSet và đặc điểm của Set.' },
      { title: 'Map Interface', description: 'HashMap, TreeMap và lưu trữ key-value.' },
      { title: 'Algorithms', description: 'Các thuật toán sắp xếp và tìm kiếm trong Collections.' }
    ],
    example: `import java.util.*;

public class CollectionExample {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Orange");
        
        for (String fruit : list) {
            System.out.println(fruit);
        }
    }
}`,
    exercises: [
      { title: 'Bài tập 1', description: 'Thực hiện các thao tác CRUD trên ArrayList.' },
      { title: 'Bài tập 2', description: 'Sử dụng HashSet để loại bỏ phần tử trùng lặp.' },
      { title: 'Bài tập 3', description: 'Xây dựng từ điển Anh-Việt sử dụng HashMap.' }
    ]
  },
  exceptions: {
    title: 'Exception Handling',
    description: 'Xử lý ngoại lệ và lỗi trong Java để xây dựng ứng dụng ổn định.',
    content: [
      { title: 'Exception vs Error', description: 'Phân biệt giữa Exception và Error trong Java.' },
      { title: 'Try-catch-finally', description: 'Cấu trúc xử lý ngoại lệ cơ bản.' },
      { title: 'Custom Exceptions', description: 'Tạo các exception riêng cho ứng dụng.' },
      { title: 'Best Practices', description: 'Các quy tắc tốt nhất khi xử lý ngoại lệ.' }
    ],
    example: `public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero: " + e.getMessage());
        } finally {
            System.out.println("This will always execute");
        }
    }
    
    public static int divide(int a, int b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException("Division by zero is not allowed");
        }
        return a / b;
    }
}`,
    exercises: [
      { title: 'Bài tập 1', description: 'Xử lý ngoại lệ khi đọc file không tồn tại.' },
      { title: 'Bài tập 2', description: 'Tạo custom exception cho việc validate dữ liệu.' },
      { title: 'Bài tập 3', description: 'Xây dựng chương trình quản lý sinh viên với exception handling.' }
    ]
  }
}

const topicTitle = computed(() => {
  const topic = route.params.topic
  return topicData[topic]?.title || 'Java Core Topic'
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
  background: linear-gradient(135deg, #2E7D32, #81C784);
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
  border-left: 4px solid #2E7D32;
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