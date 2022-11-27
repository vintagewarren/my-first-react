import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
//import Movie from "../components/Movie";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]); 

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.jason?movie_id=${id}`)
    ).json();
    setMovie(() => json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  },[]); 

  return ( // Error 나는 이유 : yts.mx 로그인이 되어 있어야 하는 듯... failed to fetch
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <h3> {movie.title.map((title)=> (<li key={title}>{title}</li>))} </h3>
        <img src={movie.medium_cover_image} alt=""/> 
        <h4>{movie.summary.map((summary)=>(<li key={summary}>{summary}</li>))}</h4>
        <h5>{movie.genres.map((genres)=>(<li key={genres}>{genres}</li>))}</h5>
        </>
      )}
    </div>
  );
}
export default Detail;
