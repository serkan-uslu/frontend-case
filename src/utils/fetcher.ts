import { API_BASE_URL, API_KEY } from '../config/api';
import type { ErrorResponse } from '../types';
import { createOMDbError, isOMDbError } from '../utils/helpers';

export const fetcher = async <T>(endpoint: string): Promise<T> => {
  try {
    const cleanEndpoint = endpoint.replace(/^[/?]+/, '');
    const url = `${API_BASE_URL}?${cleanEndpoint.replace(/&?pageSize=\d+/, '')}&apikey=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw createOMDbError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data = await response.json();

    if (data.Response === 'False') {
      const errorData = data as ErrorResponse;
      throw createOMDbError(errorData.Error);
    }

    return data as T;
  } catch (error) {
    if (isOMDbError(error)) {
      throw error;
    }

    throw createOMDbError(error instanceof Error ? error.message : 'An unknown error occurred');
  }
};
