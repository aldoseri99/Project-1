let sandworm = [] // the snake nested array [[column, row], [column, row], [column, row]]
let direction = ''
let counter = 1 //counter for the initial length of the snake
let sandwormLenght = 4 //the length for the counter
let moving = false //to indicate if the snake can move

//apple variable
let apple = [] //to store the apple position [column, row]
let appleExist = false //  indicator to see if there is an apple in the grid
let score = 0
let appleShape //apple icon

//double point variable
let double = [] //to store the apple position [column, row]
let doublePoint = false //to indicate if the double point exisit in the grid
let doublePointActive //to indicate that the double point is activated
let doubleRate //the rate of the double to appears
let doublePlace //double shape
//Timer that increase with each score point collected called time attack

// stop watch variables
let stopWatchStart = false
let secondes = 0
let minutes = 0

//best score for each diifculty
let snakeBest = 0
let sandwormBest = 0
let pythonBest = 0
let cowboyBest = 0
let level = ''

//grid size
let width = 21
let height = 16

// snake start position
let startPosition = [Math.floor(width / 2), Math.floor(height / 2)] //middle of the grid

//intervals
let rightInterval
let upInterval
let leftInterval
let downInterval
let timeInterval
let stopWatchInterval

let sandwormSpeed = 200
let boardColor = '#3A2C1D'
let boardColor2 = '#4E3B2D'
let headColor = '#A65C3A'
let bodyColor = '#D4B49D'

const stopWatchLabel = document.querySelector('.time-label')

const snakeBtn = document.querySelector('.snake')
const sandwormBtn = document.querySelector('.sandworm')
const pythonBtn = document.querySelector('.python')
const levelselector = document.querySelector('.level')

const main = document.querySelector('main')

const gridColor = () => {
  moving = true
  main.style.backgroundColor = boardColor
  levelselector.style.display = 'none'
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const cell = document.querySelector(`#c${i} :nth-child(${j + 1})`)
      if ((j + i) % 2 === 0) {
        cell.style.backgroundColor = `${boardColor}`
      } else {
        cell.style.backgroundColor = `${boardColor2}`
      }
    }
  }
}

const snakeLevel = () => {
  sandwormSpeed = 250
  level = 'Snake'
  bestScoreLabel.innerText = `Snake: ${snakeBest}`
  gridColor()
}
const sandwormLevel = () => {
  sandwormSpeed = 175
  level = 'Sandworm'
  bestScoreLabel.innerText = `Sandworm: ${sandwormBest}`
  gridColor()
}
const pythonLevel = () => {
  sandwormSpeed = 100
  level = 'Python'
  bestScoreLabel.innerText = `Python: ${pythonBest}`
  gridColor()
}

snakeBtn.addEventListener('click', snakeLevel)
sandwormBtn.addEventListener('click', sandwormLevel)
pythonBtn.addEventListener('click', pythonLevel)

const scoreLabel = document.querySelector('.score-label')
scoreLabel.innerText = 'Score: 00'
const bestScoreLabel = document.querySelector('.best-score-label')
bestScoreLabel.innerText = `Best score: 0`
const restartBtn = document.querySelector('.restart-btn')

for (let i = 0; i < width; i++) {
  let section = document.createElement('section')
  section.setAttribute('id', `c${i}`)
  main.appendChild(section)
  for (let j = 0; j < height; j++) {
    let div = document.createElement('div')
    section.appendChild(div)
    div.style.width = '30px'
    div.style.height = '30px'
  }
}
const gameOverLabel = document.querySelector('.game-over')

const sandwormMove = () => {
  sandworm.push([...startPosition]) //from geek
  const cell = document.querySelector(
    `#c${startPosition[0]} div:nth-child(${startPosition[1] + 1})`
  )
  cell.style.backgroundColor = headColor
  cell.style.borderRadius = '10px'
  for (let i = 0; i < sandworm.length - 1; i++) {
    const cell = document.querySelector(
      `#c${sandworm[i][0]} div:nth-child(${sandworm[i][1] + 1})`
    )
    cell.style.backgroundColor = bodyColor
  }
}

const sandwormEnds = () => {
  let shift = sandworm.shift()
  const cellShift = document.querySelectorAll(`#c${shift[0]} div`)
  cellShift[shift[1]].style.borderRadius = '0px'
  if ((shift[0] + shift[1]) % 2 === 0) {
    cellShift[shift[1]].style.backgroundColor = `${boardColor}`
  } else {
    cellShift[shift[1]].style.backgroundColor = `${boardColor2}`
  }
}

const addApple = () => {
  do {
    let c = Math.floor(Math.random() * width)
    let r = Math.floor(Math.random() * height)
    apple = [c, r]
    appleExist = true
  } while (sandworm.find(isThereApple))
  appleShape = document.querySelector(
    `#c${apple[0]} :nth-child(${apple[1] + 1})`
  )
  appleShape.innerHTML = '<i class="fa-solid fa-apple-whole"></i>'
}

const isThereApple = (position) => {
  //Source: MDN
  if (position[0] === apple[0] && position[1] === apple[1]) {
    return true
  } else return false
}

const addDouble = () => {
  //syntax from MDN web
  do {
    let c = Math.floor(Math.random() * width)
    let r = Math.floor(Math.random() * height)
    double = [c, r]
    doublePoint = true
  } while (sandworm.find(isThereDouble))
  doublePlace = document.querySelector(
    `#c${double[0]} :nth-child(${double[1] + 1})`
  )
  doublePlace.innerHTML = '<i class="fa-solid fa-2"></i>'
}
const isThereDouble = (position) => {
  //Source: MDN
  if (position[0] === double[0] && position[1] === double[1]) {
    return true
  } else return false
}

const checkEatSelf = () => {
  let mouth = sandworm[sandworm.length - 1]
  for (let i = 0; i < sandworm.length - 1; i++) {
    if (mouth[0] === sandworm[i][0] && mouth[1] === sandworm[i][1]) {
      gameOver()
      break
    }
  }
}

const gameOver = () => {
  gameOverLabel.style.display = 'flex'
  moving = false
  clearInterval(stopWatchInterval)
  clearInterval(upInterval)
  clearInterval(downInterval)
  clearInterval(rightInterval)
  clearInterval(leftInterval)
}

//check if apple is eaten
const appleEaten = () => {
  if (
    // the if statment checks if the position of the head is equals the position of the apple
    sandworm[sandworm.length - 1][0] === apple[0] &&
    sandworm[sandworm.length - 1][1] === apple[1]
  ) {
    appleShape.innerHTML = ''
    if (doublePointActive === true) {
      score += 10
    }
    score += 10

    scoreLabel.innerText = `Score: ${score}` //update score in html and best score
    if (level === 'Snake' && score > snakeBest) {
      bestScoreLabel.innerText = `Snake: ${score}`
    } else if (level === 'Sandworm' && score > sandwormBest) {
      bestScoreLabel.innerText = `Sandworm: ${score}`
    } else if (level === 'Python' && score > pythonBest) {
      bestScoreLabel.innerText = `Python: ${score}`
    }
    addApple()
    doubleRate = Math.floor(Math.random() * 10) //generate the double point rate and call the function
    if (doubleRate === 1 && doublePoint === false) addDouble()
  } else if (counter >= sandwormLenght) {
    sandwormEnds()
  }
}

//check if the double point is collected
const doubleCollected = () => {
  if (
    sandworm[sandworm.length - 1][0] === double[0] &&
    sandworm[sandworm.length - 1][1] === double[1]
  ) {
    doublePlace.innerHTML = ''
    doublePointActive = true //activate double point, after 5 seconde deactivate
    setTimeout(() => {
      doublePointActive = false
      doublePoint = false
    }, 5000)
  }
}

const moveRight = () => {
  if (startPosition[0] + 1 < width) {
    startPosition[0]++
    sandwormMove()
    checkEatSelf()
    if (appleExist === false) {
      addApple()
    }
    appleEaten()
    doubleCollected()
    counter++
  } else {
    gameOver()
  }
}
const moveUp = () => {
  if (startPosition[1] - 1 > -1) {
    startPosition[1]--
    sandwormMove()
    checkEatSelf()
    if (appleExist === false) {
      addApple()
    }
    appleEaten()
    doubleCollected()
    counter++
  } else {
    gameOver()
  }
}

const moveLeft = () => {
  if (startPosition[0] - 1 > -1) {
    startPosition[0]--
    sandwormMove()
    checkEatSelf()
    if (appleExist === false) {
      addApple()
    }
    appleEaten()
    doubleCollected()
    counter++
  } else {
    gameOver()
  }
}

const moveDown = () => {
  if (startPosition[1] + 1 < height) {
    startPosition[1]++
    sandwormMove()
    checkEatSelf()
    if (appleExist === false) {
      addApple()
    }
    appleEaten()
    doubleCollected()
    counter++
  } else {
    gameOver()
  }
}

const stopWatch = () => {
  stopWatchStart = true
  secondes++
  if (secondes === 60) {
    secondes = 0
    minutes++
  }
  if (secondes <= 9 && minutes <= 9) {
    stopWatchLabel.innerText = `Time 0${minutes}:0${secondes}`
  } else if (secondes <= 9) {
    stopWatchLabel.innerText = `Time ${minutes}:0${secondes}`
  } else if (minutes <= 9) {
    stopWatchLabel.innerText = `Time 0${minutes}:${secondes}`
  }
}

const startStopWatch = () => {
  if (stopWatchStart === false) {
    stopWatchStart = true
    stopWatchInterval = setInterval(stopWatch, 1000)
  }
  clearInterval(rightInterval)
  clearInterval(leftInterval)
  clearInterval(upInterval)
  clearInterval(downInterval)
}

//reset values and change the best score if needed
const restart = () => {
  console.log('restart')
  scoreLabel.innerText = `Score: 00`
  moving = false
  sandworm = []
  direction = ''
  startPosition = [Math.floor(width / 2), Math.floor(height / 2)]
  counter = 1
  appleExist = false
  levelselector.style.display = 'flex'
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const cell = document.querySelector(`#c${i} :nth-child(${j + 1})`)
      cell.innerHTML = ''
      cell.style.borderRadius = '0px'
      cell.style.backgroundColor = ''
    }
  }
  stopWatchLabel.innerText = 'Time 00:00'
  secondes = 0
  minutes = 0
  stopWatchStart = false

  if (level === 'Snake' && score > snakeBest) {
    snakeBest = score
    bestScoreLabel.innerText = `Snake: ${score}`
  } else if (level === 'Sandworm' && score > sandwormBest) {
    sandwormBest = score
    bestScoreLabel.innerText = `Sandworm: ${score}`
  } else if (level === 'Python' && score > pythonBest) {
    pythonBest = score
    bestScoreLabel.innerText = `Python: ${score}`
  }
  score = 0
  gameOverLabel.style.display = 'none'
}

restartBtn.addEventListener('click', restart)

let keyPress = 0
let coolDown = 100
//source: geeksforgeeks
window.addEventListener('keydown', (arrow) => {
  let currentTime = Date.now()
  if (level === 'Snake') {
    coolDown = sandwormSpeed + 5 //snake
  } else if (level === 'Sandworm') {
    coolDown = sandwormSpeed + 5 //sandworm
  } else if (level === 'Python') {
    coolDown = sandwormSpeed + 5 //python
  }

  if (currentTime - keyPress < coolDown) {
    return
  }
  keyPress = currentTime
  if (moving) {
    if (
      (arrow.key === 'ArrowRight' || arrow.key === 'd') &&
      direction != 'right' &&
      direction != 'left'
    ) {
      direction = 'right'
      startStopWatch()
      rightInterval = setInterval(moveRight, sandwormSpeed)
    } else if (
      (arrow.key === 'ArrowLeft' || arrow.key === 'a') &&
      direction != 'left' &&
      direction != 'right'
    ) {
      direction = 'left'
      startStopWatch()
      leftInterval = setInterval(moveLeft, sandwormSpeed)
    } else if (
      (arrow.key === 'ArrowUp' || arrow.key === 'w') &&
      direction != 'up' &&
      direction != 'down'
    ) {
      direction = 'up'
      startStopWatch()
      upInterval = setInterval(moveUp, sandwormSpeed)
    } else if (
      (arrow.key === 'ArrowDown' || arrow.key === 's') &&
      direction != 'down' &&
      direction != 'up'
    ) {
      direction = 'down'
      startStopWatch()
      downInterval = setInterval(moveDown, sandwormSpeed)
    }
  }
})
