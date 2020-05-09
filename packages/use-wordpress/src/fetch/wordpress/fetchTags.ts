import { WpApiTaxonomy } from './wpApiTypes';
import fetch from 'isomorphic-unfetch';

export const fetchTag = async (
  tagId: number,
  endpoint: string
): Promise<WpApiTaxonomy> => {
  return fetch(`${endpoint}/wp/v2/tags/${tagId}`).then(r => r.json());
};

export const fetchTags = async (
  tags: Array<number>,
  endpoint: string
): Promise<Array<WpApiTaxonomy>> => {
  return Promise.all(tags.map((tagId: number) => fetchTag(tagId, endpoint)));
};
