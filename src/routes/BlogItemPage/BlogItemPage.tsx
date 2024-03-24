import { Component } from '@/types/general';

import { Meta } from '@/components/Meta';
import { Image } from '@/components/Image';
import { RichText } from '@/components/RichText';
import { Container } from '@/components/Container';
import React from 'react';
import { UselessCalculations } from '@/components/UselessCalculations';
import { BlogItemPageProps } from '@/pages/blog/[slug]';

export const BlogItemPage: Component<BlogItemPageProps> = ({  attributes }) => {
  const articleAttributes = attributes || {};
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
              src={`/${coverAttributes.name}`}
              alt={coverAttributes.alternativeText}
              width={coverAttributes.width}
              height={coverAttributes.height}
            />
          </div>
        </div>

        <div className="dark:text-gray-100">
          <RichText content={description} />
          <div className="mt-10">
            <div className="prose lg:prose-xl max-w-none dark:prose-invert">
              <UselessCalculations />
              <RichText content={content} />
            </div>
          </div>
        </div>
      </article>
    </Container>
  );
}
