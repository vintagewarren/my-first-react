import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div>
      <Link to={`/movie/${id}`}>
        <h2>{title}</h2>
        <img src={coverImg} alt={title} />
      </Link>
      <p>{summary.length > 250 ? `${summary.slice(0, 250)}` : summary}</p>
      <ul>
        {genres && genres.map((genres) => <li key={genres}>{genres}</li>)}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
