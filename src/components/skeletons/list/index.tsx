import React from 'react';
import { TableSkeleton } from './TableSkeleton';
import { GridSkeleton } from './GridSkeleton';
import { ListSkeletonProps } from '../../../types';

export const ListSkeleton: React.FC<ListSkeletonProps> = ({ viewMode, rowsPerPage }) => {
  return viewMode === 'table' ? (
    <TableSkeleton rowsPerPage={rowsPerPage} />
  ) : (
    <GridSkeleton rowsPerPage={rowsPerPage} />
  );
};
