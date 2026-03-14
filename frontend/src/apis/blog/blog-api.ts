import { env } from '@/config/env';
import { Http } from '@/services/Http';
import type { BlogPost } from './blog-type';

const API_ENDPOINT = '/api/v1/blog';

// Mock data khi MOCK_API=true (dùng JSONPlaceholder hoặc data tĩnh)
const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Vue 3 Composition API - Hướng dẫn cơ bản',
    slug: 'vue-3-composition-api',
    excerpt: 'Tìm hiểu về Composition API trong Vue 3',
    content: 'Nội dung chi tiết về Composition API...',
    author: 'Admin',
    publishedAt: '2024-01-15',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    title: 'TypeScript với Vue 3',
    slug: 'typescript-vue-3',
    excerpt: 'Cách sử dụng TypeScript trong dự án Vue',
    content: 'Nội dung chi tiết về TypeScript...',
    author: 'Admin',
    publishedAt: '2024-01-20',
    createdAt: '2024-01-18'
  },
  {
    id: '3',
    title: 'Vite - Build tool hiện đại',
    slug: 'vite-build-tool',
    excerpt: 'Vite giúp development nhanh hơn',
    content: 'Nội dung chi tiết về Vite...',
    author: 'Admin',
    publishedAt: '2024-02-01',
    createdAt: '2024-01-28'
  }
];

export async function fetchBlogPostsApi(signal?: AbortSignal) {
  if (env.MOCK_API === 'true') {
    return { data: MOCK_POSTS };
  }
  return await Http.get<SuccessResponse<BlogPost[]>>(API_ENDPOINT, undefined, { signal });
}

export async function fetchBlogPostByIdApi(id: string, signal?: AbortSignal) {
  if (env.MOCK_API === 'true') {
    const post = MOCK_POSTS.find((p) => p.id === id);
    return { data: post ?? null };
  }
  return await Http.get<SuccessResponse<BlogPost>>(`${API_ENDPOINT}/${id}`, undefined, { signal });
}
