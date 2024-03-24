import { ImageProps } from 'next/image';
import NextImage from 'next/image';
import { forwardRef } from 'react';

type Props = Omit<ImageProps, 'alt'> & {
  alt?: string;
}

export const Image = forwardRef<HTMLImageElement, Props>(({
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
      ref={ref}
      {...props}
    />
  );
})

Image.displayName = 'Image';