import { removeFromWatchList } from './utils.js';
import { renderWatchListCards } from './renderWatchCards.js';
let watchListArray = JSON.parse(localStorage.getItem('watchList')) || null;

//event listeners
document.addEventListener('DOMContentLoaded', () => {
  if (watchListArray) {
    renderWatchListCards(watchListArray);
  }
});

document.addEventListener('click', (e) => {
  const target = e.target;

  if (target.dataset.id) {
    const movieID = target.dataset.id;

    // Show the modal
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'flex';

    // Handle the confirm and cancel buttons
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');

    confirmButton.addEventListener('click', () => {
      // Remove from watch list
      watchListArray = removeFromWatchList(movieID, watchListArray);
      renderWatchListCards(watchListArray);
      // Hide the modal
      modal.style.display = 'none';
    });

    cancelButton.addEventListener('click', () => {
      // Hide the modal without taking any action
      modal.style.display = 'none';
    });
  }
});
