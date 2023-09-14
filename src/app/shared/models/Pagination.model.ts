export interface Pagination<T> {
  offset: number;
  currentPage: number;
  totalElements: number;
  totalPages: number;
  data: T[];
  dataLength: number;
  nextPage: number;
  prevPage: number;
}
