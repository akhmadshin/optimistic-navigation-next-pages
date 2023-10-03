import { ParentComponent } from '@/types/general';
import { BlogItemPrePage } from '@/components/pages/BlogItemPage/BlogItemPrePage';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const BlogItemPostPage = dynamic(() => import('@/components/pages/BlogItemPage/BlogItemPostPage')
  .then((mod) => mod.BlogItemPostPage))

export const BlogItemPage: ParentComponent = () => {
  const router = useRouter();
  const slug = (router.query.slug || '') as string;
  return (
    <BlogItemPrePage slug={slug}>
      <BlogItemPostPage slug={slug}/>
    </BlogItemPrePage>
  );
}
