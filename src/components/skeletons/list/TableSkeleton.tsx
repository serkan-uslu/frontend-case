import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Skeleton,
} from '@mui/material';
import { TableSkeletonProps } from '../../../types';

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rowsPerPage }) => (
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
