import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { getQueryOptions } from '@/components/pages/HomePage/getQueryOptions';
import { HomePage } from '@/components/pages/HomePage';

export async function getServerSideProps() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getQueryOptions());

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default function Page() {
	return (
		<HomePage />
	)
}
