import React from 'react';
export default function Navbar({ page }) {
  return <header className="navbar"><div className="container nav-content">
    <a className="brand" href="#/">MovieExplorer</a>
    <nav aria-label="Main navigation">
      <a href="#/" aria-current={page === 'home' ? 'page' : undefined}>Home</a>
      <a className="nav-movies" href="#/movies" aria-current={page === 'movies' ? 'page' : undefined}>Movies</a>
    </nav>
  </div></header>;
}
