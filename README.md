🎬 Movie Finder App
===================

A responsive movie search and watchlist web app built using a **Node.js backend** that proxies requests to the [OMDb API](https://www.omdbapi.com/).

Search for your favorite movies, view detailed information, and add them to your personal watchlist --- all saved locally in your browser. The watchlist includes the ability to **remove movies** directly.

* * * * *

🌐 Live Demo
------------

👉 **[View the deployed site here](https://movie-finder-app-6dm1.onrender.com/index.html)**

* * * * *

🧠 Features
-----------

-   🔍 **Instant Movie Search** --- Powered by your Node.js backend, which securely stores your OMDb API key in `.env`. Supports live search (debounced), Enter key, or search button.

-   🎞️ **Detailed Movie Info** --- Poster, genre, runtime, plot, and combined rating for each movie.

-   ➕ **Add to Watchlist** --- Save your favorite movies to `localStorage`.

-   ❌ **Remove from Watchlist** --- Delete movies directly from your watchlist.

-   🗂️ **Persistent Watchlist** --- Data survives browser refresh or tab closing.

-   📱 **Responsive Layout** --- 2-column grid layout on large screens and single column on mobile.

* * * * *

🧩 Tech Stack
-------------

-   **HTML5**

-   **CSS3** (Flexbox + Grid, Responsive)

-   **Vanilla JavaScript (ES6+)**

-   **Node.js + Express** (Backend for API requests)

-   **OMDb API**

* * * * *

⚙️ How It Works
---------------

1.  Type a movie title (minimum 3 characters) in the search bar.

2.  Frontend calls your Node.js backend `/api/movies` endpoint.

3.  Backend fetches results from OMDb using the API key stored in `.env` (never exposed to the client).

4.  Browse results dynamically loaded on the page.

5.  Click **"Watchlist"** on a movie card to add it to your list.

6.  Visit **My Watchlist** to view saved movies.

7.  Click **"Remove"** to delete movies from your watchlist.

> ✅ All watchlist data is stored locally in `localStorage` --- no API key exposure in the browser.

* * * * *

## 🗂 Project Structure
public/
├── index.html # Search page
├── watchlist.html # Watchlist page
├── index.js # Handles search, live search, adding to watchlist
├── watchlist.js # Loads, displays, and removes movies from watchlist
├── index.css # Shared styles and responsive grid
└── images/ # Icons, background, placeholder assets
server.cjs # Node.js + Express backend
.env # Stores OMDb API key
package.json # Node.js dependencies and scripts
README.md # Project documentation


⚡ Backend Endpoints
-------------------

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/movies?s=TITLE` | GET | Searches movies by title |
| `/api/movie?id=IMDBID` | GET | Fetches detailed info for a movie |

> Both endpoints use the API key from `.env`, so your key is never exposed in the frontend.

* * * * *

🚀 Deployment
-------------

You can deploy this app using **Render** (backend + static frontend), **Heroku**, or **Vercel**.

### Render Deployment Steps

1.  Push your code to GitHub.

2.  Log in to [Render](https://render.com/) and create a new **Web Service**.

3.  Connect your GitHub repository.

4.  Set **Environment Variable**: `OMDB_API_KEY` in Render dashboard.

5.  Set **Start Command**:

    `node server.cjs`

6.  Render will automatically detect your Node.js app, install dependencies, and deploy.

7.  Your frontend will be accessible at:

    `https://movie-finder-app-6dm1.onrender.com/index.html`

> ✅ Frontend and backend are served together; API calls work without exposing the key.

* * * * *

🪪 License
----------

This project is open-source and available under the [MIT License](LICENSE).

* * * * *

💡 Author
---------

Developed with ❤️ by **Elizabeth Behaghel**

📧 Contact: elizabethbehaghel\
🌐 Portfolio: [elizabethbehaghel.netlify.app](https://elizabethbehaghel.netlify.app)