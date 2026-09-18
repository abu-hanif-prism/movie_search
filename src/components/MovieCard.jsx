import React from 'react';
export default function MovieCard({ show, onDetails }) {
  return <article className="movie-card">
    <img className="poster" src={show.image?.medium} alt={show.name + ' poster'} loading="lazy" />
    <div className="card-info">
      <h2>{show.name}</h2>
      <p>★ {show.rating?.average ?? 'Not rated'} <span> · {show.premiered?.slice(0, 4) || 'Year unknown'}</span></p>
      <button onClick={() => onDetails(show)} aria-label={'See details for ' + show.name}>See Details</button>
    </div>
  </article>;
}
