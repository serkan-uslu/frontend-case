import {
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DETAIL_ROUTE, IMAGE_NOT_FOUND } from '../../../config/api';
import { MovieSearchResult } from '../../../types/omdb';

export const RenderTableView: React.FC<{ movies: MovieSearchResult[]; rowsPerPage: number }> = (
  props
) => {
  const { movies, rowsPerPage } = props;
  const navigate = useNavigate();

  const handleRowClick = (imdbID: string) => {
    navigate(DETAIL_ROUTE + imdbID);
  };

  return (
    <TableContainer>
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
          {movies.slice(0, rowsPerPage).map((movie) => (
            <TableRow
              key={movie.imdbID}
              hover
              onClick={() => handleRowClick(movie.imdbID)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>
                <CardMedia
                  component="img"
                  height="50"
                  image={movie.Poster !== 'N/A' ? movie.Poster : IMAGE_NOT_FOUND}
                  alt={movie.Title}
                  sx={{ objectFit: 'cover' }}
                />
              </TableCell>
              <TableCell>{movie.Title}</TableCell>
              <TableCell>{movie.Year}</TableCell>
              <TableCell>{movie.Type}</TableCell>
              <TableCell>{movie.imdbID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
