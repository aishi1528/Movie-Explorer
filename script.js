const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieResult = document.getElementById("movieResult");

const API_KEY = "9dfcc54c";

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovie(query);
  }
});

async function fetchMovie(title) {
  movieResult.innerHTML = "⏳ Loading...";
  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "False") {
      movieResult.innerHTML = "⚠️ Movie not found!";
      return;
    }

    movieResult.innerHTML = `
      <div class="movie-card">
        <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/200"}" alt="${data.Title}">
        <div class="movie-info">
          <h2>${data.Title} (${data.Year})</h2>
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Director:</strong> ${data.Director}</p>
          <p><strong>Actors:</strong> ${data.Actors}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <p><strong>IMDB Rating:</strong> ⭐ ${data.imdbRating}</p>
        </div>
      </div>
    `;
  } catch (error) {
    movieResult.innerHTML = "❌ Error fetching movie details.";
    console.error(error);
  }
}
