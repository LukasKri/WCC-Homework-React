import React, { useState } from "react";
import Search from "./Search";
import MovieCard from "./MovieCard";

function Header() {
    // State for input query.
    const [query, setQuery] = useState("");
    // State for movies array.
    const [movies, setMovies] = useState([]);
    // State for form submition.
    const [submitted, isSubmitted] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted");
        const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=d1540e749ccc1e07651022b415b80efe&language=en-US&query=${query}&page=1&include_adult=false`;

        // To catch an error.
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setMovies(data.results);
        } catch (err) {
            console.log(err);
        }
        isSubmitted(true);
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
                            submitted={submitted}
                            isSubmitted={isSubmitted}
                        />
                    </form>
                    <div className="card-list">
                        {submitted &&
                            movies.map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
