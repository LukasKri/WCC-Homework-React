import React, { useState } from "react";
import Search from "../search/Search";
import MovieCard from "../movie-card/MovieCard";
import "./Header.scss";

function Header() {
    // State for input query.
    const [query, setQuery] = useState("");
    // State for movies array in movies suggestion list.
    const [movies, setMovies] = useState([]);
    // State for movies array in results (movie cards).
    const [results, setResults] = useState([]);
    // State for form submission.
    const [submitted, setSubmitted] = useState(false);
    // State for loading after form submission.
    const [loading, setLoading] = useState(false);
    //State for error handling.
    const [error, setError] = useState(false);
    /*State, which prevents useEffect hook from showing movies suggestion list 
    when movie title is typed and submitted very fast (before debounce function 
    execution), not the best solution, but it works.*/
    const [showSuggestions, setShowSuggestions] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

        if (!query) {
            return;
        } else {
            try {
                setError(false);
                setLoading(true);
                setShowSuggestions(true);

                const res = await fetch(API_URL);
                const data = await res.json();

                setResults(data.results.splice(0, 5));
                setLoading(false);
                setSubmitted(true);
                setMovies([]);
            } catch (err) {
                setError(true);
                setLoading(false);
                console.log(err.message);
            }
        }
    }

    return (
        <div>
            <header>
                <div className="inside-container">
                    <form onSubmit={handleSubmit}>
                        <Search
                            query={query}
                            setQuery={setQuery}
                            movies={movies}
                            setMovies={setMovies}
                            showSuggestions={showSuggestions}
                            setShowSuggestions={setShowSuggestions}
                            error={error}
                            setError={setError}
                        />
                    </form>
                    {submitted && results.length === 0 && showSuggestions && (
                        <div className="no-movie">
                            <p>Sorry, there is no movie with the title:</p>
                            <p className="middle">{`${query}`}</p>
                            <p>Please try another movie title.</p>
                        </div>
                    )}
                    {loading && query.length !== 0 && (
                        <div className="loading">
                            <p>Loading...</p>
                        </div>
                    )}
                    <div className="card-list">
                        {!error &&
                            submitted &&
                            results.map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
