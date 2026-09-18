import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';

export default function App() {
  const [page, setPage] = useState(window.location.hash === '#/movies' ? 'movies' : 'home');
  useEffect(() => {
    function changePage() {
      setPage(window.location.hash === '#/movies' ? 'movies' : 'home');
      window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', changePage);
    return () => window.removeEventListener('hashchange', changePage);
  }, []);
  return <div className="app"><Navbar page={page} /><main>{page === 'movies' ? <Movies /> : <Home />}</main><Footer /></div>;
}
