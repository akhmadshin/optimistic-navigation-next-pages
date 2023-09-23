import { useQuery } from '@tanstack/react-query';
import { Component } from '@/types/general';
import getQueryOptions from '@/components/pages/BlogItemPage/getQueryOptions';
import SkeletonRichText from '@/components/skeletons/SkeletonRichText';

interface Props {
	slug: string;
}

export const BlogItemPostPage: Component<Props> = ({ slug }) => {
	const queryOptions = getQueryOptions(slug);

	const { data: article, isLoading, isFetching } = useQuery<unknown, unknown, any>({
		...queryOptions,
		enabled: false,
	});

	if (isLoading || isFetching) {
		return <SkeletonRichText />
	}

	return (
		<div className="mt-10">
			{article?.description}
			<div className="prose lg:prose-xl max-w-none dark:prose-invert">
				<div className="" dangerouslySetInnerHTML={{__html: article?.content}} />
			</div>
		</div>
	);
}