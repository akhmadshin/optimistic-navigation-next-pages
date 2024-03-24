import React, { useRef } from 'react';

import { Link } from '@/components/Link';
import { Image } from '@/components/Image/Image';
import { RichText } from '@/components/RichText';
import { ArticleListItem } from '@/types/api';

interface Props {
  article: ArticleListItem;
  priority: boolean;
}

export const ArticleCard: React.FC<Props> = ({ article, priority }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const articleAttributes = article.attributes;
  const coverAttributes = articleAttributes.thumbnail.data?.attributes;

  return (
    <div ref={containerRef}>
      <article className="flex flex-col items-start justify-between card pointer-events-none">
        <div className="relative w-full">
          <Image
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            ref={imageRef}
            src={`/${coverAttributes.name}`}
            alt={coverAttributes.alternativeText}
            width={coverAttributes.width}
            height={coverAttributes.height}
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
        </div>
        <div className=" w-full">
          <h3
            className="mt-2 text-2xl font-bold line-clamp-3 4xl:text-regular-18 group-hover:text-gray-600"
          >
            <Link
              href={`/blog/${articleAttributes.slug}/`}
              className={'pointer-events-auto card-link'}
            >
              {articleAttributes.title}
            </Link>
          </h3>
          <div className="relative z-10 mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-200">
            <RichText content={articleAttributes.description} />
          </div>
        </div>
      </article>
    </div>
  )
}