import React, { useState } from 'react';
import { useMovieSearch } from '../hooks/useOMDb';

export const MovieSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('Pokemon');
  const { data, error, isLoading } = useMovieSearch({
    s: searchTerm || undefined, // Boş string yerine undefined gönder
  });

  console.log('Search Results:', { data, error, isLoading }); // Debug için

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
      />

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {data && data.Search && (
        <div>
          {data.Search.map((movie) => (
            <div key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              {movie.Poster !== 'N/A' && (
                <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: '200px' }} />
              )}
              <p>Year: {movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
