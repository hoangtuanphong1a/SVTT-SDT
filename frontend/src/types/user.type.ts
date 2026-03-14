export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  expiresAt?: number | null;
}

export interface UserStoreState {
  users: User[];
  currentUser: User | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}
