require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // v2 works with CommonJS
const path = require('path');

const app = express();

// Serve static files if needed (optional)
 app.use(express.static(path.join(__dirname, 'public')));

// Middleware for CORS (so frontend on Netlify can call backend)
const cors = require('cors');
app.use(cors());

// Test endpoint
app.get('/', (req, res) => {
  res.send('Movie Watchlist API is running');
});

// Search movies endpoint
app.get('/api/movies', async (req, res) => {
  const { s } = req.query;
  if (!s) return res.status(400).json({ Response: "False", Error: "Missing search query" });

  try {
    console.log("Fetching movies for query:", s);
    const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(s)}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ Response: "False", Error: "Server error fetching movies." });
  }
});

// Movie details endpoint
app.get('/api/movie', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ Response: "False", Error: "Missing movie ID" });

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${encodeURIComponent(id)}&plot=long`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ Response: "False", Error: "Server error fetching movie details." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
