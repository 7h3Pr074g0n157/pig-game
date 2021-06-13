'use strict';

let currentScore = 0;
const dice = document.querySelector('.dice');

const player1 = {
  isActive: true,
  playerSection: document.querySelector('.player--0'),
  currentScore: document.getElementById('current--0'),
  score: document.getElementById('score--0'),
};

const player2 = {
  isActive: false,
  playerSection: document.querySelector('.player--1'),
  currentScore: document.getElementById('current--1'),
  score: document.getElementById('score--1'),
};

function newGame() {
  currentScore = 0;

  player1.isActive = true;
  player1.currentScore.textContent = 0;
  player1.score.textContent = 0;

  player2.isActive = false;
  player2.currentScore.textContent = 0;
  player2.score.textContent = 0;
}

function updateCurrentScore(currentScore) {
  if (player1.isActive) {
    player1.currentScore.textContent = currentScore;
  } else {
    player2.currentScore.textContent = currentScore;
  }
}

function toggleActivePlayer(currentScore) {
  updateCurrentScore(currentScore);

  if (player1.isActive) {
    player1.playerSection.classList.remove('player--active');
    player2.playerSection.classList.add('player--active');
  } else {
    player2.playerSection.classList.remove('player--active');
    player1.playerSection.classList.add('player--active');
  }

  player1.isActive = !player1.isActive;
  player2.isActive = !player2.isActive;
}

function saveScore() {
  let score;
  if (player1.isActive) {
    score = Number(player1.score.textContent);
    score += currentScore;
    player1.score.textContent = score;
    toggleActivePlayer(0);
  } else {
    score = Number(player2.score.textContent);
    score += currentScore;
    player2.score.textContent = score;
    toggleActivePlayer(0);
  }
}

function handleCurrentScore(diceNumber) {
  if (diceNumber === 1) {
    toggleActivePlayer(0);
  } else {
    if (player1.isActive) {
      currentScore = Number(player1.currentScore.textContent);
      currentScore += diceNumber;
    } else {
      currentScore = Number(player2.currentScore.textContent);
      currentScore += diceNumber;
    }
    updateCurrentScore(currentScore);
  }
}

function rollDice() {
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${diceNumber}.png`;
  handleCurrentScore(diceNumber);
}

document.querySelector('.btn--roll').addEventListener('click', rollDice);
document.querySelector('.btn--hold').addEventListener('click', saveScore);
document.querySelector('.btn--new').addEventListener('click', newGame);
