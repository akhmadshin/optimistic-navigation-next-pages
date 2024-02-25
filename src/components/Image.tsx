import { Component } from '@/types/general';
import NextImage from 'next/image';
import { ImageProps } from 'next/dist/shared/lib/get-img-props';
import { forwardRef } from 'react';

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const { src, className = '', width, height, alt } = props;
  return (
    <NextImage
      ref={ref}
      src={src}
      className={`${className} aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover`}
      alt={alt}
      width={width}
      height={height}
    />
  )
})

Image.displayName = 'Image';