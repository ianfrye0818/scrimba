const player = document.getElementById('player');

function playSong(id) {
  player.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
}
