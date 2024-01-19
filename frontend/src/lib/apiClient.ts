import { httpClient } from './httpClient';

interface UserResponse {
  email: string;
}

export const apiClient = {
  getCurrentUser: async (): Promise<UserResponse | null> => {
    try {
      const user: UserResponse = await httpClient.get<UserResponse>(
        'http://localhost:4000/users/me',
      );
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
