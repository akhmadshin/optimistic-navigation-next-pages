import React from 'react';

import { ArticleCard } from '@/components/ArticleCard';
import { usePageData } from '@/hooks/usePageData';

export const HomePostPage = () => {
  const {data: articles  } = usePageData();

  if (!articles || !articles?.data) {
    return;
  }

  return (
    <div className="mt-16">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
        {articles.data.map((article: any, index: number) => (
          <ArticleCard article={article} priority={index === 0} key={index}/>
        ))}
      </div>
    </div>
  );
}
