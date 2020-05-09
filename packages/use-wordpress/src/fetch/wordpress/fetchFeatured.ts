import { WpApiMedia } from './wpApiTypes';
import fetch from 'isomorphic-unfetch';

export const fetchFeatured = async (
  featuredId: number,
  endpoint: string
): Promise<WpApiMedia> => {
  return fetch(`${endpoint}/wp/v2/media/${featuredId}`).then(r => r.json());
};
