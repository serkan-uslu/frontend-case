import React from 'react';
import { Card, Grid, Skeleton, Box, CardContent } from '@mui/material';

export const DetailSkeleton: React.FC = () => {
  return (
    <Card>
      <Box sx={{ m: 2 }}>
        <Skeleton variant="rectangular" width={100} height={36} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" height={600} />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Skeleton variant="text" sx={{ fontSize: '2.125rem', mb: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Skeleton variant="rectangular" width={120} height={24} />
              <Skeleton variant="text" width={200} />
            </Box>

            <Skeleton variant="text" sx={{ mb: 2 }} />
            <Skeleton variant="text" sx={{ mb: 2 }} />
            <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {['Runtime', 'Genre', 'Director'].map((_, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Skeleton variant="text" width={100} />
                    <Skeleton variant="text" width="80%" />
                  </Box>
                ))}
              </Grid>

              <Grid item xs={12} sm={6}>
                {['Cast', 'Language', 'Awards'].map((_, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Skeleton variant="text" width={100} />
                    <Skeleton variant="text" width="80%" />
                  </Box>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
