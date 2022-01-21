import React, { useState, useEffect } from "react";
import './App.css';

function Movie({title, poster, release}) {
  return (
    <article>
      <img src={ poster ? `https://image.tmdb.org/t/p/w500/${poster}` : '/logo512.png' } />
      <p>{title}</p>
      <small>{release}</small>
    </article>
  );
};
function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=66c0c0819e2b4b94de43dcc6ac9d2a21&page=1&region=MX`);
      const json = await response.json();
      setMovies(json.results);
    };
    fetchMovies();
  }, []); //Runs only on the first render

  return (
    <section>
      { movies ? movies.map((m)=> <Movie title={m.title} poster={m.poster_path} release={m.release_date} />)
        : <i>Loading...</i>
      }
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>Movies: Now playing</h1>
      <Movies/>
    </main>
  );
}

export default App;
