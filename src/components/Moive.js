import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import Banner from "./Banner";
import styles from "./Movie.module.css";

function Movie({ id, title, coverImage, summary, genres, loading }) {
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.link}>
          <Skeleton className={styles.movieimage} height="290px" width="193px" />
          <Skeleton count="7" containerClassName={styles.block} className={styles.block} inline={false} />
        </div>
      ) : (
        <Link to={`/movie/${id}`} className={styles.link}>
          <div className={styles.movieimage}>
            <img src={coverImage} alt={title} />
            <div className={styles.cover}></div>
          </div>
          <div className={styles.movieinfo}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.summary}>{summary}</p>
            <ul className={styles.genres}>
              {genres?.map((g) => (
                <Banner key={g} text={g} />
              ))}
            </ul>
          </div>
        </Link>
      )}
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
