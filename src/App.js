import Movie from "./components/Movie";
import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";
import SearchForm from "./components/SearchForm";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    const response = await fetch(`${FEATURED_API}`);
    const data = await response.json();
    setMovies(data.results);
    setLoading(false);
  };

  const fetchSearchedMovies = async (searchedTerm) => {
    const response = await fetch(`${SEARCH_API}${searchedTerm}`);
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchedMovies(searchTerm);
    } else {
      fetchMovies();
    }
  }, [searchTerm]);

  if (loading) {
    return (
      <main>
        <SearchForm setSearchTerm={setSearchTerm} />

        <Loading />
      </main>
    );
  }

  if (movies.length === 0) {
    return (
      <main>
        <SearchForm setSearchTerm={setSearchTerm} />

        <h2 className="centered">There are such no movies</h2>
      </main>
    );
  }

  return (
    <main>
      <SearchForm setSearchTerm={setSearchTerm} />

      <div className="movie-container">
        {movies.map((movie) => {
          return <Movie key={movie.id} {...movie} />;
        })}
      </div>
    </main>
  );
}

export default App;
