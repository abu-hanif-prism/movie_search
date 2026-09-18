import React, { useEffect, useState } from 'react';
import { getShows } from '../api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

export default function Movies() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(() => {
      getShows(query.trim(), 0, controller.signal).then(data => { if (!controller.signal.aborted) setShows(data); }).catch(error => {
        if (error.name !== 'AbortError') console.error(error);
      }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }, query.trim() ? 350 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);
  return <div className="container listing">
    <h1>Browse movies & shows</h1>
    <p>Browse the TVMaze show collection or search for a title.</p>
    <SearchBar query={query} onChange={setQuery} />
    {loading && <p role="status" className="notice">Loading shows...</p>}
    {!loading && <div className="movie-grid">{shows.map(show => <MovieCard key={show.id} show={show} onDetails={setSelected} />)}</div>}
    {selected && <p>{selected.name}</p>}
  </div>;
}
