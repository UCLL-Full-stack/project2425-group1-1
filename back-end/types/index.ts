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
