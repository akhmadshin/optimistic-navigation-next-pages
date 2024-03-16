import { ImageLoader, ImageLoaderProps, ImageProps } from 'next/image';
import NextImage from 'next/image';
import { forwardRef, useEffect, useState } from 'react';
import { createPngDataUri } from '@/lib/createPngDataUri';
import { requestIdleCallback } from '@/lib/request-idle-callback';

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

  useEffect(() => {
    if (typeof window === 'undefined') {
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
      ref={ref}
      {...props}
    />
  );
})

Image.displayName = 'Image';