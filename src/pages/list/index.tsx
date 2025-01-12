import { Alert, Box, Pagination, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RenderGridView } from '../../components/list/grid';
import { RenderTableView } from '../../components/list/table';
import { SearchControls } from '../../components/search';
import { ListSkeleton } from '../../components/skeletons/list';
import { useMovieSearch } from '../../hooks/useOMDb';
import { RootState } from '../../store';
import { setPage } from '../../store/slices/movieSlice';
import { MovieListState } from '../../types/omdb';
import { getTotalPages } from '../../utils/helpers';
import { EmptyState } from '../../components/empty-state';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

export const MovieList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { searchTerm, year, type, page, viewMode, rowsPerPage } = useSelector(
    (state: RootState) => state.movies
  ) as MovieListState;

  const { data, error, isLoading } = useMovieSearch({
    s: searchTerm,
    y: year || undefined,
    type: type || undefined,
    page,
    pageSize: rowsPerPage,
  });

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const WelcomeScreen = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
        opacity: 0.7,
      }}
    >
      <LocalMoviesIcon sx={{ fontSize: 100, color: 'text.secondary' }} />
      <Typography variant="h5" color="text.secondary" align="center">
        Search for movies, series, and episodes
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        Enter at least 3 characters to start searching
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        boxShadow: 'none',
        minHeight: '100vh',
        position: 'relative',
        pb: { xs: 8, sm: 2 },
        mt: { xs: -1, sm: 0 },
      }}
    >
      <SearchControls />

      {!searchTerm && <WelcomeScreen />}

      {searchTerm && error && (
        <EmptyState message="No movies found matching your search criteria" />
      )}

      {/* Loading Section */}
      {searchTerm && isLoading ? (
        <ListSkeleton viewMode={viewMode} rowsPerPage={rowsPerPage} />
      ) : (
        <>
          {/* Data Section */}
          {searchTerm &&
            !error &&
            data?.Search &&
            (viewMode === 'table' && !isMobile ? (
              <RenderTableView movies={data.Search} rowsPerPage={rowsPerPage} />
            ) : (
              <RenderGridView movies={data.Search} rowsPerPage={rowsPerPage} />
            ))}

          {/* Pagination Section */}
          {data?.Search && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
                gap: 1,
                pt: 4,
                position: { xs: 'fixed', sm: 'static' },
                bottom: { xs: 0, sm: 'auto' },
                left: { xs: 0, sm: 'auto' },
                right: { xs: 0, sm: 'auto' },
                backgroundColor: 'background.paper',
                borderTop: { xs: 1, sm: 0 },
                borderColor: 'divider',
                px: { xs: 2, sm: 0 },
                py: { xs: 1, sm: 0 },
                zIndex: 1,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'center', mb: 2 }}
              >
                Total results: {data?.totalResults || 0}
              </Typography>
              <Pagination
                count={getTotalPages(data, rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                siblingCount={isMobile ? 0 : 1}
                boundaryCount={isMobile ? 1 : 2}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
