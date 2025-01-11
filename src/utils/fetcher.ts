import { API_BASE_URL, API_KEY } from '../config/api';
import { OMDbError } from './errors';
import type { ErrorResponse } from '../types/omdb';

export const fetcher = async <T>(endpoint: string): Promise<T> => {
  try {
    // Remove leading slash and question mark if present
    const cleanEndpoint = endpoint.replace(/^[/?]+/, '');
    const url = `${API_BASE_URL}?${cleanEndpoint}&apikey=${API_KEY}`;

    console.log('Fetching:', url); // Debug için

    const response = await fetch(url);

    if (!response.ok) {
      throw new OMDbError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data = await response.json();

    // Debug için
    console.log('Response:', data);

    // Check for API error response
    if (data.Response === 'False') {
      const errorData = data as ErrorResponse;
      throw new OMDbError(errorData.Error);
    }

    return data as T;
  } catch (error) {
    if (error instanceof OMDbError) {
      throw error;
    }

    throw new OMDbError(error instanceof Error ? error.message : 'An unknown error occurred');
  }
};
