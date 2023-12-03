export function isInWatchList(movieId, watchListArray) {
  return watchListArray.some((movie) => movie.imdbID === movieId);
}

export function addToWatchList(movie, watchListArray) {
  movie.isInWatchList = true;
  watchListArray.push(movie);
  localStorage.setItem('watchList', JSON.stringify(watchListArray));
}

export function removeFromWatchList(movieId, watchListArray) {
  watchListArray = watchListArray.filter((movie) => movie.imdbID !== movieId);
  localStorage.setItem('watchList', JSON.stringify(watchListArray));
  return watchListArray;
}

export function toggleButtonText(button, watchListArray) {
  button.innerHTML = isInWatchList(button.dataset.id, watchListArray)
    ? '<i class="fa-solid fa-circle-minus"></i> Remove'
    : '<i class="fa-solid fa-circle-plus"></i> Watchlist';
}
