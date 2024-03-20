import React from 'react';
import dynamic from 'next/dynamic';

import { HomePrePage } from '@/components/pages/HomePage/HomePrePage';
import { PageRenderer } from '@/components/PageRenderer/PageRenderer';
import { SkeletonHomePostPage } from '@/components/pages/HomePage/SkeletonHomePostPage';

const HomePostPage = dynamic(() => import('@/components/pages/HomePage/HomePostPage')
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
