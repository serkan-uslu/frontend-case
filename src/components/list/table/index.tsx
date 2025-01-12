import {
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DETAIL_ROUTE } from '../../../config/api';
import { MovieSearchResult } from '../../../types/omdb';
import { ImageNotFound } from '../../image-not-found';

// Tür renklerini tanımla
const typeColors: Record<string, 'primary' | 'secondary' | 'success'> = {
  movie: 'primary',
  series: 'secondary',
  episode: 'success',
};

export const RenderTableView: React.FC<{ movies: MovieSearchResult[]; rowsPerPage: number }> = (
  props
) => {
  const { movies, rowsPerPage } = props;
  const navigate = useNavigate();

  const handleRowClick = (imdbID: string) => {
    navigate(DETAIL_ROUTE + imdbID);
  };

  const getTypeColor = (type: string) => typeColors[type.toLowerCase()] || 'default';

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
                  image={
                    movie.Poster !== 'N/A'
                      ? movie.Poster
                      : ImageNotFound({ movieName: movie.Title })
                  }
                  alt={movie.Title}
                  sx={{ objectFit: 'cover', borderRadius: 1 }}
                />
              </TableCell>
              <TableCell>{movie.Title}</TableCell>
              <TableCell>
                <Chip label={movie.Year} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
              </TableCell>
              <TableCell>
                <Chip
                  label={movie.Type}
                  size="small"
                  color={getTypeColor(movie.Type)}
                  sx={{ borderRadius: 1, textTransform: 'capitalize' }}
                />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textDecoration: 'none',
                    backgroundColor: '#f5c518',
                    color: '#000',
                    borderRadius: 1,
                    p: 1,
                    fontWeight: 600,
                    fontSize: 14,
                    display: 'inline-block',
                    width: 'fit-content',
                    cursor: 'pointer',
                  }}
                >
                  {movie.imdbID}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
