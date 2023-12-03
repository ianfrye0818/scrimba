import {
  getMoviePosterUrl,
  getMovieRating,
  getWatchlistButtonContent,
} from './utils.js';

export function renderSearchResultCards(movieDetailsArray) {
  const searchResultsContainer = document.querySelector(
    '#search-results-container'
  );
  const searchBox = document.querySelector('#search-box');

  // Clear the search box and results container
  searchBox.value = '';
  searchResultsContainer.innerHTML = '';

  // Display error message on the DOM
  if (!movieDetailsArray) {
    searchResultsContainer.innerHTML = `
      <h3 class="error-message">
        Unable to find what you’re looking for. Please try another search.
      </h3>`;
    return;
  }

  // Create a movie card for each movie in the array
  searchResultsContainer.innerHTML = movieDetailsArray
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
            ${getWatchlistButtonContent(movie.isInWatchList)}
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
