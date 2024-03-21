import { version } from 'react';
import ReactDOM from 'react-dom'
import { ImgProps } from 'next/dist/shared/lib/get-img-props';
import Head from 'next/head';

function getDynamicProps(
  fetchPriority?: string
): Record<string, string | undefined> {
  const [majorStr, minorStr] = version.split('.', 2)
  const major = parseInt(majorStr, 10)
  const minor = parseInt(minorStr, 10)
  if (major > 18 || (major === 18 && minor >= 3)) {
    // In React 18.3.0 or newer, we must use camelCase
    // prop to avoid "Warning: Invalid DOM property".
    // See https://github.com/facebook/react/pull/25927
    return { fetchPriority }
  }
  // In React 18.2.0 or older, we must use lowercase prop
  // to avoid "Warning: Invalid DOM property".
  return { fetchpriority: fetchPriority }
}

export const ImagePreload = ({
  isAppRouter,
  imgAttributes,
}: {
  isAppRouter: boolean
  imgAttributes: ImgProps
}) => {
  console.log('prefetchImgAttributes = ', imgAttributes);
  const opts = {
    as: 'image',
    imageSrcSet: imgAttributes.srcSet,
    imageSizes: imgAttributes.sizes,
    crossOrigin: imgAttributes.crossOrigin,
    referrerPolicy: imgAttributes.referrerPolicy,
    ...getDynamicProps(imgAttributes.fetchPriority),
  }

  if (isAppRouter && ReactDOM.preload) {
    // See https://github.com/facebook/react/pull/26940
    ReactDOM.preload(
      imgAttributes.src,
      // @ts-expect-error TODO: upgrade to `@types/react-dom@18.3.x`
      opts
    )
    return null
  }

  return (
    <Head>
      <link
        key={
          '__nimg-' +
          imgAttributes.src +
          imgAttributes.srcSet +
          imgAttributes.sizes
        }
        rel="preload"
        // Note how we omit the `href` attribute, as it would only be relevant
        // for browsers that do not support `imagesrcset`, and in those cases
        // it would cause the incorrect image to be preloaded.
        //
        // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
        href={imgAttributes.srcSet ? undefined : imgAttributes.src}
        {...opts}
      />
    </Head>
  )
}