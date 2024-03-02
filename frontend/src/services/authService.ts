import { httpClient } from '../lib/httpClient';
import {
  LoginUser,
  RegisterUser,
  RegisteredUser,
  User,
} from '../types/interfaces';

export const registerUser = async (userData: RegisterUser) => {
  const url = 'http://localhost:4000/users/register';
  return httpClient.post<RegisterUser, RegisteredUser>(url, userData);
};

export const loginUser = async (userData: RegisterUser) => {
  const url = 'http://localhost:4000/users/login';
  return httpClient.post<LoginUser, User>(url, userData);
};
