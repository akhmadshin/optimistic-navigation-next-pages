import { SkeletonText } from '@/components/skeletons/SkeletonText';
import { Component } from '@/types/general';

export const SkeletonBlogItemPostPage: Component = () => {
  return (
    <div className="mt-10">
      <div className="prose lg:prose-xl max-w-none dark:prose-invert flex flex-col">
        <SkeletonText width="65%" as={'h2'} />
        <SkeletonText width="90%"/>
        <SkeletonText width="93%"/>
        <SkeletonText width="85%"/>
        <SkeletonText width="98%"/>
        <SkeletonText width="92%"/>
        <SkeletonText width="95%"/>
        <SkeletonText width="91%"/>
        <SkeletonText width="60%"/>
      </div>
    </div>
  );
}
