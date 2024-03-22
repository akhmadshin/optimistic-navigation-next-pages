import { Component } from '@/types/general';
import React from 'react';
import { SkeletonArticleCard } from '@/components/ArticleCard/SkeletonArticleCard';

export const SkeletonHomePostPage: Component = () => {
  return (
    <div className="mt-16">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
        <SkeletonArticleCard/>
        <SkeletonArticleCard/>
        <SkeletonArticleCard/>
        <SkeletonArticleCard/>
        <SkeletonArticleCard/>
        <SkeletonArticleCard/>
      </div>
    </div>
  );
}
