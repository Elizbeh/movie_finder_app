require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Search movies endpoint
app.get('/api/movies', async (req, res) => {
    const { s } = req.query;
    if (!s) return res.status(400).json({ Response: "False", Error: "Missing search query" });

    try {
        console.log("Fetching movies for query:", s);
        console.log("Using API KEY:", process.env.OMDB_API_KEY);
        const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(s)}`);
        const data = await response.json();
        console.log("OMDb response:", data);
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
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
