import { ImageLoaderProps } from 'next/image';

export default function imageLoader({ src, width }: ImageLoaderProps) {
  return `${src.replace('/', `/${width}_`)}`
}