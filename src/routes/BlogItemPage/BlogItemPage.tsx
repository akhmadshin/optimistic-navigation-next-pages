import { Component } from '@/types/general';
import { Meta } from '@/components/Meta';
import { Image } from '@/components/Image';
import { RichText } from '@/components/RichText';
import { Container } from '@/components/Container';
import React from 'react';
import { UselessCalculations } from '@/routes/BlogItemPage/UselessCalculations';

export const BlogItemPage: Component<any> = ({ article }) => {
  if (!article) {
    return undefined;
  }


  const articleAttributes = article.attributes || {};
  const coverAttributes = articleAttributes.thumbnail?.data?.attributes || {};
  const {title, description, content} = articleAttributes;

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
          <UselessCalculations />
          <div className="mt-10">
            <div className="prose lg:prose-xl max-w-none dark:prose-invert">
              <RichText content={content} />
            </div>
          </div>
        </div>
      </article>
    </Container>
  );
}
