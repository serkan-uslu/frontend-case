# Redux Implementation Documentation

## Overview
This document explains how Redux is implemented in the project for state management, particularly focusing on the movie search and filtering functionality.

## Store Structure

### Directory Structure
```
src/
├── store/
│   ├── index.ts                # Store configuration
│   └── slices/
│       └── movieSlice.ts       # Movie-related state management
```

## Store Configuration

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';

export const store = configureStore({
    reducer: {
        movies: movieReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Movie Slice State

### State Interface
```typescript
interface MovieListState {
    searchTerm: string;
    year: string;
    type: 'movie' | 'series' | 'episode' | '';
    page: number;
    viewMode: 'grid' | 'table';
    rowsPerPage: number;
}
```

### Initial State
```typescript
const initialState: MovieListState = {
    searchTerm: 'Pokemon',
    year: '',
    type: '',
    page: 1,
    viewMode: 'grid',
    rowsPerPage: 10,
};
```

## Available Actions

### Search and Filter Actions
```typescript
// Actions available in movieSlice
setSearchTerm: (state, action: PayloadAction<string>) => {
    state.searchTerm = action.payload;
    state.page = 1;  // Reset page when search changes
}

setYear: (state, action: PayloadAction<string>) => {
    state.year = action.payload;
    state.page = 1;
}

setType: (state, action: PayloadAction<'movie' | 'series' | 'episode' | ''>) => {
    state.type = action.payload;
    state.page = 1;
}
```

### Pagination and View Actions
```typescript
setPage: (state, action: PayloadAction<number>) => {
    state.page = action.payload;
}

setViewMode: (state, action: PayloadAction<'grid' | 'table'>) => {
    state.viewMode = action.payload;
}

setRowsPerPage: (state, action: PayloadAction<number>) => {
    state.rowsPerPage = action.payload;
    state.page = 1;
}
```

## Usage in Components

### Accessing State
```typescript
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Component = () => {
    const {
        searchTerm,
        year,
        type,
        page,
        viewMode,
        rowsPerPage,
    } = useSelector((state: RootState) => state.movies);
    
    // Use the state values...
};
```

### Dispatching Actions
```typescript
import { useDispatch } from 'react-redux';
import { setSearchTerm, setPage } from '../store/slices/movieSlice';

const Component = () => {
    const dispatch = useDispatch();
    
    // Dispatch actions
    const handleSearch = (term: string) => {
        dispatch(setSearchTerm(term));
    };
    
    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };
};
```

## State Persistence Between Routes

The Redux store maintains state when navigating between routes. This is particularly useful for:
- Preserving search results when viewing movie details
- Maintaining pagination state
- Keeping filter selections
- Remembering view mode preferences

### Example: Navigation with State Preservation
```typescript
// In MovieList.tsx
const handleRowClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
    // State is automatically preserved in Redux
};

// In MovieDetails.tsx
const handleBack = () => {
    navigate('/', { replace: true });
    // Previous state is restored from Redux
};
```

## Best Practices

1. **Action Dispatching**
   - Dispatch actions only when necessary
   - Use appropriate action types for state changes
   - Reset pagination when filters change

2. **State Selection**
   - Use specific selectors to avoid unnecessary re-renders
   - Select only the required state properties

3. **State Updates**
   - Keep state updates immutable
   - Use Redux Toolkit's built-in immer integration
   - Handle side effects appropriately

4. **Type Safety**
   - Maintain proper TypeScript types for all state and actions
   - Use RootState type for useSelector hooks
   - Define proper action payload types

## Common Patterns

### Resetting Page on Filter Changes
```typescript
// In movieSlice.ts
setSearchTerm: (state, action: PayloadAction<string>) => {
    state.searchTerm = action.payload;
    state.page = 1;  // Reset page
}
```

### Handling Multiple State Updates
```typescript
// In movieSlice.ts
setAllFilters: (state, action: PayloadAction<Partial<MovieListState>>) => {
    return { ...state, ...action.payload };
}
```

### Conditional State Updates
```typescript
const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newRowsPerPage = event.target.value as number;
    dispatch(setRowsPerPage(newRowsPerPage));
    
    // Update page if current page would be invalid
    const maxPage = Math.ceil(parseInt(totalResults) / newRowsPerPage);
    if (currentPage > maxPage) {
        dispatch(setPage(maxPage));
    }
};
```

## Debugging

1. **Redux DevTools**
   - Install Redux DevTools browser extension
   - Monitor state changes in real-time
   - Time-travel debugging available

2. **Action Logging**
   - All actions are automatically logged in DevTools
   - Track state changes with action payloads
   - Monitor side effects

## Future Considerations

1. **State Persistence**
   - Consider adding Redux Persist for local storage
   - Implement session storage for temporary state

2. **Performance Optimization**
   - Implement memoization where needed
   - Use selective state updates
   - Consider implementing Redux Toolkit's RTK Query

3. **Error Handling**
   - Add error states to the store
   - Implement global error handling
   - Add loading states for async actions 