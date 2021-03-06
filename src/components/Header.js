import React, { useState } from "react";
import Search from "./Search";
import MovieCard from "./MovieCard";

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
    // State, which prevents useEffect hook from showing movies suggestion list
    // when movie title is typed and submitted very fast (before debounce
    // function execution), not the best solution, but it works (I hope so...).
    const [showSuggestions, setShowSuggestions] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const API_KEY = "d1540e749ccc1e07651022b415b80efe";
        const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

        if (!query) {
            return;
        } else {
            try {
                setLoading(true);
                setShowSuggestions(true);
                const res = await fetch(API_URL);
                const data = await res.json();

                setResults(data.results.splice(0, 5));
                setLoading(false);
                setSubmitted(true);
                setMovies([]);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="container">
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
                        />
                    </form>
                    {submitted && results.length === 0 && showSuggestions && (
                        <div className="no-movie">
                            <h2>
                                Sorry, there is no movie with the name:{" "}
                                {`${query}`}, please try another title.
                            </h2>
                        </div>
                    )}
                    {loading && query.length !== 0 && (
                        <div className="loading">
                            <h1>Loading...</h1>
                        </div>
                    )}
                    <div className="card-list">
                        {submitted &&
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
