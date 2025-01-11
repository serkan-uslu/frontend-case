import { GridView, ViewList } from '@mui/icons-material';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  Button,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { RootState } from '../../store';
import {
  setRowsPerPage,
  setSearchTerm,
  setType,
  setViewMode,
  setYear,
} from '../../store/slices/movieSlice';
import { ROWS_PER_PAGE_OPTIONS, TYPE_OPTIONS } from '../../config/api';

export const SearchControls: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();
  const { searchTerm, year, type, viewMode, rowsPerPage } = useSelector(
    (state: RootState) => state.movies
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = React.useState(searchTerm);
  const [localYear, setLocalYear] = React.useState(year);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(setSearchTerm(value));
    }, 500),
    [dispatch]
  );

  // Debounced year handler
  const debouncedYear = useCallback(
    debounce((value: string) => {
      dispatch(setYear(value));
    }, 500),
    [dispatch]
  );

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
    debouncedYear(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    dispatch(setRowsPerPage(event.target.value as number));
  };

  const handleLocalSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value);
    handleSearchChange(event);
  };

  const handleLocalYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalYear(event.target.value);
    handleYearChange(event);
  };

  React.useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  React.useEffect(() => {
    setLocalYear(year);
  }, [year]);

  const searchSection = (
    <>
      <TextField
        fullWidth
        label="Search Movies"
        value={localSearch}
        onChange={handleLocalSearchChange}
        variant="outlined"
      />
    </>
  );

  const typeSection = (
    <FormControl fullWidth>
      <InputLabel>Type</InputLabel>
      <Select value={type} label="Type" onChange={handleTypeChange}>
        {TYPE_OPTIONS.map((option: string, index: number) => (
          <MenuItem value={option} key={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const rowsPerPageSection = (
    <FormControl fullWidth>
      <InputLabel>Items per page</InputLabel>
      <Select value={rowsPerPage} label="Items per page" onChange={handleRowsPerPageChange}>
        {ROWS_PER_PAGE_OPTIONS.map((option: number, index: number) => (
          <MenuItem value={option} key={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const yearSection = (
    <TextField
      fullWidth
      label="Year"
      value={localYear}
      onChange={handleLocalYearChange}
      variant="outlined"
      type="number"
      inputProps={{ min: 1888, max: new Date().getFullYear() }}
    />
  );

  const filterContent = (
    <>
      <Grid item xs={12} sm={2}>
        {yearSection}
      </Grid>
      <Grid item xs={12} sm={2}>
        {typeSection}
      </Grid>
      <Grid item xs={12} sm={2}>
        {rowsPerPageSection}
      </Grid>
    </>
  );

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        backgroundColor: 'background.paper',
        pb: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={isMobile ? 10 : 12} sm={3}>
          {searchSection}
        </Grid>

        {isMobile ? (
          <>
            <Grid item xs={2}>
              <IconButton onClick={() => setIsFilterOpen(true)} sx={{ mt: 1 }}>
                <FilterListIcon />
              </IconButton>
            </Grid>
            <Drawer
              anchor="bottom"
              open={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              PaperProps={{
                sx: {
                  maxHeight: '80vh',
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {searchSection}
                  </Grid>
                  <Grid item xs={12}>
                    {typeSection}
                  </Grid>
                  <Grid item xs={12}>
                    {rowsPerPageSection}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => setIsFilterOpen(false)}
                      sx={{ mt: 2 }}
                    >
                      Apply Filters
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            {filterContent}
            <Grid item sm={3}>
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
          </>
        )}
      </Grid>
    </Box>
  );
};
