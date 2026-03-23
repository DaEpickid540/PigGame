'use strict';

// ── Element refs ──────────────────────────────────────────────────────────────
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl    = document.querySelector('.dice');
const btnNew    = document.querySelector('.btn--new');
const btnRoll   = document.querySelector('.btn--roll');
const btnHold   = document.querySelector('.btn--hold');

const winInput  = document.getElementById('win-score-input');
const scoreUp   = document.getElementById('score-up');
const scoreDown = document.getElementById('score-down');

// ── Game state ────────────────────────────────────────────────────────────────
let scores, currentScore, activePlayer, playing;

// ── Helpers ───────────────────────────────────────────────────────────────────
const getWinScore = () => {
  const v = parseInt(winInput.value);
  return isNaN(v) || v < 10 ? 100 : Math.min(v, 999);
};

const updateProgress = player => {
  const pct = Math.min((scores[player] / getWinScore()) * 100, 100);
  document.getElementById(`bar--${player}`).style.width = pct + '%';
  document.getElementById(`pct--${player}`).textContent = Math.floor(pct) + '%';
};

// ── Init game ─────────────────────────────────────────────────────────────────
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  document.getElementById('bar--0').style.width = '0%';
  document.getElementById('bar--1').style.width = '0%';
  document.getElementById('pct--0').textContent = '0%';
  document.getElementById('pct--1').textContent = '0%';

  diceEl.classList.add('hidden');
  document.getElementById('winnerDisplay').textContent = '';

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

// ── Switch player ─────────────────────────────────────────────────────────────
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ── Roll ──────────────────────────────────────────────────────────────────────
btnRoll.addEventListener('click', function () {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

// ── Hold ──────────────────────────────────────────────────────────────────────
btnHold.addEventListener('click', function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  updateProgress(activePlayer);

  if (scores[activePlayer] >= getWinScore()) {
    playing = false;
    diceEl.classList.add('hidden');
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    document.getElementById('winnerDisplay').textContent =
      `🏆 Player ${activePlayer + 1} Wins!`;
  } else {
    switchPlayer();
  }
});

// ── New game ──────────────────────────────────────────────────────────────────
btnNew.addEventListener('click', init);

// ── Win score arrow buttons ───────────────────────────────────────────────────
scoreUp.addEventListener('click', () => {
  const v = parseInt(winInput.value) || 100;
  winInput.value = Math.min(v + 10, 999);
});

scoreDown.addEventListener('click', () => {
  const v = parseInt(winInput.value) || 100;
  winInput.value = Math.max(v - 10, 10);
});

// ── Start ─────────────────────────────────────────────────────────────────────
init();
