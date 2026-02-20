'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for 1 and switch or add roll to score
    if (dice !== 1) {
      //add dice to current score and switch player
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // clear current score for the current player, then switch
      switchPlayer();
    }
  }
});

//Not set yet
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      //finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      document.querySelector('#winnerDisplay').textContent =
        `Player ${activePlayer + 1} Wins!`;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.remove('hidden');

  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document.querySelector('#winnerDisplay').textContent = ``;
});
