export interface User {
  userId: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiLoginResponse {
  token: string;
  expiration: string;
  userid: string;
  username: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials, rememberMe: boolean) => Promise<AuthResponse>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}
