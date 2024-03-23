import {
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export interface APIResponseCollectionPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface APIResponseCollectionMetadata {
  pagination: APIResponseCollectionPagination;
}

export interface APIResponse<T> {
  id: number;
  data: T;
}

export interface APIResponseCollection<T> {
  data: T[];
  meta: APIResponseCollectionMetadata;
}

interface ArticleItemAttributes {
  "title": string,
  "description": BlocksContent,
  "slug": string,
  "content": BlocksContent,
  "thumbnail": {
    "data": {
      "id": number,
      "attributes": {
        "thumbhash": string,
        "name": "jakub_dziubak_Xt_Ud5_Si_X464_unsplash.jpg",
        "alternativeText": string | null,
        "height": number,
        "width": number
      }
    }
  }
}

export interface ArticleListItem {
  id: number,
  attributes: Omit<ArticleItemAttributes, 'content'>,
}

export type ArticleList = APIResponseCollection<ArticleListItem>;

export type ArticleItem = APIResponse<ArticleItemAttributes>;
