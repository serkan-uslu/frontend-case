import { Box, Card, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RenderGridViewProps } from '../../../types';
import { getTypeColor } from '../../../utils/helpers';

export const RenderGridView: React.FC<RenderGridViewProps> = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
          <Card
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[8],
              },
            }}
          >
            <CardMedia
              component="img"
              image={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : `https://placehold.co/500x600?text=${movie.Title}`
              }
              alt={movie.Title}
              sx={{
                height: 400,
                objectFit: movie.Poster !== 'N/A' ? 'cover' : 'contain',
              }}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" component="div" noWrap>
                {movie.Title}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                <Chip label={movie.Year} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                <Chip
                  label={movie.Type}
                  size="small"
                  color={getTypeColor(movie.Type)}
                  sx={{
                    borderRadius: 1,
                    textTransform: 'capitalize',
                  }}
                />
              </Box>

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
                IMDb ID: {movie.imdbID}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
