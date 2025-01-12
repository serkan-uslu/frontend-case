import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Container from '@mui/material/Container';
import { MovieList } from './pages/list/index';
import { MovieDetails } from './pages/detail/index';
import { store } from './store';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { ThemeToggle } from './components/theme-toggle';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const AppContent = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#F50057',
          },
          secondary: {
            main: '#19857b',
          },
          error: {
            main: red.A400,
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </React.StrictMode>
  );
}
