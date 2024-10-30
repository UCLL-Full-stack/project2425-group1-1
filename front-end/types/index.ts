export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string
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
  actualHours: number;
  product?: Product;
};

export type Sprint = {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  backlogItems: BacklogItem[];
};

export type Team = {
  id?: number;
  name: string;
  description: string;
  owner?: User;
  members?: User[];
  sprints?: Sprint[];
};
