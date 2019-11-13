import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const MovieList = props => {
  const [movies, setMovies] = useState([])

{/*SEARCH STATE*/}
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          //setMovies(response.data);

{/*SEARCH THEN CALL FILTER*/}
          const inSearchBar = response.data.filter(foobarBannaSearch =>
            foobarBannaSearch.title.toLowerCase().includes(searchValue.toLowerCase())
          );
          console.log("harry potter characters", response);
          setMovies(inSearchBar);

        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }

    getMovies();
  }, [searchValue]);


  const newLetterEntered = event => {
      setSearchValue(event.target.value);
    };


  return (
    <div className="movie-list">

{/*SEARCH VALUE FORM*/}
    <form className="search">
      <input
        type="text"
        onChange={newLetterEntered}
        value={searchValue}
        name="name"
        tabIndex="0"
        className="prompt search-name"
        placeholder="search by name"
        autoComplete="off"
      />
    </form>

      {movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  const { title, director, metascore, stars } = movie;
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
    </Link>
  );
}

export default MovieList;
