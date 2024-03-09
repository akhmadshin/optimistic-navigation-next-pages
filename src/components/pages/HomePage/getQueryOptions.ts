import { fetchArticlesDirectly } from '@/requests/articleRequests';
import PageRouter from 'next/router';
import { hydrate } from '@tanstack/query-core';

export const getQueryOptions = () => ({
  queryKey: ['/'],
  queryFn: async () => fetchArticlesDirectly(),
})
