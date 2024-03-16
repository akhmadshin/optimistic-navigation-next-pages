import { fetchAPI } from '@/lib/fetch-api';
import PageRouter from 'next/router';

export async function fetchArticles() {
  const res = await fetch(`http://localhost:3000/api/blog/`, {
    cache: 'no-cache',
  });
  const articles = (await res.json()) as any;
  return articles as any[];
}


export async function fetchArticle(slug: string) {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}/`, {cache: 'no-cache'});
  const article = (await res.json()) as any;
  return article;
}
export async function fetchArticleDirectly(slug: string) {
  const token = process.env.STRAPI_API_TOKEN;
  const path = `/articles/`;
  const urlParamsObject = {
    filters: {
      slug: slug,
    },
    populate: {
      thumbnail: {
        'url': true,
        'hash': true,
        'ext': true,
        'height': true,
        'width': true,
        'thumbhash': true,
        'alternativeText': true,
        'formats': true,
      },
      authorsBio: { populate: '*' },
      category: { fields: ['slug', 'name'] },
      blocks: { populate: '*' },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return fetchAPI(path, urlParamsObject, options).then((article) => article.data[0]).catch((e) => console.log(e));
}
