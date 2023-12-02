import { getMovieDetailsArray } from './fetchMovie.js';
//HTML elements from file
const searchResultsContainer = document.querySelector(
  '#search-results-container'
);
const watchListContainer = document.querySelector('#watch-list-container');
const movieString = document.querySelector('#search-box');
const form = document.querySelector('#search-form');

//desclare the two arrays to keep track of the data changes
let watchListArray = [];
let movieDetailsArray = [];

//event listeners
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (movieString.value) {
    movieDetailsArray = await getMovieDetailsArray(movieString.value);
    renderCards(movieDetailsArray);
  }
});

document.addEventListener('click', (e) => {
  const target = e.target;

  if (target.dataset.id) {
    const movieID = target.dataset.id;
    const movie = movieDetailsArray.find((movie) => movie.imdbID === movieID);

    if (movie) {
      if (isInWatchList(movieID)) {
        removeFromWatchList(movieID);
      } else {
        addToWatchList(movie);
      }
      toggleButtonText(target);
    }
  }
});

//utility functions

function isInWatchList(movieId) {
  return watchListArray.some((movie) => movie.imdbID === movieId);
}

function addToWatchList(movie) {
  watchListArray.push(movie);
}

function removeFromWatchList(movieId) {
  watchListArray = watchListArray.filter((movie) => movie.imdbID !== movieId);
}

function toggleButtonText(button) {
  button.innerHTML = isInWatchList(button.dataset.id)
    ? '<i class="fa-solid fa-circle-minus"></i> Remove'
    : '<i class="fa-solid fa-circle-plus"></i> Watchlist';
}

//Render Function -  This function takes the returned Data from the fetchMovie.js function and renders a card for each movie and displays it on to the DOM - if there was an error it will handle the error by displaying an error message on the DOM
function renderCards(movieDetailsArray) {
  movieString.value = ``;
  searchResultsContainer.innerHTML = ``;

  //error message displayed on DOM
  if (!movieDetailsArray) {
    searchResultsContainer.innerHTML = `
    <h3 class="error-message">
    Unable to find what you’re looking for. Please try another search.
    </h3>`;
    return;
  }

  //Creating movie card for each movie in the array
  movieDetailsArray.map((movie) => {
    searchResultsContainer.innerHTML += `
    <div class="search-result-card">
            <div class="img-container">
              <img src="${
                movie.Poster.length < 5
                  ? './images/icons/movie-film-icon.svg'
                  : movie.Poster
              }" alt="${movie.Title} Poster" />
            </div>
            <div class="text-container">
              <div class="top-section">
                <h3 class="movie-title">${movie.Title}</h3>
                <span id="movie-rating"
                  > ${
                    movie.Ratings.length > 0
                      ? '<i class="fa-solid fa-star"></i> ' +
                        movie.Ratings[0].Value.slice(0, 3)
                      : ''
                  }</span
                >
              </div>
              <div class="middle-section">
                <span class="run-time">${movie.Runtime}</span
                ><span class="genre">${movie.Genre}</span
                ><button id="add-to-watch-list" data-id="${movie.imdbID}">
                  <i class="fa-solid fa-circle-plus"></i> Watchlist
                </button>
              </div>
              <div class="bottom-section">
                <p class="movie-description">
                 ${movie.Plot}
                </p>
              </div>
            </div>
          </div>
    `;
  });
}
