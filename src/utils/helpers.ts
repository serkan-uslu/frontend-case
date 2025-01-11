import { SearchResponse } from '../types/omdb';

export const getTotalPages = (data: SearchResponse | undefined, rowsPerPage: number): number => {
  if (!data?.totalResults) {
    return 0;
  }
  return Math.ceil(parseInt(data.totalResults) / rowsPerPage);
};
