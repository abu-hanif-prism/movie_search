const API_URL = 'https://api.tvmaze.com';

export async function getShows(query, page, signal) {
  const path = query ? '/search/shows?q=' + encodeURIComponent(query) : '/shows?page=' + page;
  const response = await fetch(API_URL + path, { signal });
  if (!query && response.status === 404) return [];
  if (!response.ok) throw new Error(response.status === 429 ? 'Too many requests. Please wait a moment and try again.' : 'Could not load the shows. Please try again.');
  const data = await response.json();
  return query ? data.map(item => item.show) : data;
}
