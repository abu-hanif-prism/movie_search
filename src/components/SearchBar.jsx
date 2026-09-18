import React from 'react';
export default function SearchBar({ query, onChange }) {
  return <div className="search-box">
    <label htmlFor="movie-search">Search by title</label>
    <div className="search-row">
      <input id="movie-search" type="search" placeholder="Try Breaking Bad, Girls..." value={query} onChange={event => onChange(event.target.value)} />
      {query && <button type="button" className="secondary" onClick={() => onChange('')}>Clear</button>}
    </div>
  </div>;
}
