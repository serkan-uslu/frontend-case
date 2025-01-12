import React from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { EmptyState } from '../empty-state';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <EmptyState message="No results found matching your search criteria" />
      <Button variant="contained" onClick={handleBack} sx={{ m: 2 }} startIcon={<ArrowBackIcon />}>
        Back to List
      </Button>
    </Box>
  );
};
