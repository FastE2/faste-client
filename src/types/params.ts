export interface TParamsSearch extends TPagination {
  keyword?: string;
  categoryIds?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  order?: 'asc' | 'desc';
  orderBy?: 'popular' | 'new' | 'bestseller';
}

export interface TPagination {
  page?: number;
  limit?: number;
}
