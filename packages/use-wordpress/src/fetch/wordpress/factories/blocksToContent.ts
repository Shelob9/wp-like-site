import { parse, Block } from '@wordpress/block-serialization-default-parser';

/**
 * Converts raw HTML to array of blocks
 *
 * @param html
 */
export const rawHtmlToBlocks = (html: string): Array<Block> => {
  const blocks = parse(html) as Array<Block>;
  return blocks && blocks.length ? blocks : [];
};

/**
 * Converts raw HTML containing blocks to rendered blocks
 *
 * @param html
 */
export const renderFromRawBlocks = (html: string): string => {
  const blocks = rawHtmlToBlocks(html);
  let output = '';
  blocks.forEach((block: Block) => {
    output = `${output}${block.innerHTML}`;
  });
  return output;
};
