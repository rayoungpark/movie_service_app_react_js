import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Movie from "../components/Moive";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMoiveData = useCallback(async () => {
    const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year");
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMoiveData();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie key={movie.id} coverImage={movie.medium_cover_image} genres={movie.genres} id={movie.id} summary={movie.summary} title={movie.title} />
          ))}
        </div>
      )}
    </div>
  );
}
