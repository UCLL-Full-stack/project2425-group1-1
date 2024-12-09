export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string
};

export type Product = {
  id?: number;
  name: string;
  description: string;
  releaseDate: Date
};

export type BacklogItem = {
  id?: number;
  title: string;
  description: string;
  priority: number;
  estimatedHours: number;
  actualHours?: number;
};

export type Sprint = {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  backlogItems: BacklogItem[];
  product: Product;
};

export type Team = {
  id?: number;
  name: string;
  description: string;
  owner?: User;
  members?: User[];
  sprints?: Sprint[];
};

export type ErrorResponse = {
  error: string;
  message: string;
};

export type AuthRequest = {
  email?: string;
  password?: string;
};

export type AuthResponse = {
  token?: string;
  email?: string;
  role?: string;
};
