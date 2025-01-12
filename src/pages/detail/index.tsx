import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Fab,
  Fade,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../../components/badge';
import { DetailItem } from '../../components/detail/detail-item';
import { RatingSection } from '../../components/detail/rating-section';
import { NotFound } from '../../components/not-found';
import { DetailSkeleton } from '../../components/skeletons/detail';
import { useMovieDetails } from '../../hooks/useOMDb';
import { getTypeColor } from '../../utils/helpers';

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

  if (error || !movie) {
    return <NotFound />;
  }

  const PlotSection = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const plotRef = React.useRef<HTMLParagraphElement>(null);
    const [showReadMore, setShowReadMore] = React.useState(false);

    React.useEffect(() => {
      if (plotRef.current) {
        setShowReadMore(plotRef.current.scrollHeight > plotRef.current.clientHeight);
      }
    }, [movie.Plot]);

    return (
      <Box sx={{ position: 'relative', mb: 3 }}>
        <Typography
          ref={plotRef}
          variant="body1"
          sx={{
            maxHeight: isExpanded ? 'none' : '100px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-out',
            mb: 1,
          }}
        >
          {movie.Plot}
        </Typography>
        {showReadMore && (
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
              textTransform: 'none',
              p: 0,
              minWidth: 'auto',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              },
            }}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </Button>
        )}
      </Box>
    );
  };

  return (
    <>
      <Card sx={{ mb: 4, overflow: 'visible', boxShadow: 'none' }}>
        <Button onClick={handleBack} sx={{ m: 2 }} startIcon={<ArrowBackIcon />}>
          Back to List
        </Button>
        <Grid container spacing={isMobile ? 0 : 3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2 }}>
              <CardMedia
                component="img"
                image={
                  movie.Poster !== 'N/A'
                    ? movie.Poster
                    : `https://placehold.co/500x600?text=${movie.Title}`
                }
                alt={movie.Title}
                sx={{
                  maxHeight: 600,
                  objectFit: 'contain',
                  borderRadius: 2,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {movie.Title}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                <Chip label={movie.Year} size="small" variant="outlined" sx={{ borderRadius: 1 }} />

                <Badge label={movie.Type} color={getTypeColor(movie.Type)} />
                {movie.Runtime && (
                  <Chip
                    label={movie.Runtime}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                )}
                {movie.Rated && (
                  <Chip
                    label={movie.Rated}
                    size="small"
                    color="error"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                )}
              </Stack>

              {movie.Genre && (
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {movie.Genre.split(',').map((genre) => (
                      <Chip
                        key={genre}
                        label={genre.trim()}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ borderRadius: 1, mt: 1 }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
              <RatingSection movie={movie} />
              <PlotSection />
              <Divider sx={{ my: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <DetailItem label="Director" value={movie.Director} />
                  <DetailItem label="Writer" value={movie.Writer} />
                  <DetailItem label="Cast" value={movie.Actors} />
                  <DetailItem label="Release Date" value={movie.Released} />
                  <DetailItem label="Box Office" value={movie.BoxOffice} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DetailItem label="Language" value={movie.Language} />
                  <DetailItem label="Country" value={movie.Country} />
                  <DetailItem label="Awards" value={movie.Awards} />
                  <DetailItem label="Production" value={movie.Production} />
                  <DetailItem
                    label="IMDb"
                    value={
                      <Typography
                        variant="body1"
                        component="a"
                        href={`https://www.imdb.com/title/${movie.imdbID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
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
                        Display on IMDb
                      </Typography>
                    }
                  />
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
              bottom: 16,
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
