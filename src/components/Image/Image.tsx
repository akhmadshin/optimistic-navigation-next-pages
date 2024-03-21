import { ImageProps } from 'next/image';
import NextImage from 'next/image';
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPngDataUri } from '@/lib/createPngDataUri';
import { requestIdleCallback } from '@/lib/request-idle-callback';
import { ImagePreload } from './ImagePreload';
import { ImgProps } from 'next/dist/shared/lib/get-img-props';
import { ImageConfig, ImageConfigComplete } from 'next/dist/shared/lib/image-config';
import imageLoader from '@/lib/imageLoader';

type Props = ImageProps & {
  thumbhash: string;
  prefetchImgAttributes?: ImgProps;
}

// @ts-ignore
const getWidths = ({ deviceSizes, imageSizes }: ImageConfig,
  width: number | undefined,
  sizes: string | undefined
): { widths: number[]; kind: 'w' | 'x' } => {
  // @ts-ignore
  const allSizes = [...deviceSizes, ...imageSizes].sort((a, b) => a - b)

  if (sizes) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g
    const percentSizes = []
    for (let match; (match = viewportWidthRe.exec(sizes)); match) {
      percentSizes.push(parseInt(match[2]))
    }
    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01
      // @ts-ignore
      return { widths: allSizes.filter((s) => s >= deviceSizes[0] * smallestRatio), kind: 'w' }
    }
    return { widths: allSizes, kind: 'w' }
  }
  if (typeof width !== 'number') {
    // @ts-ignore
    return { widths: deviceSizes, kind: 'w' }
  }

  // @ts-ignore
  const widths = [...new Set([width, width * 2 /*, width * 3*/].map((w) => allSizes.find((p) => p >= w) || allSizes[allSizes.length - 1])),]
  return { widths, kind: 'x' }
}

export const generateImgSrc = ({
  src,
  width,
  sizes,
}: { src: string; width: number; sizes: string }): string => {
  const config = process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete;
  const { widths, kind } = getWidths(config, width, sizes)
  return widths
    .map(
      (w, i) =>
        `${imageLoader({ src, width: w })} ${
          kind === 'w' ? w : i + 1
        }${kind}`
    )
    .join(', ')
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
  prefetchImgAttributes,
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
      {prefetchImgAttributes && (
        <ImagePreload
          isAppRouter={false}
          imgAttributes={prefetchImgAttributes}
        />
      )}

    </>
  );
})

Image.displayName = 'Image';