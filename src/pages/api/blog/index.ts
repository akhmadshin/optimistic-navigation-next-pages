// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { timeout } from '@/lib/utils';
import { articles } from '@/lib/data';
import { fetchAPI } from '@/lib/fetch-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  const { page, limit } = req.query;
  const pageNumber = Number(page) || 0;
  const limitNumber = Number(limit) || 10;
  const token = process.env.STRAPI_API_TOKEN;
  const path = `/articles`;

  const urlParamsObject = {
    sort: { createdAt: "desc" },
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
    },
    pagination: {
      start: pageNumber * limitNumber,
      limit: limitNumber,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articles = await fetchAPI(path, urlParamsObject, options);
  console.log('articles = ', articles);
  res.status(200).json(articles)

}
