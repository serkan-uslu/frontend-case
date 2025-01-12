import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleTheme } from '../../store/slices/themeSlice';

export const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <IconButton
      onClick={() => dispatch(toggleTheme())}
      color="inherit"
      sx={{
        position: 'fixed',
        right: 16,
        top: { xs: 16, sm: 16 },
        bgcolor: 'background.paper',
        boxShadow: 2,
        zIndex: 1200,
        '&:hover': {
          bgcolor: 'background.paper',
          opacity: 0.9,
        },
      }}
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
