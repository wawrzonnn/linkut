import { ILink } from '../types/interfaces';
import { httpClient } from '../lib/httpClient';

export const getUserLinks = async (): Promise<ILink[]> => {
  const url = 'http://localhost:4000/links/mylinks';
  return httpClient.get<ILink[]>(url);
};

export const createShortLink = async (originalUrl: string) => {
  const url = 'http://localhost:4000/links';
  return httpClient.post<{ originalUrl: string }, ILink>(url, { originalUrl });
};
