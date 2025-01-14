export interface User {
  id: string;
  username: string;
  email: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  email: string;
  username: string;
  jwtoken: string;
}

export interface LoginProps {
  onLogin: (token: string, username: string, email: string) => void;
}

export interface UserProfileProps {
  username: string;
  email: string;
  token: string;
}
