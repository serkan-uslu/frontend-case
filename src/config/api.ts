export const API_BASE_URL = 'http://www.omdbapi.com';
export const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_OMDB_API_KEY is not defined in environment variables');
}

export const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
export const STALE_TIME = 60 * 1000; // 1 minute
