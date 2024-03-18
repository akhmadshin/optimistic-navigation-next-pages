import { ImageLoader, ImageLoaderProps, ImageProps } from 'next/image';
import NextImage from 'next/image';
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPngDataUri } from '@/lib/createPngDataUri';
import { requestIdleCallback } from '@/lib/request-idle-callback';
import { useClientLayoutEffect } from '@/hooks/useClientLayoutEffect';

type Props = ImageProps & {
  thumbhash: string;
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
      placeholder={blurDataURL as any}
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
  );
})

Image.displayName = 'Image';