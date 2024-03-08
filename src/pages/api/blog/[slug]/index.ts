// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { timeout } from '@/lib/utils';
import { articles } from '@/lib/data';
import { fetchAPI } from '@/lib/fetch-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {slug} = req.query;
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
  return fetchAPI(path, urlParamsObject, options).then((article) => {
    res.status(200).json(article.data[0] || undefined)
  }).catch((e) => console.log(e));
}
