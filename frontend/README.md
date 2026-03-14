# Frontend - Vue 3 Example

Dự án frontend mẫu dựa trên Vue 3 Enterprise Boilerplate. Chỉ giữ lại các file ví dụ.

## Cấu trúc

```
src/
├── apis/blog/          # Ví dụ API Blog (api, service, types, query-keys)
├── config/             # Axios, env
├── constants/          # Routes, constants
├── layouts/            # Master layout (sidebar, header, content)
├── modules/
│   ├── home/           # Trang chủ
│   ├── blog/           # Trang Blog + Blog Detail + composable useBlogQuery
│   └── exception/      # 404 Not Found
├── router/             # Vue Router
├── services/           # Http wrapper
├── stores/             # Pinia stores (trống)
└── types/              # TypeScript types
```

## Các trang ví dụ

- **Trang chủ** (`/`) - Giới thiệu và điều hướng
- **Blog** (`/blog`) - Danh sách bài viết (gọi API với TanStack Query)
- **Blog Detail** (`/blog/:id`) - Chi tiết bài viết

## Làm việc với API

Ví dụ trong `src/apis/blog/`:

1. **blog-type.ts** - Định nghĩa interface BlogPost
2. **blog-api.ts** - Gọi HTTP (hỗ trợ MOCK_API)
3. **blog-service.ts** - Xử lý response
4. **query-keys.ts** - TanStack Query keys
5. **useBlogQuery.ts** - Composable dùng useQuery

## Chạy dự án

```bash
npm install
npm run dev
```

## Cấu hình (.env)

- `APP_BASE_PATH` - Base path (mặc định "/")
- `BASE_API_URL` - URL API backend
- `MOCK_API` - "true" để dùng dữ liệu mock (không cần backend)
