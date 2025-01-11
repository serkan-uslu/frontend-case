export class OMDbError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'OMDbError';
  }
}

export const isOMDbError = (error: any): error is OMDbError => {
  return error instanceof OMDbError;
};
