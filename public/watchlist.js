const watchContainer = document.getElementById("watch");
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// Function to render the watchlist
function renderWatchlist() {
    watchContainer.innerHTML = "";

    if (!watchlist.length) {
        watchContainer.innerHTML = `
            <div class="start">
                <h3 class="empty">Your watchlist is looking a little bit empty...</h3>
                <div class="addmovie">
                    <img src="./images/add.png" alt="Add Movies">
                    <a href="index.html">Let's add some movies!</a>
                </div>
            </div>
        `;
        return;
    }

    watchlist.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-detail-card");
        card.innerHTML = `
            <div class="film-card">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : './images/placeholder.png'}" alt="${movie.Title}">
                <div class="movie-info">
                    <div class="card-header">
                        <h2>${movie.Title}</h2>
                        <p>⭐ ${movie.imdbRating || "N/A"}</p>
                    </div>
                    <div class="sub">
                        <div class="detail">
                            <p>${movie.Runtime || "N/A"}</p>
                            <p>${movie.Genre || "N/A"}</p>
                        </div>
                        <div class="remove">Remove</div>
                    </div>
                    <p class="plot">${movie.Plot || "No description available."}</p>
                </div>
            </div>
            <div class="divider"></div>
        `;

        watchContainer.appendChild(card);

        // Remove button click
        const removeBtn = card.querySelector(".remove");
        removeBtn.addEventListener("click", () => {
            removeFromWatchlist(movie.imdbID);
        });
    });
}

// Function to remove movie from watchlist
function removeFromWatchlist(imdbID) {
    watchlist = watchlist.filter(m => m.imdbID !== imdbID);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    renderWatchlist();
}

// Initial render
renderWatchlist();
