import { ParentComponent } from '@/types/general';
import { Container } from '@/components/Container';
import { Meta } from '@/components/Meta';
import { SkeletonBlogItemPrePage } from '@/components/pages/BlogItemPage/SkeletonBlogItemPrePage';
import { Image } from '@/components/Image/Image';
import SkeletonBlogItemPostPage from '@/components/pages/BlogItemPage/SkeletonBlogItemPostPage';
import React from 'react';
import { RichText } from '@/components/RichText/RichText';
import { usePageData } from '@/hooks/usePageData';

interface Props {
  slug: string;
}

export const BlogItemPrePage: ParentComponent<Props> = ({slug, children}) => {
  const { data: article, isLoading, isFetching} = usePageData();

  if (!article && (isLoading || isFetching)) {
    return (
      <SkeletonBlogItemPrePage>
        <SkeletonBlogItemPostPage />
        {children}
      </SkeletonBlogItemPrePage>
    );
  }

  if (!article) {
    return children;
  }


  const articleAttributes = article.attributes || {};
  const coverAttributes = articleAttributes.thumbnail?.data?.attributes || {};
  const {title, description} = articleAttributes;

  return (
    <Container>
      <Meta
        title={title}
        description=""
      />
      <article className="flex flex-col space-y-8 dark:text-gray-50">
        <div className="flex flex-col space-y-6">
          <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
          <div className="banner-img">
            <Image
              priority
              sizes="100vw"
              thumbhash={coverAttributes.thumbhash}
              src={`/${coverAttributes.name}`}
              alt={coverAttributes.alternativeText}
              width={coverAttributes.width}
              height={coverAttributes.height}
            />
          </div>
        </div>

        <div className="dark:text-gray-100">
          <RichText content={description} />
          {children}
        </div>
      </article>
    </Container>
  )
}