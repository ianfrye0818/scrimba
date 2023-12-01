import { getMovieDetailsArray } from './fetchMovie.js';

const searchResultsContainer = document.querySelector('.search-results');
const movieString = document.querySelector('#search-box');
const searchButton = document.querySelector('#search-button');
const form = document.querySelector('#search-form');

//event listeners
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (movieString.value) {
    const movieIDArray = await getMovieDetailsArray(movieString.value);
    renderCards(movieIDArray);
  }
});
document.addEventListener('click', (e) => {});

function renderCards(movieIDArray) {
  searchResultsContainer.innerHTML = {};
}
