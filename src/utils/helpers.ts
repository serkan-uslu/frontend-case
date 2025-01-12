import { OMDbError, SearchResponse, typeColors } from '../types';

export const getTotalPages = (data: SearchResponse | undefined, rowsPerPage: number): number => {
  if (!data?.totalResults) {
    return 0;
  }
  return Math.ceil(parseInt(data.totalResults) / rowsPerPage);
};

export const getTypeColor = (type: string) => {
  return typeColors[type.toLowerCase()] || 'default';
};

export const createOMDbError = (message: string, statusCode = 500): OMDbError => ({
  name: 'OMDbError',
  message,
  statusCode,
});

export const isOMDbError = (error: unknown): error is OMDbError => {
  return (
    typeof error === 'object' && error !== null && 'name' in error && error.name === 'OMDbError'
  );
};

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = currentYear; year >= 1888; year--) {
    years.push(year);
  }
  return years;
};
