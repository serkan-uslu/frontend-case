# OMDb API Documentation

## API Key

How to get an API key:

1. Go to [OMDb API](http://www.omdbapi.com/)
2. Click on the header "API Key"
3. Choose Account Type: "FREE! (1,000 daily limit)"
4. Enter your email address
5. Click on "Get API Key"
6. The API key will be sent to your email address. Sample email is below:

    ```
    Here is your key: xxxyyyzzz

    Please append it to all of your API requests,

    OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=xxxyyyzzz

    Click the following URL to activate your key: http://www.omdbapi.com/apikey.aspx?VERIFYKEY=AAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA
    ```

7. Click on the URL to activate your key.
8. You will be redirected to the OMDb API page.
9. You will see a message "Your API key is active"
10. You can now use the API key in your requests.

## API Parameters Reference

### Search Parameters

#### By ID or Title Parameters

| Parameter | Required | Valid Options | Default | Description |
|-----------|----------|---------------|---------|-------------|
| `i` | Optional* | - | empty | A valid IMDb ID (e.g., tt1285016) |
| `t` | Optional* | - | empty | Movie title to search for |
| `type` | No | movie, series, episode | empty | Type of result to return |
| `y` | No | - | empty | Year of release |
| `plot` | No | short, full | short | Return short or full plot |
| `r` | No | json, xml | json | The data type to return |
| `callback` | No | - | empty | JSONP callback name |
| `v` | No | - | 1 | API version (reserved for future use) |

\* *At least one of `i` or `t` is required*

#### By Search Parameters

| Parameter | Required | Valid Options | Default | Description |
|-----------|----------|---------------|---------|-------------|
| `s` | Yes | - | empty | Movie title to search for |
| `type` | No | movie, series, episode | empty | Type of result to return |
| `y` | No | - | empty | Year of release |
| `r` | No | json, xml | json | The data type to return |
| `page` | No | 1-100 | 1 | Page number to return |
| `callback` | No | - | empty | JSONP callback name |
| `v` | No | - | 1 | API version (reserved for future use) |

---

## Example API Calls

### 1. Search for Movies by Title

**Search for "Harry Potter" movies:**
```plaintext
http://www.omdbapi.com/?apikey=xxxyyyzzz&s=Harry%20Potter
```

**With type filter and year:**
```plaintext
http://www.omdbapi.com/?apikey=xxxyyyzzz&s=Harry%20Potter&type=movie&y=2001
```

### 2. Search with Pagination

**Fetch the second page of "Pokemon" movies:**
```plaintext
http://www.omdbapi.com/?apikey=xxxyyyzzz&s=Pokemon&page=2
```

### 3. Retrieve Movie Details by Title

**Get details of "The Matrix" with a full plot:**
```plaintext
http://www.omdbapi.com/?apikey=xxxyyyzzz&t=The%20Matrix&plot=full
```

### 4. Retrieve Movie Details by IMDb ID

**Get details using IMDb ID:**
```plaintext
http://www.omdbapi.com/?apikey=xxxyyyzzz&i=tt0133093
```

### 5. Filter Search Results by Type

**Search for TV series:**
```plaintext
http://www.omdbapi.com/?apikey=xxxyyyzzz&s=Friends&type=series
```

### 6. XML Response Format

**Get results in XML format:**
```plaintext
http://www.omdbapi.com/?apikey=xxxyyyzzz&t=Matrix&r=xml
```

### 7. Using JSONP Callback

**Search with JSONP callback:**
```plaintext
http://www.omdbapi.com/?apikey=xxxyyyzzz&s=Avatar&callback=processResults
```

## Response Types

### Search Response (s parameter)
```typescript
interface SearchResponse {
    Search: {
        Title: string;
        Year: string;
        imdbID: string;
        Type: string;
        Poster: string;
    }[];
    totalResults: string;
    Response: "True" | "False";
}
```

### Movie Details Response (t or i parameter)
```typescript
interface MovieResponse {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response: "True" | "False";
}
```

## Error Handling

When an error occurs, the API returns:
```typescript
interface ErrorResponse {
    Response: "False";
    Error: string;
}
```

Common error messages:
- "Movie not found!"
- "Invalid IMDb ID!"
- "Too many results."
- "Invalid API key!"
- "Series not found!"

## Rate Limiting

- Free tier: 1,000 daily requests
---

For more information or to get an API key, visit [OMDb API](http://www.omdbapi.com/).