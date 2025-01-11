import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Container from '@mui/material/Container';
import { MovieList } from './pages/list/index';
import { MovieDetails } from './pages/detail/index';
import { store } from './store';
import React from 'react';

export default function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
