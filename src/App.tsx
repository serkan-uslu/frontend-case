import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Container from '@mui/material/Container';
import { MovieList } from './components/MovieList';
import { store } from './store';
import * as React from 'react';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}
