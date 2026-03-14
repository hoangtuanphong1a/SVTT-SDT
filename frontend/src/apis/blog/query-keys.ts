export const blogQueryKeys = {
  all: ['blog'] as const,
  lists: () => [...blogQueryKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...blogQueryKeys.lists(), filters] as const,
  details: () => [...blogQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...blogQueryKeys.details(), id] as const
};
