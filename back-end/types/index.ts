export type Role = 'admin' | 'manager' | 'developer';

export type UserDTO = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
};

export type ProductDTO = {
  id?: number;
  name?: string;
  description?: string;
  releaseDate?: Date
};

export type BacklogItemDTO = {
  id?: number;
  title?: string;
  description?: string;
  priority?: number;
  estimatedHours?: number;
  actualHours?: number;
};

export type AuthRequest = {
  email?: string;
  password?: string;
};

export type AuthResponse = {
  token?: string;
  email?: string;
  role?: Role;
};

export type AuthPayload = {
  user_id: number;
  role: Role
};
