import React, { useState } from "react";
import Search from "./Search";
import MovieCard from "./MovieCard";

function Header() {
    // State for input query.
    const [query, setQuery] = useState("");
    // State for movies array in autocomplete.
    const [movies, setMovies] = useState([]);
    // State for movies array in results (movie cards).
    const [results, setResults] = useState([]);
    // State for form submission.
    const [submitted, setSubmitted] = useState(false);
    // State for loading after form submission.
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=d1540e749ccc1e07651022b415b80efe&language=en-US&query=${query}&page=1&include_adult=false`;

        // To catch an error.
        try {
            setLoading(true);
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
                        />
                    </form>
                    {/* {submitted && movies.length === 0 && (
                        <h1>
                            Sorry, there is no movie with the name "{`${query}`}"
                        </h1>
                    )} */}
                    {loading && <h1>Loading...</h1>}
                    <div className="card-list">
                        {submitted &&
                            results
                                .filter((movie) => {
                                    return movie.poster_path;
                                })
                                .map((movie) => (
                                    <MovieCard movie={movie} key={movie.id} />
                                ))}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
