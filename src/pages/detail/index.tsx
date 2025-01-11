import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Rating,
  Typography,
  Fab,
  useScrollTrigger,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailSkeleton } from '../../components/skeletons/detail';
import { useMovieDetails } from '../../hooks/useOMDb';
import { IMAGE_NOT_FOUND } from '../../config/api';

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, error, isLoading } = useMovieDetails({ i: id, plot: 'full' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate('/', { replace: true });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const DetailItem = ({ label, value }: { label: string; value: string | undefined }) => {
    if (!value || value === 'N/A') {
      return null;
    }
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    );
  };

  const RatingSection = () => (
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

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <Button onClick={handleBack} sx={{ m: 2 }}>
          Back to List
        </Button>
        <Grid container spacing={3}>
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

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {movie.Runtime && <Chip label={movie.Runtime} size="small" />}
                  {movie.Rated && <Chip label={movie.Rated} size="small" />}
                  {movie.Type && <Chip label={movie.Type} size="small" />}
                </Box>
                {movie.Genre && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {movie.Genre.split(',').map((genre) => (
                      <Chip key={genre} label={genre.trim()} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
              </Box>

              <RatingSection />

              <DetailItem label="Plot" value={movie.Plot} />
              <Divider sx={{ my: 2 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <DetailItem label="Director" value={movie.Director} />
                  <DetailItem label="Writer" value={movie.Writer} />
                  <DetailItem label="Actors" value={movie.Actors} />
                  <DetailItem label="Released" value={movie.Released} />
                  <DetailItem label="DVD" value={movie.DVD} />
                  <DetailItem label="Box Office" value={movie.BoxOffice} />
                  <DetailItem label="Production" value={movie.Production} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DetailItem label="Language" value={movie.Language} />
                  <DetailItem label="Country" value={movie.Country} />
                  <DetailItem label="Awards" value={movie.Awards} />
                  <DetailItem label="Website" value={movie.Website} />
                  <DetailItem label="Metascore" value={movie.Metascore} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      IMDb ID
                    </Typography>
                    <Typography
                      variant="body1"
                      component="a"
                      href={`https://www.imdb.com/title/${movie.imdbID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: 'primary.main', textDecoration: 'none' }}
                    >
                      {movie.imdbID}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {isMobile && (
        <Fade in={trigger}>
          <Box
            onClick={scrollToTop}
            role="presentation"
            sx={{
              position: 'fixed',
              bottom: 70,
              right: 16,
              zIndex: 1100,
            }}
          >
            <Fab color="primary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </Box>
        </Fade>
      )}
    </>
  );
};
