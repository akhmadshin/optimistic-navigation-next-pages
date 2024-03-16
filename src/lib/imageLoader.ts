import { ImageLoaderProps } from 'next/image';

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  return `http://localhost:3000${src}?w=${width}&q=${quality || 75}`
}