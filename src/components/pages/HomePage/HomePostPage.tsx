import React from 'react';

import { ArticleCard } from '@/components/ArticleCard';
import { useStaticPageData } from '@/hooks/useStaticPageData';
import { Key, keyGetter } from '@/lib/keyGetter';

export const HomePostPage = ({children}: any) => {
  const {data: articles  } = useStaticPageData(keyGetter[Key.HOME]());

  if (!articles || !articles?.data) {
    return;
  }

  return (
    <div className="mt-16">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {articles.data.map((article: any, index: number) => (
          <ArticleCard article={article} priority={index === 0} key={index}/>
        ))}
      </div>
    </div>
  );
}
