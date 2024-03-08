import { ImageLoader, ImageLoaderProps, ImageProps } from 'next/image';
import NextImage from 'next/image';
import { forwardRef, useMemo } from 'react';
import { DeviceSize, ImageSize, strapiSizes } from './constants';
import { getStrapiMediaURL } from '@/lib/api-helpers';
import { createPngDataUri } from '@/lib/createPngDataUri';

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
  className = 'aspect-[16/9] rounded-2xl bg-gray-100',
  ...props
}, ref) => {
  const blurDataURL = thumbhash ? createPngDataUri(thumbhash) : undefined;
  const isServer = typeof window === 'undefined';

  return (
    <NextImage
      priority={priority}
      style={{
        ...style,
      }}
      fill={fill}
      className={`bg-no-repeat ${className}`}
      draggable={'false'}
      src={src}
      alt={alt || ''}
      title={title || ''}
      height={fill ? undefined : height}
      width={fill ? undefined : width}
      placeholder={blurDataURL as any || undefined}
      ref={ref}
      {...props}
    />
  );
})

Image.displayName = 'Image';