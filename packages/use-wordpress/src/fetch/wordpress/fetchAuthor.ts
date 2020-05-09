import { WpApiUser } from './wpApiTypes';
import fetch from 'isomorphic-unfetch';

/**
 * Get a page of users
 *
 * @param endpoint
 * @param page
 */
export const fetchUsers = async (
  endpoint: string,
  page: number = 1
): Promise<Array<WpApiUser>> => {
  return fetch(`${endpoint}/wp/v2/users?page=${page}`).then(r => r.json());
};

/**
 * Get one user
 *
 * @param userId
 * @param endpoint
 */
export const fetchUser = async (
  userId: number,
  endpoint: string
): Promise<WpApiUser> => {
  return fetch(`${endpoint}/wp/v2/users/${userId}`).then(r => r.json());
};

export const fetchUserBySlug = (
  endpoint: string,
  slug: string
): Promise<WpApiUser> => {
  return fetch(`${endpoint}/wp/v2/users?slug=${slug}`)
    .then(r => r.json())
    .then(r => r[0]);
};

export const fetchAuthor = fetchUser;
