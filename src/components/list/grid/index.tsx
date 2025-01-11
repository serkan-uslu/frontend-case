import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import { MovieSearchResult } from '../../../types/omdb';
import { DETAIL_ROUTE, IMAGE_NOT_FOUND } from '../../../config/api';
import { useNavigate } from 'react-router-dom';

export const RenderGridView: React.FC<{ movies: MovieSearchResult[]; rowsPerPage: number }> = (
  props
) => {
  const { movies, rowsPerPage } = props;
  const navigate = useNavigate();

  const handleRowClick = (imdbID: string) => {
    navigate(DETAIL_ROUTE + imdbID);
  };

  return (
    <Grid container spacing={2}>
      {movies.slice(0, rowsPerPage).map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={movie.imdbID}>
          <Card sx={{ height: '100%', boxShadow: 'none' }}>
            <CardActionArea onClick={() => handleRowClick(movie.imdbID)}>
              <CardMedia
                component="img"
                height="300"
                image={movie.Poster !== 'N/A' ? movie.Poster : IMAGE_NOT_FOUND}
                alt={movie.Title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.Year} • {movie.Type}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  IMDb: {movie.imdbID}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
