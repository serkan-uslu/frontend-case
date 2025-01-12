import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { toggleTheme } from '../../store/slices/themeSlice';
import React from 'react';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 64 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <LocalMoviesIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                textDecoration: 'none',
              }}
            >
              Movie Search
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            onClick={() => dispatch(toggleTheme())}
            color="inherit"
            sx={{
              ml: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            {mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon
                sx={{
                  color: '#000',
                }}
              />
            )}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
