# Hướng dẫn cấu trúc dự án Frontend

Tài liệu mô tả chi tiết các file và folder trong dự án Vue 3.

---

## 📁 Cấu trúc tổng quan

```
frontend/
├── src/                    # Mã nguồn chính
├── dist/                   # Output build (tự sinh)
├── node_modules/           # Dependencies (tự sinh)
├── .vscode/               # Cấu hình VS Code
├── index.html             # Entry HTML
├── package.json           # Dependencies & scripts
├── vite.config.ts         # Cấu hình Vite
├── tsconfig.json          # Cấu hình TypeScript
├── tailwind.config.js     # Cấu hình Tailwind CSS
├── postcss.config.js      # Cấu hình PostCSS
├── eslint.config.js       # Cấu hình ESLint
├── .env                   # Biến môi trường (local)
├── .env.example           # Mẫu biến môi trường
├── .env.prod              # Biến môi trường production
├── Dockerfile             # Docker dev
├── Dockerfile.prod        # Docker production
├── compose.yaml           # Docker Compose dev
├── compose.prod.yaml      # Docker Compose production
├── nginx.conf             # Cấu hình nginx (production)
└── doc.md                 # Tài liệu này
```

---

## 📂 Chi tiết từng thư mục

### `src/` – Mã nguồn chính

| Thư mục | Mô tả |
|---------|-------|
| `apis/` | Định nghĩa API, service, types theo domain |
| `assets/` | Hình ảnh, styles, tài nguyên tĩnh |
| `components/` | Components dùng chung (ui, vee-validate) |
| `composables/` | Vue composables tái sử dụng |
| `config/` | Cấu hình axios, env |
| `constants/` | Hằng số (routes, app constants) |
| `layouts/` | Layout (master, auth) |
| `locales/` | Đa ngôn ngữ (i18n) |
| `modules/` | Các module theo tính năng (home, blog, exception) |
| `router/` | Cấu hình Vue Router |
| `services/` | Http wrapper, app service |
| `stores/` | Pinia stores |
| `types/` | TypeScript types, declarations |
| `utils/` | Hàm tiện ích (validate, crypto, common) |

---

### `src/apis/` – API layer

Cấu trúc theo domain:

```
apis/
├── blog/
│   ├── blog-type.ts      # Interface BlogPost
│   ├── blog-api.ts       # Gọi HTTP (GET /api/v1/blog)
│   ├── blog-service.ts   # Xử lý response, chuẩn hóa data
│   └── query-keys.ts     # TanStack Query keys
└── index.ts              # Export các API
```

**Cách thêm API mới:**
1. Tạo folder `apis/<domain>/`
2. Thêm `*-type.ts`, `*-api.ts`, `*-service.ts`, `query-keys.ts`
3. Export trong `apis/index.ts`

---

### `src/assets/` – Tài nguyên

| File/Folder | Mô tả |
|-------------|-------|
| `styles/main.css` | CSS global, Tailwind imports |
| `images/` | Logo, hình ảnh |

---

### `src/config/` – Cấu hình

| File | Mô tả |
|------|-------|
| `env.ts` | Validate biến môi trường (Zod) |
| `axios.ts` | Instance Axios (baseURL, headers) |

---

### `src/constants/` – Hằng số

| File | Mô tả |
|------|-------|
| `app-route.ts` | Định nghĩa path routes (HOME, BLOG, BLOG_DETAIL) |
| `index.ts` | Export constants, System (Locale) |

---

### `src/layouts/` – Layout

| File | Mô tả |
|------|-------|
| `master-layout/AppMasterLayout.vue` | Layout chính (sidebar + header + content) |
| `master-layout/AppSidebar.vue` | Sidebar navigation |
| `master-layout/AppHeader.vue` | Header |
| `master-layout/AppContent.vue` | Vùng nội dung |
| `auth-layout/AuthLayout.vue` | Layout trang đăng nhập |

---

### `src/modules/` – Modules theo tính năng

```
modules/
├── home/
│   └── HomePage.vue           # Trang chủ (/)
├── blog/
│   ├── BlogPage.vue           # Danh sách blog (/blog)
│   ├── BlogDetailPage.vue     # Chi tiết blog (/blog/:id)
│   └── composables/
│       └── useBlogQuery.ts    # Composable gọi API blog
└── exception/
    ├── NotFound.vue           # 404
    └── Unauthorize.vue        # 403
```

---

### `src/router/` – Vue Router

| File | Mô tả |
|------|-------|
| `index.ts` | Định nghĩa routes, createRouter |

**Routes hiện tại:**
- `/` → HomePage
- `/blog` → BlogPage
- `/blog/:id` → BlogDetailPage
- `/:pathMatch(.*)*` → NotFound

---

### `src/services/` – Services

| File | Mô tả |
|------|-------|
| `Http.ts` | Wrapper Axios (get, post, put, delete) |
| `app-service.ts` | getLocale, setLocale |

---

### `src/locales/` – Đa ngôn ngữ

| File | Mô tả |
|------|-------|
| `index.ts` | Cấu hình vue-i18n |
| `constants.ts` | Locales enum (EN, KM) |
| `en.ts` | Bản dịch tiếng Anh |
| `km.ts` | Bản dịch tiếng Khmer |

---

### `src/utils/` – Tiện ích

| Thư mục | Mô tả |
|---------|-------|
| `validate/` | Schema Zod (auth, user, role) |
| `crypto/` | RSACipher, AESCipher |
| `common/` | arrayUtils, helpers |

---

## 📄 File cấu hình gốc

### `package.json`

| Script | Mô tả |
|--------|-------|
| `dev` | Chạy Vite dev server |
| `start` | Giống `dev` |
| `build` | Build production (vue-tsc + vite build) |
| `build-only` | Chỉ vite build |
| `build:prod` | Build với mode prod |
| `preview` | Xem bản build local |
| `lint` | Chạy ESLint |
| `format` | Format code với Prettier |

### `vite.config.ts`

- **Plugins:** Vue, Vue JSX, Vue DevTools
- **Alias:** `@` → `src/`
- **Proxy:** `/api` → `BASE_API_URL` (nếu có)
- **Define:** `process.env.APP_BASE_PATH`, `BASE_API_URL`, `MOCK_API`

### `.env` / `.env.example`

| Biến | Mô tả |
|------|-------|
| `APP_BASE_PATH` | Base path app (vd: `/`) |
| `BASE_API_URL` | URL backend API |
| `MOCK_API` | `true` = dùng mock data, không cần backend |

---

## 🐳 Docker

| File | Mô tả |
|-----|------|
| `Dockerfile` | Dev: Node + Vite (port 5173) |
| `Dockerfile.prod` | Prod: Build Vue + nginx (port 80) |
| `compose.yaml` | Docker Compose dev |
| `compose.prod.yaml` | Docker Compose production |
| `nginx.conf` | Cấu hình nginx cho SPA |

---

## 🚀 Lệnh thường dùng

```bash
# Cài đặt
pnpm install

# Development
pnpm dev
# hoặc
pnpm start

# Build
pnpm build
pnpm build:prod

# Preview build
pnpm preview

# Docker dev
docker compose up --build

# Docker production
docker compose -f compose.prod.yaml up --build
```

---

## 📌 Luồng dữ liệu API (ví dụ Blog)

1. **Component** gọi `useBlogPostsQuery()` hoặc `useBlogPostQuery(id)`
2. **Composable** dùng `useQuery` với `queryKey` và `queryFn`
3. **Service** `fetchBlogPosts()` gọi `fetchBlogPostsApi()`
4. **API** dùng `Http.get()` hoặc trả mock khi `MOCK_API=true`
5. **Axios** gửi request qua `config/axios.ts`
