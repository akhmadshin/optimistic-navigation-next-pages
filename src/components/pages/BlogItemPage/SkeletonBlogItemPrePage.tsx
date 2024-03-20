import { ParentComponent } from '@/types/general';
import { Container } from '@/components/Container';
import { SkeletonText } from '@/components/skeletons/SkeletonText';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { SkeletonDescription } from '@/components/skeletons/SkeletonDescription';
import { SkeletonBlogItemPostPage } from '@/components/pages/BlogItemPage/SkeletonBlogItemPostPage';

export const SkeletonBlogItemPrePage: ParentComponent = ({ children }) => {
  return (
    <Container className="">
      <div className="flex flex-col space-y-8 dark:text-gray-50">
        <div className="flex flex-col  space-y-6">
          <SkeletonText as="h1" className="leading-tight text-5xl font-bold" width="65%"/>
          <div className="relative w-full banner-img">
            <SkeletonImage width={16} height={9} />
          </div>
        </div>
        <div className="dark:text-gray-100">
          <SkeletonDescription />
          <SkeletonBlogItemPostPage />
        </div>

      </div>
    </Container>
  );
}