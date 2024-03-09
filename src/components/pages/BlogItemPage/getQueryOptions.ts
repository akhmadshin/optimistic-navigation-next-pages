import { fetchArticleDirectly } from '@/requests/articleRequests';

export default (slug: string) => {
  return {
    queryKey: ['blog', slug],
    queryFn: async () => fetchArticleDirectly(slug),
  }
}