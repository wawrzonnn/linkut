export interface RegisterUser {
  email: string;
  password: string;
}

export interface RegisteredUser {
  id: number;
  email: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  links: ILink[];
}

export interface ILink {
  id: number;
  shortUrl: string;
  originalUrl: string;
  userId: number;
  expiresAt: Date;
  linkStats: ILinkStat[];
}

export interface ILinkStat {
  id: number;
  linkId: number;
  clickedAt: Date;
  referrer?: string;
}
