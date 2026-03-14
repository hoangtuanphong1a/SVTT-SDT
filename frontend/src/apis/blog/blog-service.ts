import { fetchBlogPostByIdApi, fetchBlogPostsApi } from './blog-api';
import type { BlogPost } from './blog-type';

export async function fetchBlogPosts(signal?: AbortSignal) {
  const res = await fetchBlogPostsApi(signal);
  return res?.data ?? [];
}

export async function fetchBlogPostById(id: string, signal?: AbortSignal) {
  const res = await fetchBlogPostByIdApi(id, signal);
  return res?.data ?? null;
}
