import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailSkeleton } from '../../components/skeletons/detail';
import { useMovieDetails } from '../../hooks/useOMDb';
import { IMAGE_NOT_FOUND } from '../../config/api';

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, error, isLoading } = useMovieDetails({ i: id, plot: 'full' });

  const handleBack = () => {
    navigate('/', { replace: true });
  };

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Movie not found</Typography>
      </Box>
    );
  }

  return (
    <Card>
      <Button onClick={handleBack} sx={{ m: 2 }}>
        Back to List
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            image={movie.Poster !== 'N/A' ? movie.Poster : IMAGE_NOT_FOUND}
            alt={movie.Title}
            sx={{ maxHeight: 600, objectFit: 'contain' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {movie.Title} ({movie.Year})
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Rating value={parseFloat(movie.imdbRating) / 2} precision={0.1} readOnly max={5} />
              <Typography variant="body2" color="text.secondary">
                IMDb Rating: {movie.imdbRating}/10 ({movie.imdbVotes} votes)
              </Typography>
            </Box>

            <Typography variant="body1">{movie.Plot}</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Runtime</Typography>
                <Typography variant="body2">{movie.Runtime}</Typography>

                <Typography variant="subtitle2">Genre</Typography>
                <Box sx={{ mb: 1 }}>
                  {movie.Genre.split(',').map((genre) => (
                    <Chip key={genre} label={genre.trim()} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </Box>

                <Typography variant="subtitle2">Director</Typography>
                <Typography variant="body2">{movie.Director}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Cast</Typography>
                <Typography variant="body2">{movie.Actors}</Typography>

                <Typography variant="subtitle2">Language</Typography>
                <Typography variant="body2">{movie.Language}</Typography>

                <Typography variant="subtitle2">Awards</Typography>
                <Typography variant="body2">{movie.Awards}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
