import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Movie from "../components/Moive";
import TopButton from "../components/TopButton";
import { useAppSelector, useAppDispatch } from "../store/config";
import { addMovies, setCount, setPage, setRating } from "../store/slices/movieSlice";
import styles from "./Home.module.css";

export default function Home() {
  const { count, page, limit, movies, rating } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [reach, setReach] = useState(false);

  const nextPage = useCallback(() => {
    dispatch(setPage(page + 1));
  }, [dispatch, page]);

  const setMovieCount = useCallback(
    (movieCount) => {
      dispatch(setCount(movieCount));
    },
    [dispatch]
  );

  const addMovie = useCallback(
    (newMovies) => {
      dispatch(addMovies(newMovies));
    },
    [dispatch]
  );

  const setMovieRating = useCallback(
    (newRating) => {
      dispatch(setRating(newRating));
    },
    [dispatch]
  );

  const getMoiveData = async () => {
    if (loading) return;
    setLoading(true);

    if (count ? movies.length < count : movies.length === page * limit) {
      const response = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=${rating}&sort_by=name&page=${page + 1}`);
      nextPage();
      const json = await response.json();
      if (count === 0) setMovieCount(json.data.movie_count);
      if (json.data.movies) {
        addMovie(json.data.movies);
        setReach(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    function reachTheBottom() {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (!reach && scrollHeight <= Math.ceil(scrollTop + clientHeight)) {
        setReach(true);
      }
    }
    window.addEventListener("scroll", reachTheBottom);

    // !count && getMoiveData();

    return () => {
      window.removeEventListener("scroll", reachTheBottom);
    };
  }, []);

  useEffect(() => {
    if (reach) getMoiveData();
  }, [reach]);

  useEffect(() => {
    getMoiveData();
  }, [rating]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Movie</h1>
      <div className={styles.rating_wrapper}>
        <label htmlFor="rating-selector">Min Rating</label>
        <select id="rating-selector" value={rating} onChange={(e) => setMovieRating(e.target.value)}>
          <option value={6.5}>⭐6.5</option>
          <option value={7.0}>⭐7.0</option>
          <option value={7.5}>⭐7.5</option>
          <option value={8.0}>⭐8.0</option>
          <option value={8.5}>⭐8.5</option>
          <option value={9.0}>⭐9.0</option>
          <option value={9.5}>⭐9.5</option>
        </select>
      </div>
      <div className={styles.movies_wrapper}>
        {!movies?.length
          ? null
          : movies.map((movie) =>
              movie.medium_cover_image ? <Movie key={movie.id} coverImage={movie.medium_cover_image} genres={movie.genres} id={movie.id} summary={movie.summary} title={movie.title} /> : null
            )}
        {loading ? <Movie loading coverImage="" genres={[]} id={0} summary="" title="" /> : null}
        <TopButton />
      </div>
    </div>
  );
}
