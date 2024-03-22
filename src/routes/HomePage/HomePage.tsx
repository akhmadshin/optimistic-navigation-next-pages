import React from 'react';
import dynamic from 'next/dynamic';

import { HomePrePage } from '@/routes/HomePage/HomePrePage';
import { PageRenderer } from '@/components/PageRenderer/PageRenderer';
import { SkeletonHomePostPage } from '@/routes/HomePage/SkeletonHomePostPage';

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
