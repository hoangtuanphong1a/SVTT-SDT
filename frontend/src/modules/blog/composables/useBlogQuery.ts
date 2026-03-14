import { useQuery } from '@tanstack/vue-query';

import { fetchBlogPostById, fetchBlogPosts } from '@/apis';
import { blogQueryKeys } from '@/apis/blog/query-keys';

export function useBlogPostsQuery() {
  return useQuery({
    queryKey: blogQueryKeys.lists(),
    queryFn: ({ signal }) => fetchBlogPosts(signal)
  });
}

export function useBlogPostQuery(id: string) {
  return useQuery({
    queryKey: blogQueryKeys.detail(id),
    queryFn: ({ signal }) => fetchBlogPostById(id, signal),
    enabled: !!id
  });
}
