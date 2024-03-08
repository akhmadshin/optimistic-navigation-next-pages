import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import React from 'react';

interface Props {
  content: BlocksContent;
}
export const RichText: React.FC<Props> = ({ content }) => {
  return (
    <BlocksRenderer content={content} />
  )
}