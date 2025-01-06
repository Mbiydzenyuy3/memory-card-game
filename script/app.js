// Card symbols (pairs)
const cardSymbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍑']
const cards = [...cardSymbols, ...cardSymbols] // Duplicate for pairs

// Shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = (Math.floor(Math.random() * (i + 1))[(array[i], array[j])] = [
      array[j],
      array[i],
    ])
  }
  return array
}

const timerElement = document.getElementById('timer')
const startButton = document.getElementById('start')
const restartButton = document.getElementById('restart')
const scoreElement = document.getElementById('score')

// Variables to track game state
let flippedCards = []
let matchedPairs = 0
let attempts = 0
let gameStarted = false
let score = 0
let seconds = 0
let timer

// Create game board
function createGameBoard() {
  const gameBoard = document.querySelector('.game-board')
  gameBoard.innerHTML = '' // Clear any existing cards
  shuffle(cards).forEach((symbol) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.symbol = symbol
    card.innerHTML = `<span class='card-content'>${symbol}</span>`
    gameBoard.appendChild(card)

    // Hide the symbol initially
    card.querySelector('.card-content').style.visibility = 'hidden'

    // Add event listener for card flip
    card.addEventListener('click', () => {
      if (gameStarted) {
        flipCard(card)
      }
    })
  })
}

function startGame() {
  createGameBoard()
  score = 0
  seconds = 0
  scoreElement.textContent = score
  timerElement.textContent = '00:00'
  gameStarted = true
  startTimer()
}

function startTimer() {
  clearInterval(timer)
  timer = setInterval(() => {
    seconds++
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    timerElement.textContent = `${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }, 1000)
}

function endGame() {
  clearInterval(timer)
  gameStarted = false
  setTimeout(() => {
    windows.alert(`Congratulations! You won in ${attempts} attempts!`)
  }, 3000)
}

startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', startGame)

// Flip a card
function flipCard(card) {
  if (
    card.classList.contains('flipped') ||
    card.classList.contains('matched') ||
    flippedCards.length === 2
  ) {
    return // Prevent flipping already flipped/matched cards or more than 2 cards
  }

  card.classList.add('flipped')
  card.querySelector('.card-content').style.visibility = 'visible'
  flippedCards.push(card)

  if (flippedCards.length === 2) {
    checkForMatch()
  }
}

// Check if the flipped cards match
function checkForMatch() {
  attempts++
  document.getElementById('attemptCount').textContent = attempts

  const [card1, card2] = flippedCards
  if (card1.dataset.symbol === card2.dataset.symbol) {
    // Match found
    card1.classList.add('matched')
    card2.classList.add('matched')
    matchedPairs++

    if (matchedPairs === cardSymbols.length) {
      endGame()
    }
  } else {
    // No match, flip back
    setTimeout(() => {
      card1.classList.remove('flipped')
      card2.classList.remove('flipped')
      card1.querySelector('.card-content').style.visibility = 'hidden'
      card2.querySelector('.card-content').style.visibility = 'hidden'
    }, 1000)
  }

  flippedCards = [] // Reset flipped cards
}

// Initialize game
createGameBoard()
