import { Component } from '@/types/general';
import SkeletonBlogItemPostPage from '@/components/pages/BlogItemPage/SkeletonBlogItemPostPage';
import React from 'react';
import { RichText } from '@/components/RichText';
import { useStaticPageData } from '@/hooks/useStaticPageData';

interface Props {
  slug: string;
}

export const BlogItemPostPage: Component<Props> = ({slug}) => {
  const { data: article, isLoading, isFetching} = useStaticPageData(['blog', slug]);

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