import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import styles from "./Movie.module.css";

function Movie({ id, title, coverImage, summary, genres }) {
  return (
    <div className={styles.container}>
      <Link to={`/movie/${id}`}>
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
