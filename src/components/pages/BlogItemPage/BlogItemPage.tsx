import { Component, ParentComponent } from '@/types/general';
import { BlogItemPrePage } from '@/components/pages/BlogItemPage/BlogItemPrePage';
import dynamic from 'next/dynamic';
import { PageRenderer } from '@/components/PageRenderer/PageRenderer';
import { SkeletonBlogItemPostPage } from '@/components/pages/BlogItemPage/SkeletonBlogItemPostPage';

const BlogItemPostPage = dynamic<Component>(() =>
  import('@/components/pages/BlogItemPage/BlogItemPostPage')
  .then((mod) => mod.BlogItemPostPage), {
  loading: () => <SkeletonBlogItemPostPage />
})

export const BlogItemPage: ParentComponent = () => {
  return (
    <PageRenderer
      deferPostPage={true}
      postPageLoader={SkeletonBlogItemPostPage}
      prePage={BlogItemPrePage}
      postPage={BlogItemPostPage}
    />
  );
}
