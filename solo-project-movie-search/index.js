import { getMovieDetailsArray } from './fetchMovie.js';
import {
  toggleButtonText,
  addToWatchList,
  removeFromWatchList,
  isInWatchList,
} from './utils.js';
import { renderSearchResultCards } from './renderSearchCards.js';

//HTML elements from file
const movieString = document.querySelector('#search-box');
const form = document.querySelector('#search-form');

//desclare the two arrays to keep track of the data changes
let watchListArray = JSON.parse(localStorage.getItem('watchList')) || [];
let movieDetailsArray = [];

//event listener for form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (movieString.value) {
    movieDetailsArray = await getMovieDetailsArray(movieString.value);
    if (movieDetailsArray === null) {
      renderSearchResultCards(movieDetailsArray);
    } else {
      movieDetailsArray.forEach((movie) => {
        movie.isInWatchList = isInWatchList(movie.imdbID, watchListArray);
      });
      renderSearchResultCards(movieDetailsArray);
    }
  }
});

//event listener for the add/remove buttons
document.addEventListener('click', (e) => {
  const target = e.target;

  if (target.dataset.id) {
    const movieID = target.dataset.id;
    const movie = movieDetailsArray.find((movie) => movie.imdbID === movieID);

    if (movie) {
      if (isInWatchList(movieID, watchListArray)) {
        watchListArray = removeFromWatchList(movieID, watchListArray);
      } else {
        addToWatchList(movie, watchListArray);
      }

      toggleButtonText(target, watchListArray);
    }
  }
});
