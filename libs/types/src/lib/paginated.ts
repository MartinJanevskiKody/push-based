import { Product } from './product';

export interface PaginatedProducts {
  readonly products: readonly Product[];
  readonly total: number;
  readonly skip: number;
  readonly limit: number;
}

export interface ProductQuery {
  readonly limit?: number;
  readonly skip?: number;
  readonly select?: readonly string[];
  readonly sortBy?: string;
  readonly order?: 'asc' | 'desc';
}
