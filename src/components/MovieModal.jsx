import React, { useEffect, useRef } from 'react';
import Poster from './Poster';

function summaryText(summary) {
  if (!summary) return 'No summary available for this show.';
  const doc = new DOMParser().parseFromString(summary, 'text/html');
  return doc.body.textContent || 'No summary available for this show.';
}

export default function MovieModal({ show, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    dialog.current.showModal();
  }, []);
  return <dialog ref={dialog} className="movie-modal" aria-labelledby="modal-title" onCancel={onClose}>
    <button className="close-icon secondary" aria-label="Close details" onClick={onClose}>×</button>
    <Poster src={show.image?.original || show.image?.medium} name={show.name} className="modal-poster" />
    <h2 id="modal-title">{show.name}</h2>
    <p><strong>Rating:</strong> {show.rating?.average ?? 'Not rated'} · <strong>Release:</strong> {show.premiered || 'Unknown'}</p>
    <h3>Overview</h3>
    <p className="summary">{summaryText(show.summary)}</p>
    <button onClick={onClose}>Close</button>
  </dialog>;
}
