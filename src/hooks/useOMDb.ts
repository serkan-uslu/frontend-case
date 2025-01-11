import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { CACHE_TIME, STALE_TIME } from '../config/api';
import type { SearchResponse, MovieDetails, SearchParams, MovieDetailsParams } from '../types/omdb';

const createQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
};

export const useMovieSearch = (params: SearchParams) => {
  const queryString = createQueryString({
    ...params,
    pageSize: params.pageSize || 10,
  });

  return useSWR<SearchResponse>(
    // Remove the leading slash
    params.s ? queryString : null,
    fetcher,
    {
      dedupingInterval: CACHE_TIME,
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: STALE_TIME,
      suspense: false,
      onError: (error) => {
        console.error('Search error:', error);
      },
    }
  );
};

export const useMovieDetails = (params: MovieDetailsParams) => {
  const queryString = createQueryString(params);

  return useSWR<MovieDetails>(
    // Remove the leading slash
    params.i || params.t ? queryString : null,
    fetcher,
    {
      dedupingInterval: CACHE_TIME,
      revalidateOnFocus: false,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      suspense: false,
      onError: (error) => {
        console.error('Movie details error:', error);
      },
    }
  );
};
