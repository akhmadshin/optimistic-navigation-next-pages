import React from 'react';
import { ParentComponent } from '@/types/general';
import { Container } from '@/components/Container';
import { Meta } from '@/components/Meta';
import { SkeletonBlogItemPrePage } from './SkeletonBlogItemPrePage';
import { Image } from '@/components/Image';
import { RichText } from '@/components/RichText';
import { usePageData } from '@/hooks/usePageData';
import { BlogItemPageProps } from '@/pages/blog/[slug]';

export const BlogItemPrePage: ParentComponent = ({ children}) => {
  const { data: article, isLoading, isFetching} = usePageData<BlogItemPageProps>();

  if (!article && (isLoading || isFetching)) {
    return (
      <SkeletonBlogItemPrePage>
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
              src={`/${coverAttributes.name}`}
              thumbhash={coverAttributes.thumbhash}
              alt={coverAttributes.alternativeText}
              width={coverAttributes.width}
              height={coverAttributes.height}
            />
          </div>
        </div>

        <div className="text-white text-xl">
          <RichText content={description} />
        </div>
        <div className="dark:text-gray-100">
          {children}
        </div>
      </article>
    </Container>
  )
}