import { PaletteMode } from '@mui/material';

export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResponse {
  Search: MovieSearchResult[];
  totalResults: string;
  Response: 'True' | 'False';
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: 'True' | 'False';
}

export interface ErrorResponse {
  Response: 'False';
  Error: string;
}

export type SearchParams = {
  s?: string;
  type?: 'movie' | 'series' | 'episode';
  y?: string;
  page?: number;
  pageSize?: number;
};

export type MovieDetailsParams = {
  i?: string;
  t?: string;
  type?: 'movie' | 'series' | 'episode';
  y?: string;
  plot?: 'short' | 'full';
};

export interface MovieListState {
  searchTerm: string;
  year: string;
  type: 'movie' | 'series' | 'episode' | '';
  page: number;
  viewMode: 'grid' | 'table';
  rowsPerPage: number;
}

export interface EmptyStateProps {
  message?: string;
}

export const typeColors: Record<string, 'primary' | 'secondary' | 'success'> = {
  movie: 'primary',
  series: 'secondary',
  episode: 'success',
};

export interface OMDbError {
  name: 'OMDbError';
  message: string;
  statusCode: number;
}

export interface RenderGridViewProps {
  movies: MovieSearchResult[];
  rowsPerPage: number;
}

export interface ListSkeletonProps {
  viewMode: 'grid' | 'table';
  rowsPerPage: number;
}

export interface ThemeState {
  mode: PaletteMode;
}

export interface GridSkeletonProps {
  rowsPerPage: number;
}

export interface TableSkeletonProps {
  rowsPerPage: number;
}