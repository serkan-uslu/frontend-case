import { GridView, ViewList } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMovieSearch } from '../hooks/useOMDb';
import { RootState } from '../store';
import {
  setPage,
  setRowsPerPage,
  setSearchTerm,
  setType,
  setViewMode,
  setYear,
} from '../store/slices/movieSlice';
import { MovieSearchResult } from '../types/omdb';
import { MovieListSkeleton } from './skeletons/MovieListSkeleton';

export const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchTerm, year, type, page, viewMode, rowsPerPage } = useSelector(
    (state: RootState) => state.movies
  );

  const { data, error, isLoading } = useMovieSearch({
    s: searchTerm,
    y: year || undefined,
    type: type || undefined,
    page,
    pageSize: rowsPerPage,
  });

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'grid' | 'table'
  ) => {
    if (newMode !== null) {
      dispatch(setViewMode(newMode));
    }
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    dispatch(setType(event.target.value as 'movie' | 'series' | 'episode' | ''));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setYear(event.target.value));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newRowsPerPage = event.target.value as number;
    dispatch(setRowsPerPage(newRowsPerPage));
    const maxPage = data ? Math.ceil(parseInt(data.totalResults) / newRowsPerPage) : 1;
    if (page > maxPage) {
      dispatch(setPage(maxPage));
    }
  };

  const handleRowClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  const totalPages = data ? Math.ceil(parseInt(data.totalResults) / rowsPerPage) : 0;

  const renderTableView = (movies: MovieSearchResult[]) => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Poster</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>IMDb ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.slice(0, rowsPerPage).map((movie) => (
            <TableRow
              key={movie.imdbID}
              hover
              onClick={() => handleRowClick(movie.imdbID)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>
                <CardMedia
                  component="img"
                  height="50"
                  image={
                    movie.Poster !== 'N/A'
                      ? movie.Poster
                      : 'https://placehold.co/600x400?text=Image+Not+Found'
                  }
                  alt={movie.Title}
                  sx={{ objectFit: 'cover' }}
                />
              </TableCell>
              <TableCell>{movie.Title}</TableCell>
              <TableCell>{movie.Year}</TableCell>
              <TableCell>{movie.Type}</TableCell>
              <TableCell>{movie.imdbID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderGridView = (movies: MovieSearchResult[]) => (
    <Grid container spacing={2}>
      {movies.slice(0, rowsPerPage).map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => handleRowClick(movie.imdbID)}>
              <CardMedia
                component="img"
                height="300"
                image={
                  movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://placehold.co/600x400?text=Image+Not+Found'
                }
                alt={movie.Title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.Year} • {movie.Type}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  IMDb: {movie.imdbID}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Search Movies"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label="Year"
            value={year}
            onChange={handleYearChange}
            variant="outlined"
            type="number"
            inputProps={{ min: 1888, max: new Date().getFullYear() }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Type" onChange={handleTypeChange}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="movie">Movies</MenuItem>
              <MenuItem value="series">TV Series</MenuItem>
              <MenuItem value="episode">Episodes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel>Items per page</InputLabel>
            <Select value={rowsPerPage} label="Items per page" onChange={handleRowsPerPageChange}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="view mode"
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridView />
              </ToggleButton>
              <ToggleButton value="table" aria-label="table view">
                <ViewList />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
      </Grid>

      {isLoading ? (
        <MovieListSkeleton viewMode={viewMode} rowsPerPage={rowsPerPage} />
      ) : (
        <>
          {data?.Search &&
            (viewMode === 'table' ? renderTableView(data.Search) : renderGridView(data.Search))}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              pt: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total results: {data?.totalResults || 0}
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Paper>
  );
};
