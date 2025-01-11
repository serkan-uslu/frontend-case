export const API_BASE_URL = 'http://www.omdbapi.com';
export const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_OMDB_API_KEY is not defined in environment variables');
}

export const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
export const STALE_TIME = 60 * 1000; // 1 minute

export const ROWS_PER_PAGE = 10;

export const DEFAULT_SEARCH_TERM = 'Pokemon';
export const DEFAULT_YEAR = '';
export const DEFAULT_TYPE = '';
export const DEFAULT_PAGE = 1;
export const DEFAULT_VIEW_MODE = 'grid';
