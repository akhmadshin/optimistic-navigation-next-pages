import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getQueryOptions } from '@/components/pages/HomePage/getQueryOptions';
import { ArticleCard } from '@/components/ArticleCard';

export const HomePostPage = ({ children }: any) => {
	const { data: articles } = useQuery<unknown, unknown, any[]>({
		...getQueryOptions(),
		placeholderData: [undefined, undefined]
	});

	if (!articles) {
		return;
	}

	return (
		<div className="mt-16 sm:mt-32">
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
				{articles.map((article, index) => (
					<ArticleCard article={article} key={index} />
				))}
			</div>
			{children}
		</div>
	);
}
