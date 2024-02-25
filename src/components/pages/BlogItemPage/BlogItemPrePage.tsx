import { useQuery } from '@tanstack/react-query';

import { ParentComponent } from '@/types/general';
import getQueryOptions from '@/components/pages/BlogItemPage/getQueryOptions';
import { Container } from '@/components/Container';
import { Meta } from '@/components/Meta';
import { getPlaceholderData } from '@/lib/utils';
import { SkeletonBlogItemPrePage } from '@/components/pages/BlogItemPage/SkeletonBlogItemPrePage';
import { Image } from '@/components/Image';
import SkeletonBlogItemPostPage from '@/components/pages/BlogItemPage/SkeletonBlogItemPostPage';

interface Props {
  slug: string;
}

export const BlogItemPrePage: ParentComponent<Props> = ({slug, children}) => {
  const queryOptions = getQueryOptions(slug);
  const placeholderData = getPlaceholderData();

  const {data: article} = useQuery({
    ...queryOptions,
    placeholderData,
  });

  if (!article) {
    return (
      <SkeletonBlogItemPrePage>
        <SkeletonBlogItemPostPage />
      </SkeletonBlogItemPrePage>
    );
  }

  const {title, description} = article || {};
  const {height, width, url} = article?.cover?.data?.attributes as any || {};

  return (
    <Container>
      <Meta
        title={title}
        description={description}
      />
      <article className="flex flex-col space-y-8 dark:text-gray-50">
        <div className="flex flex-col space-y-6">
          <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
          <div className="banner-img">
            <Image
              alt=""
              className="w-full rounded-2xl bg-gray-100 object-cover"
              src={url}
              width={Number(width)}
              height={Number(height)}
            />
          </div>
        </div>

        <div className="dark:text-gray-100">
          <p>{description}</p>
          {children}
        </div>
      </article>
    </Container>
  )
}