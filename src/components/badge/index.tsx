import { Chip, ChipProps } from '@mui/material';
import React from 'react';

export const Badge: React.FC<ChipProps> = ({ label, color }) => {
  return (
    <Chip
      label={label}
      size="small"
      color={color}
      sx={{
        borderRadius: 1,
        textTransform: 'capitalize',
      }}
    />
  );
};
