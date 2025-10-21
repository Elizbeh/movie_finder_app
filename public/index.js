// Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const movieContainer = document.getElementById("movie-container");

const API_BASE = "https://movie-finder-app-6dm1.onrender.com";

// Debounce utility
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// Search handler
function handleSearch() {
    const query = searchInput.value.trim();
    if (query.length < 3) {
        movieContainer.innerHTML = `
            <div class="start">
                <img src="./images/Icon.png" alt="Start Exploring">
                <p>Start Exploring</p>
            </div>
        `;
        return;
    }
    fetchMovies(query);
}

// Live search (debounced)
searchInput.addEventListener("input", debounce(handleSearch, 300));
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
});

// Fetch movies list from backend
async function fetchMovies(query) {
    const url = `${API_BASE}/api/movies?s=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieContainer.innerHTML = `<p class="error-message">❌ ${data.Error} ❌</p>`;
        }
    } catch (error) {
        console.error(error);
        movieContainer.innerHTML = `<p class="error-message">❌ Failed to fetch movies. Please try again later.</p>`;
    }
}

// Display movie cards
function displayMovies(movies) {
    movieContainer.innerHTML = "";
    movies.forEach(async (movie) => {
        const detailsUrl = `${API_BASE}/api/movie?id=${encodeURIComponent(movie.imdbID)}`;
        try {
            const response = await fetch(detailsUrl);
            const data = await response.json();
            if (data.Response === "True") {

                // Combined rating calculation
                let combinedRating = "N/A";
                if (Array.isArray(data.Ratings) && data.Ratings.length > 0) {
                    const numericRatings = data.Ratings.map(r => {
                        const val = r.Value.trim();
                        if (/^\d+(\.\d+)?\/10$/.test(val)) return parseFloat(val.split("/")[0]);
                        if (val.endsWith("%")) return parseFloat(val.slice(0, -1)) / 10;
                        if (/^\d+\/100$/.test(val)) return parseFloat(val.split("/")[0]) / 10;
                        return null;
                    }).filter(v => v !== null && !isNaN(v));

                    if (numericRatings.length) {
                        combinedRating = Math.min(numericRatings.reduce((a, b) => a + b, 0) / numericRatings.length, 10).toFixed(1);
                    }
                }

                // Movie card HTML
                const card = document.createElement("div");
                card.classList.add("movie-detail-card");
                card.innerHTML = `
                    <div class="film-card">
                        <img src="${data.Poster !== "N/A" ? data.Poster : './images/placeholder.png'}" alt="${data.Title}">
                        <div class="movie-info">
                            <div class="card-header">
                                <h2>${data.Title}</h2>
                                <p>⭐ ${combinedRating}</p>
                            </div>
                            <div class="sub">
                                <div class="detail">
                                    <p>${data.Runtime || "N/A"}</p>
                                    <p>${data.Genre || "N/A"}</p>
                                </div>
                                <div class="add">
                                    <img src="./images/add.png" alt="Add to Watchlist"/>
                                    <p>Watchlist</p>
                                </div>
                            </div>
                            <p class="plot">${data.Plot || "No description available."}</p>
                        </div>
                    </div>
                    <div class="divider"></div>
                `;
                movieContainer.appendChild(card);

                // Watchlist button
                const addBtn = card.querySelector(".add");
                addBtn.addEventListener("click", () => addToWatchlist(data, card));
            }
        } catch(err) {
            console.error(err);
        }
    });
}

// Add movie to watchlist and show UI message
function addToWatchlist(movie, card) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    let messageContainer = card.querySelector(".watchlist-message");
    if (!messageContainer) {
        messageContainer = document.createElement("div");
        messageContainer.className = "watchlist-message";
        messageContainer.style.color = "#4caf50";
        messageContainer.style.marginTop = "0.5rem";
        card.appendChild(messageContainer);
    }

    if (!watchlist.some(m => m.imdbID === movie.imdbID)) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        messageContainer.textContent = `Movie added to Watchlist!`;
    } else {
        messageContainer.textContent = `Movie is already in Watchlist.`;
        messageContainer.style.color = "#f44336"; // red for duplicate
    }

    setTimeout(() => {
        messageContainer.textContent = "";
        messageContainer.style.color = "#4caf50";
    }, 3000);
}
