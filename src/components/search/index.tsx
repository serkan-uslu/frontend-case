import { GridView, ViewList, Clear } from '@mui/icons-material';
import {
  Box,
  Grid,
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
  InputAdornment,
  Typography,
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

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = currentYear; year >= 1888; year--) {
    years.push(year);
  }
  return years;
};

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
      // Boşlukları temizle ve minimum 3 karakter kontrolü yap
      const trimmedValue = value.trim();
      if (trimmedValue.length >= 3) {
        dispatch(setSearchTerm(trimmedValue));
      }
    }, 500),
    [dispatch]
  );

  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'grid' | 'table'
  ) => {
    if (newMode !== null) {
      dispatch(setViewMode(newMode));
    }
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    dispatch(setType(event.target.value as 'movie' | 'series' | 'episode' | ''));
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setLocalYear(value);
    dispatch(setYear(value));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    dispatch(setRowsPerPage(event.target.value as number));
  };

  const handleLocalSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Başlangıçtaki boşlukları kaldır
    const value = event.target.value.trimStart();
    setLocalSearch(value);

    // Boş string kontrolü ve minimum 3 karakter kontrolü
    const trimmedValue = value.trim();
    if (trimmedValue === '') {
      dispatch(setSearchTerm(''));
    } else if (trimmedValue.length >= 3) {
      handleSearchChange({ ...event, target: { ...event.target, value } });
    }
  };

  React.useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  React.useEffect(() => {
    setLocalYear(year);
  }, [year]);

  const searchSection = (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Search Movies/Series/Episodes
      </Typography>
      <TextField
        size="small"
        fullWidth
        value={localSearch}
        placeholder="Enter at least 3 characters"
        onChange={handleLocalSearchChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        label={null}
        inputProps={{
          spellCheck: 'false',
          minLength: 3,
        }}
        InputProps={{
          endAdornment: localSearch ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={() => {
                  setLocalSearch('');
                  dispatch(setSearchTerm(''));
                }}
                edge="end"
                size="small"
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );

  const typeSection = (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Type
      </Typography>
      <Select
        size="small"
        fullWidth
        value={type}
        onChange={handleTypeChange}
        displayEmpty
        variant="outlined"
      >
        <MenuItem value="">
          <em>All Types</em>
        </MenuItem>
        {TYPE_OPTIONS.map((option: string, index: number) => (
          <MenuItem value={option} key={index} sx={{ textTransform: 'capitalize' }}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );

  const yearSection = (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Release Date
      </Typography>
      <Select
        size="small"
        fullWidth
        value={localYear}
        onChange={handleYearChange}
        displayEmpty
        variant="outlined"
        endAdornment={
          localYear ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear year"
                onClick={(e) => {
                  e.stopPropagation();
                  setLocalYear('');
                  dispatch(setYear(''));
                }}
                size="small"
                sx={{ mr: 2 }}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ) : null
        }
      >
        <MenuItem value="">
          <em>All Years</em>
        </MenuItem>
        {generateYearOptions().map((year) => (
          <MenuItem key={year} value={year.toString()}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );

  const filterContent = (
    <>
      <Grid item xs={12} sm={2}>
        {yearSection}
      </Grid>
      <Grid item xs={12} sm={2}>
        {typeSection}
      </Grid>
    </>
  );

  return (
    <Box
      sx={{
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
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            <Grid item sm={5}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    View Mode
                  </Typography>
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
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};
