import { Box, Rating, Typography } from '@mui/material';
import React from 'react';

import { MovieDetails } from '../../types';

interface RatingSectionProps {
  movie: MovieDetails;
}
export const RatingSection: React.FC<RatingSectionProps> = (props: RatingSectionProps) => {
  const { movie } = props;
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Rating value={parseFloat(movie.imdbRating) / 2} precision={0.1} readOnly max={5} />
        <Typography variant="body2" color="text.secondary">
          IMDb: {movie.imdbRating}/10 ({movie.imdbVotes} votes)
        </Typography>
      </Box>
      {movie.Ratings?.map((rating, index) => (
        <Typography key={index} variant="body2" color="text.secondary">
          {rating.Source}: {rating.Value}
        </Typography>
      ))}
    </Box>
  );
};
