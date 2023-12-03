export function renderWatchListCards(watchListArray) {
  const watchListContainer = document.querySelector('#watch-list-container');

  if (watchListArray.length === 0) {
    watchListContainer.innerHTML = `
      <h3 class="error-message">
        Nothing added to your watchlist...<a href="./index.html"> Let's start adding </a>
      </h3>
    `;
  } else {
    watchListContainer.innerHTML = watchListArray
      .map(
        (movie) => `
      <div class="search-result-card">
        <div class="img-container">
          <img src="${getMoviePosterUrl(movie.Poster)}" alt="${
          movie.Title
        } Poster" />
        </div>
        <div class="text-container">
          <div class="top-section">
            <h3 class="movie-title">${movie.Title}</h3>
            <span id="movie-rating">${getMovieRating(movie.Ratings)}</span>
          </div>
          <div class="middle-section">
            <span class="run-time">${movie.Runtime}</span>
            <span class="genre">${movie.Genre}</span>
            <button class="btn-watch-list" data-id="${movie.imdbID}">
              <i class="fa-solid fa-circle-minus"></i> Remove
            </button>
          </div>
          <div class="bottom-section">
            <p class="movie-description">${movie.Plot}</p>
          </div>
        </div>
      </div>
    `
      )
      .join('');
  }
}

function getMoviePosterUrl(poster) {
  return !poster || poster.length < 5
    ? './images/icons/movie-film-icon.svg'
    : poster;
}

function getMovieRating(ratings) {
  return ratings && ratings.length > 0
    ? `<i class="fa-solid fa-star"></i> ${ratings[0].Value.slice(0, 3)}`
    : '';
}
