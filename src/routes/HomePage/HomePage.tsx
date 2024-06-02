import React from 'react';
import dynamic from 'next/dynamic';

import { HomePrePage } from '@/routes/HomePage/HomePrePage';
import { PageRenderer } from '@/components/PageRenderer/PageRenderer';
import { SkeletonHomePostPage } from '@/routes/HomePage/SkeletonHomePostPage';

// With that lazy import and this structure (HomePostPage is a child of HomePrePage),
// when we prefetch '/blog/[slug]' page in the _app file, we load only BlogItemPrePage component.
const HomePostPage = dynamic(() => import('@/routes/HomePage/HomePostPage')
  .then((mod) => mod.HomePostPage), {
  loading: () => <SkeletonHomePostPage />
})


export const HomePage = () => {
  return (
    <PageRenderer
      postPageLoader={SkeletonHomePostPage}
      prePage={HomePrePage}
      postPage={HomePostPage}
    />
  );
}
