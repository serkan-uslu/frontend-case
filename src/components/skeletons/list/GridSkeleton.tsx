import { Card, CardContent, Grid, Skeleton } from '@mui/material';
import React from 'react';
import { GridSkeletonProps } from '../../../types';

export const GridSkeleton: React.FC<GridSkeletonProps> = ({ rowsPerPage }) => (
  <Grid container spacing={2}>
    {[...Array(rowsPerPage)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Card sx={{ height: '100%' }}>
          <Skeleton variant="rectangular" height={300} />
          <CardContent>
            <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);
