# MovieExplorer

A small React app for browsing shows and checking their details. The design uses plain CSS, a blue header and a basic card grid.

## Run locally

Use Node.js 22.12+ (or 20.19+).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Build with `npm run build`; check the build with `npm run preview`.

## Features

- Home page with navigation, hero and footer
- Browse page at `#/movies`, with title search and a clear button
- Responsive cards with poster, year and rating
- Details dialog with summary, genres, language and network
- Close with the X, Close button, Escape or outside click
- Loading, retry, empty result and missing poster states
- Previous/next pages for browsing the collection

## Data

[TVMaze API documentation](https://www.tvmaze.com/api). No API key needed. Internet access is required.

TVMaze supplies **TV shows**, not a movie catalogue. The Movies navigation follows the assignment naming.

- `GET /shows?page=0`: one page of the collection (up to 250 shows)
- `GET /search/shows?q=title`: search across the show database

Search waits 350ms after typing and cancels the previous request. Summaries are converted to plain text before rendering. Missing ratings and dates have fallback labels.

Data and images are credited to [TVMaze](https://www.tvmaze.com/), under [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/).

## Files

`src/pages` contains Home and Movies. Reusable UI lives in `src/components`. Requests are in `src/api.js` and all styles are in `src/style.css`.
