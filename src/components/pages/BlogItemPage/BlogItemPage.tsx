import { ParentComponent } from '@/types/general';
import { BlogItemPrePage } from '@/components/pages/BlogItemPage/BlogItemPrePage';
import dynamic from 'next/dynamic';

const BlogItemPostPage = dynamic(() => import('@/components/pages/BlogItemPage/BlogItemPostPage')
  .then((mod) => mod.BlogItemPostPage))

export const BlogItemPage: ParentComponent = () => {
  return (
    <BlogItemPrePage>
      <BlogItemPostPage />
    </BlogItemPrePage>
  );
}
