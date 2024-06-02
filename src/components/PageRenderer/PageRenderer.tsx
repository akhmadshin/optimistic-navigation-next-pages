import { Component, ParentComponent } from '@/types/general';
import { WithDeferOnSoftNavigation } from '@/hocs/WithDeferOnSoftNavigation';
import { ComponentType, useEffect } from 'react';

interface Props {
  prePage: ParentComponent;
  postPage?: ComponentType;
  postPageLoader: Component;
  deferPostPage?: boolean;
}

export const PageRenderer: Component<Props> = ({
  prePage: PrePage,
  postPage: PostPage,
  postPageLoader: PostPageLoader,
  deferPostPage = false,
}) => {
  useEffect(() => {
    // @ts-ignore
    PostPage?.render?.preload();
  }, [])

  return (
    <PrePage>
      {PostPage && (
        <WithDeferOnSoftNavigation loader={PostPageLoader} defer={deferPostPage}>
          <PostPage />
        </WithDeferOnSoftNavigation>
      )}
    </PrePage>
  )
}