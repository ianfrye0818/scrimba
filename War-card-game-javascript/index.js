const drawCardBtn = document.getElementById('drawCard');
const playerCard = document.getElementById('playerCard');
const computerCard = document.getElementById('computerCard');

//game variables
let deckId = '';
let computerScore = 0;
let playerScore = 0;
let movesRemaining = 0;
let gameOver = true;
const cardDeckValues = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'JACK',
  'KING',
  'QUEEN',
  'ACE',
];

//event handlers
document
  .getElementById('getNewDeck')
  .addEventListener('click', handleStartNewGame);
document
  .getElementById('startNewGame')
  .addEventListener('click', handleStartNewGame);
drawCardBtn.addEventListener('click', handleDrawCard);

async function handleStartNewGame() {
  resetGame();
  try {
    const response = await fetch(
      'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/'
    );
    if (!response.ok) {
      throw new Error(
        `HTTP Error Code: ${response.status}: ${response.statusText}`
      );
    }
    const data = await response.json();
    initializeGame(data);
  } catch (error) {
    console.error('Error starting a new game:', error.message);
  }
}

async function handleDrawCard() {
  try {
    const response = await fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    );
    if (!response.ok) {
      throw new Error(
        `HTTP Error Code: ${response.status}: ${response.statusText}`
      );
    }
    const data = await response.json();
    playerCard.src = data.cards[0].images.png;
    computerCard.src = data.cards[1].images.png;
    checkAndUpdateScore(data);
    movesRemaining = data.remaining;
    if (movesRemaining === 0) {
      gameOver = true;
    }
    render();
  } catch (error) {
    console.error('Error drawing a card:', error.message);
  }
}

function render() {
  const topContainerEl = document.querySelector('.top-container');
  const mainContainer = document.querySelector('.container');
  const gameOverModal = document.getElementById('game-over-modal');
  document.getElementById('remainingCards').textContent = movesRemaining;
  document.getElementById('computerScoreEl').textContent = computerScore;
  document.getElementById('playerScoreEl').textContent = playerScore;
  if (gameOver) {
    topContainerEl.classList.add('hidden');
    drawCardBtn.classList.add('hidden');
    mainContainer.classList.add('hidden');
    gameOverModal.classList.remove('hidden');
    document.getElementById(
      'finalScore'
    ).innerHTML = `Final Score:<br /> Computer: ${computerScore} | Player: ${playerScore}`;
    document.getElementById('wonGame').textContent =
      playerScore > computerScore
        ? 'You'
        : playerScore < computerScore
        ? 'The Computer'
        : 'Nobody';
  } else {
    topContainerEl.classList.remove('hidden');
    drawCardBtn.classList.remove('hidden');
    mainContainer.classList.remove('hidden');
    gameOverModal.classList.add('hidden');
  }
}

//utility functions
function initializeGame(data) {
  deckId = data.deck_id;
  movesRemaining = data.remaining;
  render();
}
function resetGame() {
  gameOver = false;
  computerScore = 0;
  playerScore = 0;
  document.getElementById('startGame').classList.add('hidden');
  playerCard.src = 'https://deckofcardsapi.com/static/img/back.png';
  computerCard.src = 'https://deckofcardsapi.com/static/img/back.png';
}
function checkAndUpdateScore(data) {
  const playerRoundScore = cardDeckValues.indexOf(data.cards[0].value);
  const computerRoundScore = cardDeckValues.indexOf(data.cards[1].value);
  if (computerRoundScore > playerRoundScore) {
    computerScore++;
  } else if (playerRoundScore > computerRoundScore) {
    playerScore++;
  }
}
