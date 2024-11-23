export interface PaginatedResponse<T> {
  data: {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
