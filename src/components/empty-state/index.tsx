import { Box, Typography, SvgIcon } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import React from 'react';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = (props: EmptyStateProps) => {
  const { message = 'No content found' } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        minHeight: 400,
      }}
    >
      <SvgIcon
        component={SearchOffIcon}
        sx={{
          fontSize: 64,
          color: 'text.secondary',
          mb: 2,
          opacity: 0.5,
        }}
      />
      <Typography variant="h6" color="text.secondary" align="center" sx={{ opacity: 0.8 }}>
        {message}
      </Typography>
    </Box>
  );
};
