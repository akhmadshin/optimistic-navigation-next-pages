import { Component } from '@/types/general';
import { SkeletonBlogItemPostPage } from '@/routes/BlogItemPage/SkeletonBlogItemPostPage';
import React from 'react';
import { RichText } from '@/components/RichText';
import { usePageData } from '@/hooks/usePageData';
import { UselessCalculations } from '@/components/UselessCalculations';
import { BlogItemPageProps } from '@/pages/blog/[slug]';

export const BlogItemPostPage: Component = () => {
  const { data: article, isLoading, isFetching} = usePageData<BlogItemPageProps>();

  if (isLoading || isFetching) {
    return <SkeletonBlogItemPostPage/>
  }

  if (!article) {
    return;
  }

  const articleAttributes = article.attributes;
  const { content } = articleAttributes;

  return (
    <div className="mt-10">
      <div className="prose lg:prose-xl max-w-none dark:prose-invert">
        <UselessCalculations />
        <RichText content={content} />
      </div>
    </div>

  );
}