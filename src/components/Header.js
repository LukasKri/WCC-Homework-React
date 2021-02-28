import React, { useState } from "react";
import Search from "./Search";

function Header() {
    // State for input query
    const [query, setQuery] = useState("");

    // State for movies array
    const [movies, setMovies] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted");
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
                </div>
            </header>
        </div>
    );
}

export default Header;
