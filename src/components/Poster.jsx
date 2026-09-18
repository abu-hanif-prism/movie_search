import React, { useState } from 'react';
export default function Poster({ src, name, className = 'poster' }) {
  const [failed, setFailed] = useState(false);
  return src && !failed
    ? <img className={className} src={src} alt={name + ' poster'} loading="lazy" onError={() => setFailed(true)} />
    : <div className={className + ' missing-poster'} role="img" aria-label={'No poster for ' + name}>No poster available</div>;
}
