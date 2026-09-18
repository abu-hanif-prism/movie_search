import React, { useEffect, useState } from 'react';
import { getShows } from '../api';
import MovieCard from '../components/MovieCard';

export default function Movies() {
  const [shows, setShows] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => { getShows('', 0).then(setShows).catch(console.error); }, []);
  return <div className="container listing">
    <h1>Browse movies & shows</h1>
    <p>Browse the TVMaze show collection or search for a title.</p>
    <div className="movie-grid">{shows.map(show => <MovieCard key={show.id} show={show} onDetails={setSelected} />)}</div>
    {selected && <p>{selected.name}</p>}
  </div>;
}
