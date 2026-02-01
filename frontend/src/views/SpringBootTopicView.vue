<template>
  <div class="topic-view">
    <v-row>
      <v-col cols="12">
        <v-btn
          color="primary"
          class="mb-4"
          @click="$router.push('/spring-boot')"
          prepend-icon="mdi-arrow-left"
        >
          Quay lại Spring Boot
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="topic-card">
          <v-card-title class="topic-header">
            <v-icon left>mdi-spring</v-icon>
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
    title: 'Spring Boot Basics',
    description: 'Làm quen với Spring Boot, cấu trúc dự án và các khái niệm cơ bản.',
    content: [
      { title: 'Spring Boot Overview', description: 'Giới thiệu về Spring Boot và các ưu điểm.' },
      { title: 'Project Structure', description: 'Cấu trúc dự án Spring Boot chuẩn.' },
      { title: 'Auto-configuration', description: 'Hiểu về cơ chế tự động cấu hình của Spring Boot.' },
      { title: 'Properties Configuration', description: 'Cấu hình ứng dụng qua application.properties.' }
    ],
    example: `@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`,
    exercises: [
      { title: 'Bài tập 1', description: 'Tạo một Spring Boot project đơn giản.' },
      { title: 'Bài tập 2', description: 'Cấu hình application.properties cho database.' },
      { title: 'Bài tập 3', description: 'Tạo REST endpoint đơn giản.' }
    ]
  },
  database: {
    title: 'Database & JPA',
    description: 'Làm việc với cơ sở dữ liệu sử dụng Spring Data JPA.',
    content: [
      { title: 'Database Configuration', description: 'Cấu hình kết nối database trong Spring Boot.' },
      { title: 'Entity Classes', description: 'Tạo các entity class ánh xạ với bảng database.' },
      { title: 'Repository Interface', description: 'Sử dụng Spring Data JPA repository.' },
      { title: 'CRUD Operations', description: 'Thực hiện các thao tác CRUD cơ bản.' }
    ],
    example: `@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    
    // Constructors, getters, setters
}

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
}`,
    exercises: [
      { title: 'Bài tập 1', description: 'Tạo entity cho bảng Product.' },
      { title: 'Bài tập 2', description: 'Tạo repository với các method custom.' },
      { title: 'Bài tập 3', description: 'Thực hiện các thao tác CRUD trên entity.' }
    ]
  },
  api: {
    title: 'RESTful API',
    description: 'Xây dựng RESTful API chuyên nghiệp với Spring Boot.',
    content: [
      { title: 'REST Principles', description: 'Hiểu về các nguyên tắc RESTful.' },
      { title: 'Controller Design', description: 'Thiết kế controller theo best practices.' },
      { title: 'Request/Response Handling', description: 'Xử lý request và response.' },
      { title: 'Validation', description: 'Xác thực dữ liệu đầu vào.' }
    ],
    example: `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User createdUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}`,
    exercises: [
      { title: 'Bài tập 1', description: 'Tạo REST API cho quản lý sản phẩm.' },
      { title: 'Bài tập 2', description: 'Thêm validation cho các field.' },
      { title: 'Bài tập 3', description: 'Xử lý exception trong controller.' }
    ]
  },
  security: {
    title: 'Security',
    description: 'Bảo mật ứng dụng Spring Boot với Spring Security.',
    content: [
      { title: 'Authentication', description: 'Cơ chế xác thực người dùng.' },
      { title: 'Authorization', description: 'Phân quyền truy cập tài nguyên.' },
      { title: 'JWT Token', description: 'Sử dụng JWT cho authentication.' },
      { title: 'Security Configuration', description: 'Cấu hình bảo mật cho ứng dụng.' }
    ],
    example: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults());
        return http.build();
    }
}`,
    exercises: [
      { title: 'Bài tập 1', description: 'Cấu hình Spring Security cơ bản.' },
      { title: 'Bài tập 2', description: 'Tạo JWT authentication filter.' },
      { title: 'Bài tập 3', description: 'Phân quyền theo role cho các endpoint.' }
    ]
  }
}

const topicTitle = computed(() => {
  const topic = route.params.topic
  return topicData[topic]?.title || 'Spring Boot Topic'
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
  background: linear-gradient(135deg, #6A1B9A, #BA68C8);
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
  border-left: 4px solid #6A1B9A;
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