// Card symbols (pairs)
const cardSymbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍑']
const cards = [...cardSymbols, ...cardSymbols] // Duplicate for pairs

// Shuffle the cards
function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}

const timerElement = document.getElementById('timer')
const startButton = document.getElementById('start')
const restartButton = document.getElementById('restart')

// Variables to track game state
let flippedCards = []
let matchedPairs = 0
let attempts = 0
let gameStarted = false
let seconds = 0
let timer

// Create game board
function createGameBoard () {
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
function startGame () {
  createGameBoard()
  seconds = 0
  matchedPairs = 0
  attempts = 0
  flippedCards = []
  timerElement.textContent = '00:00'
  document.getElementById('attempt-count').textContent = attempts
  gameStarted = true
  startTimer()
}
function startTimer () {
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
function endGame () {
  clearInterval(timer)
  gameStarted = false
  setTimeout(() => {
    alert(`🎉 Congratulations!🎉  You won in ${attempts} attempts!`)
  }, 3000)
}
startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', startGame)

// Flip a card
function flipCard (card) {
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
function checkForMatch () {
  attempts++
  document.getElementById('attempt-count').textContent = attempts

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
  flippedCards = []
}
createGameBoard()
