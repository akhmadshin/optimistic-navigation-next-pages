import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getQueryOptions } from '@/components/pages/HomePage/getQueryOptions';
import { ArticleCard } from '@/components/ArticleCard';

export const HomePostPage = ({children}: any) => {
  const {data: articles} = useQuery<unknown, unknown, { data: any[] }>({
    ...getQueryOptions(),
    placeholderData: [undefined, undefined]
  });

  if (!articles || !articles?.data) {
    return;
  }

  return (
    <div className="mt-16">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {articles.data.map((article, index) => (
          <ArticleCard article={article} key={index}/>
        ))}
      </div>
    </div>
  );
}
