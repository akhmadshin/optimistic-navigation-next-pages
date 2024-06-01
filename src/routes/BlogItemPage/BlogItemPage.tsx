import { ParentComponent } from '@/types/general';
import { BlogItemPrePage } from '@/routes/BlogItemPage/BlogItemPrePage';
import dynamic from 'next/dynamic';
import { SkeletonBlogItemPostPage } from '@/routes/BlogItemPage/SkeletonBlogItemPostPage';

// With that lazy import and this structure (BlogItemPostPage is a child of BlogItemPrePage),
// when we prefetch '/blog/[slug]' page in the _app file, we load only BlogItemPrePage component.
const BlogItemPostPage = dynamic(() =>
  import('@/routes/BlogItemPage/BlogItemPostPage')
  .then((mod) => mod.BlogItemPostPage), {
  loading: () => <SkeletonBlogItemPostPage />
})

export const BlogItemPage: ParentComponent = () => {
  return (
    <BlogItemPrePage>
      <BlogItemPostPage />
    </BlogItemPrePage>
  );
}
