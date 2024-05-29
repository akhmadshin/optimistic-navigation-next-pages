import { ArticleCard } from '@/components/ArticleCard';
import React from 'react';
import { ArticleListApi } from '@/types/api';
import { Component } from '@/types/general';
import dynamic from 'next/dynamic';

const SkeletonArticleList = dynamic(
  () => import('./SkeletonArticleList').then((mod) => mod.SkeletonArticleList),
  { ssr: false },
);

interface Props {
  articles?: ArticleListApi
}
export const ArticleList: Component<Props> = ({ articles }) => {
  if (!articles) {
    return <SkeletonArticleList />
  }
  return (
    <div className="mt-16">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
        {articles.data.map((article, index) => (
          <ArticleCard article={article} priority={index === 0} key={index}/>
        ))}
      </div>
    </div>
  )
}