import type {BlocksContent} from "@strapi/blocks-react-renderer";

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
  attributes: T;
}

export interface APIResponseCollection<T> {
  data: T[];
  meta: APIResponseCollectionMetadata;
}

export interface ArticleItemAttributes {
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
        "alternativeText"?: string,
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

export type ArticleListApi = APIResponseCollection<ArticleListItem>;

export type ArticleItemApi = APIResponse<ArticleItemAttributes>;
