import React, { useEffect, useRef, useState } from 'react';

import { Link } from '@/components/Link';
import { SkeletonArticleCard } from '@/components/ArticleCard/SkeletonArticleCard';
import { generateImgSrc, Image } from '@/components/Image/Image';
import { RichText } from '@/components/RichText';
import { ImageProps } from 'next/image';
import { ImgProps } from 'next/dist/shared/lib/get-img-props';

export const ArticleCard: React.FC<any> = (props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [prefetchImgAttributes, setPrefetchImgAttributes] = useState<ImgProps>()
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.addEventListener("mouseenter", (e) => {

      const imgAttr: ImgProps = {
        style: {},
        srcSet: generateImgSrc({
          width: window.innerWidth,
          src: `/${coverAttributes.name}`,
          sizes: '100vw',
        }) as string,
        src: `/${coverAttributes.name}`,
        sizes: '100vw',
        loading: 'lazy',
        width: coverAttributes.width,
        height: coverAttributes.height,
      };
      setPrefetchImgAttributes(imgAttr);
      console.log("mouseOver");
    }, { once: true });
  }, [containerRef])

  const handleClick = () => {
  }

  if (!props.article) {
    return <SkeletonArticleCard/>
  }

  const articleAttributes = props.article.attributes;
  const coverAttributes = articleAttributes.thumbnail.data?.attributes;

  const handleBeforeTransition = () => {
    if (imageRef.current) {
      // @ts-ignore
      imageRef.current.style.viewTransitionName = 'banner-img'
    }
  };
  const handleAfterTransition = () => {
    if (imageRef.current) {
      // @ts-ignore
      imageRef.current.style.viewTransitionName = '';
    }
  }
  const getDeviceSizeBySizesString = (sizes: string = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw') => {
    const size = sizes.split(', ')
  }




  return (
    <div ref={containerRef}>
      <article className="flex flex-col items-start justify-between card pointer-events-none">
        <div className="relative w-full">
          <Image
            priority={props.priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            ref={imageRef}
            thumbhash={coverAttributes.thumbhash}
            src={`/${coverAttributes.name}`}
            alt={coverAttributes.alternativeText}
            width={coverAttributes.width}
            height={coverAttributes.height}
            prefetchImgAttributes={prefetchImgAttributes}
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
        </div>
        <div className=" w-full">
          <h3
            className="mt-2 text-2xl font-bold line-clamp-3 4xl:text-regular-18 group-hover:text-gray-600"
          >
            <Link
              beforeTransition={handleBeforeTransition}
              afterTransition={handleAfterTransition}
              href={`/blog/${articleAttributes.slug}/`}
              onClick={handleClick}
              data={props.article}
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