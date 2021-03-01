import React from "react";

function MovieCard({ movie }) {
    return (
        <div className="card">
            <img
                className="card--image"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title + " poster"}
                width="250"
            />
            <div className="card--content">
                <h3 className="card--title">{movie.title}</h3>
                <p>
                    <small>RELESE DATE: {movie.release_date}</small>
                </p>
                <p>
                    <small>RATING: {movie.vote_average}</small>
                </p>
                <p className="card--desc">{movie.overview}</p>
            </div>
        </div>
    );
}

export default MovieCard;
