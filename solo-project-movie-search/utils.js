//check to see if movie is in watchlist
export function isInWatchList(movieId, watchListArray) {
  return watchListArray.some((movie) => movie.imdbID === movieId);
}

//add a movie to the watchlist
export function addToWatchList(movie, watchListArray) {
  movie.isInWatchList = true;
  watchListArray.push(movie);
  localStorage.setItem('watchList', JSON.stringify(watchListArray));
}

//remove a movie from the watchlist
export function removeFromWatchList(movieId, watchListArray) {
  watchListArray = watchListArray.filter((movie) => movie.imdbID !== movieId);
  localStorage.setItem('watchList', JSON.stringify(watchListArray));
  return watchListArray;
}

//change the button text if the movie is added or removed from watchlist
export function toggleButtonText(button, watchListArray) {
  button.innerHTML = isInWatchList(button.dataset.id, watchListArray)
    ? '<i class="fa-solid fa-circle-minus"></i> Remove'
    : '<i class="fa-solid fa-circle-plus"></i> Watchlist';
}

//set the poster url or set it as a default image if one doesn't exist
export function getMoviePosterUrl(poster) {
  return !poster || poster.length < 5
    ? './images/icons/movie-film-icon.svg'
    : poster;
}

// format the movie rating if there is one
export function getMovieRating(ratings) {
  return ratings && ratings.length > 0
    ? `<i class="fa-solid fa-star"></i> ${ratings[0].Value.slice(0, 3)}`
    : '';
}

//initiliaze button context when page is loaded
export function getWatchlistButtonContent(isInWatchList) {
  return isInWatchList
    ? '<i class="fa-solid fa-circle-minus"></i> Remove'
    : '<i class="fa-solid fa-circle-plus"></i> Watchlist';
}
