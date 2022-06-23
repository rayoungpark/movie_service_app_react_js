import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Movie from "../components/Moive";
import styles from "./Home.module.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMoiveData = useCallback(async () => {
    const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=rating&page=1");
    const json = await response.json();
    setMovies(json.data.movies);

    console.log(json.data);

    setLoading(false);
  }, []);

  useEffect(() => {
    getMoiveData();
  }, []);

  return (
    <div>
      <h1>Movie</h1>
      <div className={styles.movies_container}>
        {loading ? null : movies.map((movie) => <Movie key={movie.id} coverImage={movie.medium_cover_image} genres={movie.genres} id={movie.id} summary={movie.summary} title={movie.title} />)}
      </div>
    </div>
  );
}
