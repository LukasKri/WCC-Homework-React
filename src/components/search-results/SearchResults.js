import React from "react";

function SearchResults({ onRowClick, movie }) {
    return (
        <div className="results-row" onClick={onRowClick}>
            <h3>{movie.title}</h3>
            <p>
                {movie.vote_average +
                    " Rating, " +
                    (movie.release_date && movie.release_date.split("-", 1))}
            </p>
        </div>
    );
}

export default SearchResults;
