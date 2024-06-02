import { ImageProps } from 'next/image';
import NextImage from 'next/image';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { createPngDataUri } from './createPngDataUri';
import { requestIdleCallback } from '@/lib/request-idle-callback'
import { ImagePreload } from './ImagePreload';

type Props = Omit<ImageProps, 'alt'> & {
  thumbhash: string;
  alt?: string;
  prefetchSizes?: string;
}

export const Image = forwardRef<HTMLImageElement, Props>(({
  thumbhash,
  src,
  height,
  width,
  priority,
  style,
  alt,
  title,
  fill,
  prefetchSizes,
  className = 'lg:aspect-[16/9] object-cover aspect-[4/3] rounded-2xl bg-gray-100',
  ...props
}, ref) => {
  const [blurDataURL, setBlurDataURL] = useState<string | undefined>();

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !imgRef.current) {
      return;
    }
    if (imgRef.current.complete) {
      setBlurDataURL(undefined);

      return;
    }
    requestIdleCallback(() => {
      setBlurDataURL(createPngDataUri(thumbhash));
    });
  }, [])

  return (
    <>
      <NextImage
        priority={priority}
        fill={fill}
        className={`bg-no-repeat bg-gray-500 ${className}`}
        draggable={'false'}
        src={src}
        alt={alt || ''}
        title={title || ''}
        height={fill ? undefined : height}
        width={fill ? undefined : width}
        placeholder={blurDataURL as `data:image/${string}`}
        ref={(node) => {
          // @ts-ignore
          imgRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...props}
      />
      {prefetchSizes && (
        <ImagePreload
          isAppRouter={false}
          src={src as string}
          sizes={prefetchSizes}
          height={height}
          width={width}
        />
      )}

    </>
  );
})

Image.displayName = 'Image';