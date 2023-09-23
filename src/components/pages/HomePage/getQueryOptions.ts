import { fetchArticles } from '@/requests/articleRequests';

export const getQueryOptions = {
	queryKey: ["/"],
	queryFn: async () => fetchArticles(),
}