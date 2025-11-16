export interface RegisterUserDto {
  email: string;
  password: string;
  fullName?: string;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

