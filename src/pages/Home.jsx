import React from 'react';
export default function Home() {
  return <div className="container">
    <section className="hero">
      <h1>Discover movies & shows</h1>
      <p>Not sure what to watch next? Look through the list and find something you like.</p>
      <a className="button" href="#/movies">Explore Now</a>
    </section>
    <section className="home-info">
      <h2>Welcome to MovieExplorer</h2>
      <p>A small place to browse titles, check ratings and read their stories.</p>
      <p>This version uses TVMaze, so the collection contains TV shows. You don't need an account to browse.</p>
    </section>
  </div>;
}
