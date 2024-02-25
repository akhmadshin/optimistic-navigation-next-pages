import { useQuery } from '@tanstack/react-query';
import { Component } from '@/types/general';
import getQueryOptions from '@/components/pages/BlogItemPage/getQueryOptions';
import SkeletonBlogItemPostPage from '@/components/pages/BlogItemPage/SkeletonBlogItemPostPage';
import { useEffect } from 'react';

interface Props {
  slug: string;
}

export const BlogItemPostPage: Component<Props> = ({slug}) => {
  const queryOptions = getQueryOptions(slug);

  const { data: article, isLoading, isFetching} = useQuery<unknown, unknown, any>({
    ...queryOptions,
    enabled: false,
  });

  if (isLoading || isFetching) {
    return <SkeletonBlogItemPostPage/>
  }

  return (
    <div className="mt-10">
      <div className="prose lg:prose-xl max-w-none dark:prose-invert" dangerouslySetInnerHTML={{__html: article?.content}} />
    </div>
  );
}