import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import Movie from "../components/Moive";
import TopButton from "../components/TopButton";
import styles from "./Home.module.css";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [reach, setReach] = useState(false);
  const [movieCount, setMovieCount] = useState(0);
  // const default
  const [rating, setRating] = useState(7);

  const getMoiveData = async () => {
    console.log("getmoviedata", page, loading, reach);
    // if (loading) return;
    setLoading(true);

    // const mdata = [...movies];
    console.log(movieCount, movies.length);
    if (movieCount ? movies.length < movieCount : movies.length === page * 20) {
      const response = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=${rating}&sort_by=rating&page=${page + 1}`);
      setPage((p) => p + 1);
      const json = await response.json();
      if (movieCount === 0) setMovieCount(json.data.movie_count);

      if (json.data.movies) {
        setMovies((mdata) => [...mdata, ...json.data.movies]);
        setReach(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    function reachTheBottom() {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (!reach && scrollHeight <= Math.ceil(scrollTop + clientHeight)) {
        console.log("reach");
        setReach(true);
      }
    }
    window.addEventListener("scroll", reachTheBottom);

    // !movies.length && getMoiveData();

    return () => {
      window.removeEventListener("scroll", reachTheBottom);
    };
  }, []);

  useEffect(() => {
    if (reach) getMoiveData();
  }, [reach]);

  // useEffect(() => {
  //   setMovies([]);
  //   setPage(0);
  //   setMovieCount(0);
  //   setReach(false);
  //   getMoiveData();
  // }, [rating]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Movie</h1>
      <div className={styles.movies_wrapper}>
        {!movies.length ? null : movies.map((movie) => <Movie key={movie.id} coverImage={movie.medium_cover_image} genres={movie.genres} id={movie.id} summary={movie.summary} title={movie.title} />)}
        {loading ? <Movie loading coverImage="" genres={[]} id={0} summary="" title="" /> : null}
        <TopButton />
      </div>
    </div>
  );
}
