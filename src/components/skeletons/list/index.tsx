import React from 'react';
import {
  Grid,
  Skeleton,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

interface ListSkeletonProps {
  viewMode: 'grid' | 'table';
  rowsPerPage: number;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({ viewMode, rowsPerPage }) => {
  const renderTableSkeleton = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Poster</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>IMDb ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(rowsPerPage)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="rectangular" width={100} height={150} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={200} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={50} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={80} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={100} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderGridSkeleton = () => (
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

  return viewMode === 'table' ? renderTableSkeleton() : renderGridSkeleton();
};
