import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { CACHE_TIME, STALE_TIME } from '../config/api';
import type { SearchResponse, MovieDetails, SearchParams, MovieDetailsParams } from '../types';

const createQueryString = (params: Record<string, string | number | boolean>): string => {
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

  return useSWR<SearchResponse>(params.s ? queryString : null, fetcher, {
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
  });
};

export const useMovieDetails = (params: MovieDetailsParams) => {
  const queryString = createQueryString(params);

  return useSWR<MovieDetails>(params.i || params.t ? queryString : null, fetcher, {
    dedupingInterval: CACHE_TIME,
    revalidateOnFocus: false,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    suspense: false,
    onError: (error) => {
      console.error('Movie details error:', error);
    },
  });
};
