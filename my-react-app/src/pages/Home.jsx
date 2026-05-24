import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import { useState, useEffect } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  {
    /* This useEffect hook is responsible for fetching the popular movies when the Home component mounts. It defines an asynchronous function loadPopularMovies that calls the getPopularMovies API function to retrieve the list of popular movies. The retrieved movies are then stored in the movies state variable. If an error occurs during the fetch process, it is caught and stored in the error state variable. Finally, the loading state is set to false to indicate that the data fetching process has completed. */
  }
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load popular movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  {
    /* This function is responsible for handling the search form submission. It prevents the default form behavior, checks if the search query is valid and if a search is already in progress, then calls the searchMovies function to fetch the search results. It updates the movies state with the search results and handles any errors that may occur during the search process. Finally, it resets the search query input field. */
  }
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies. Please try again later.");
    } finally {
      setLoading(false);
    }

    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading ? <div className="loading">Loading...</div> : null}
      {error && <div className="error-message">{error}</div>}

      <div className="movies-grid">
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
              <MovieCard key={movie.id} movie={movie} />
            ),
        )}
      </div>
    </div>
  );
}

export default Home;
