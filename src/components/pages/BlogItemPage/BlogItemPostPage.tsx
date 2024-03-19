import { Component } from '@/types/general';
import SkeletonBlogItemPostPage from '@/components/pages/BlogItemPage/SkeletonBlogItemPostPage';
import React from 'react';
import { RichText } from '@/components/RichText';
import { usePageData } from '@/hooks/usePageData';

export const BlogItemPostPage: Component = () => {
  const { data: article, isLoading, isFetching} = usePageData();

  if (isLoading || isFetching) {
    return <SkeletonBlogItemPostPage/>
  }

  const articleAttributes = article.attributes;
  const { content } = articleAttributes;


  return (
    <div className="mt-10">
      <div className="prose lg:prose-xl max-w-none dark:prose-invert">
        <RichText content={content} />
      </div>
    </div>
  );
}