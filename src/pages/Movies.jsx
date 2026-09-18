import React, { useEffect, useState } from 'react';
import { getShows } from '../api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import MovieModal from '../components/MovieModal';

export default function Movies() {
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError('');
    const controller = new AbortController();
    const timer = setTimeout(() => {
      getShows(query.trim(), page, controller.signal).then(data => { if (!controller.signal.aborted) setShows(data); }).catch(error => {
        if (!controller.signal.aborted) setError(error.message === 'Failed to fetch' ? 'Could not connect. Check your internet connection and try again.' : error.message);
      }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }, query.trim() ? 350 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, retry, page]);
  return <div className="container listing">
    <h1>Browse movies & shows</h1>
    <p>Browse the TVMaze show collection or search for a title.</p>
    <SearchBar query={query} onChange={value => { setQuery(value); setPage(0); }} />
    {loading && <p role="status" className="notice">Loading shows...</p>}
    {!loading && error && <div className="notice" role="alert"><p>{error}</p><button onClick={() => setRetry(retry + 1)}>Try again</button></div>}
    {!loading && !error && <p role="status">{shows.length ? shows.length + " shows found" : "No shows found. Try another title."}</p>}
    {!loading && !error && <div className="movie-grid">{shows.map(show => <MovieCard key={show.id} show={show} onDetails={setSelected} />)}</div>}
    {!query.trim() && !loading && !error && <div className="pagination">
      <button className="secondary" disabled={page === 0} onClick={() => { setPage(page - 1); window.scrollTo(0, 0); }}>Previous</button>
      <span>Page {page + 1}</span>
      <button disabled={!shows.length} onClick={() => { setPage(page + 1); window.scrollTo(0, 0); }}>Next page</button>
    </div>}
    {selected && <MovieModal show={selected} onClose={() => setSelected(null)} />}
  </div>;
}
