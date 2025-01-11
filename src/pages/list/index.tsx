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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 2 },
        boxShadow: 'none',
        minHeight: '100vh',
        position: 'relative',
        pb: { xs: 8, sm: 2 },
      }}
    >
      {/* Search Section */}
      <SearchControls />
      {/* Search Section */}

      {/* Error Section */}
      {error && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      )}
      {/* Error Section */}

      {/* Loading Section */}
      {isLoading ? (
        <ListSkeleton viewMode={viewMode} rowsPerPage={rowsPerPage} />
      ) : (
        <>
          {/* Data Section */}
          {!error &&
            data?.Search &&
            (viewMode === 'table' && !isMobile ? (
              <RenderTableView movies={data.Search} rowsPerPage={rowsPerPage} />
            ) : (
              <RenderGridView movies={data.Search} rowsPerPage={rowsPerPage} />
            ))}
          {/* Data Section */}

          {/* Pagination Section */}
          {data?.Search && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                pt: 2,
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
              {/* Pagination Section */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: { xs: 'none', sm: 'block' } }}
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
              {/* Pagination Section */}
            </Box>
          )}
          {/* Pagination Section */}
        </>
      )}
      {/* Loading Section */}
    </Paper>
  );
};
