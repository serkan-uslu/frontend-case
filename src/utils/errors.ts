export type OMDbError = {
  name: 'OMDbError';
  message: string;
  statusCode: number;
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
