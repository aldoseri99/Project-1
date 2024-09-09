let sandworm = []
let direction = ''
let counter = 1
let sandwormLenght = 4
let moving = false
let apple = []
let appleExist = false //  indicator to see if there is an apple in the grid
let shift //the shifted value
let head
let score = 0
let bestScore = 0
let appleShape //apple icon

let snakeBest = 0
let sandwormBest = 0
let pythonBest = 0
let level = ''

let width = 21
let height = 16

let startPosition = [Math.floor(width / 2), Math.floor(height / 2)] //middle of the grid

//intervals
let rightInterval
let upInterval
let leftInterval
let downInterval
let timeInterval

let sandwormSpeed = 200
let boardColor = '#3A2C1D'
let boardColor2 = '#4E3B2D'

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
  level = 'Desert Wanderer'
  bestScoreLabel.innerText = `Desert Wanderer: ${snakeBest}`
  gridColor()
}
const sandwormLevel = () => {
  sandwormSpeed = 175
  level = 'Spice Hunter'
  bestScoreLabel.innerText = `Spice Hunter: ${sandwormBest}`
  gridColor()
}
const pythonLevel = () => {
  sandwormSpeed = 100
  level = 'Lisan al-Gaib'
  bestScoreLabel.innerText = `Lisan al-Gaib: ${pythonBest}`
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
    // div.style.border = '1px dash #BDAE8F'
    // div.innerText = `${i},${j}`
    div.style.backgroundColor = `${boardColor}`
  }
}
const gameOverLabel = document.querySelector('.game-over')

const sandwormMove = () => {
  sandworm.push([...startPosition]) //from geek
  const cell = document.querySelector(
    `#c${startPosition[0]} div:nth-child(${startPosition[1] + 1})`
  )
  cell.style.backgroundColor = '#A65C3A '
  cell.style.borderRadius = '10px'
  for (let i = 0; i < sandworm.length - 1; i++) {
    const cell = document.querySelector(
      `#c${sandworm[i][0]} div:nth-child(${sandworm[i][1] + 1})`
    )
    cell.style.backgroundColor = '#D4B49D '
  }
}

const sandwormEnds = () => {
  shift = sandworm.shift()
  const cellShift = document.querySelectorAll(`#c${shift[0]} div`)
  cellShift[shift[1]].style.borderRadius = '0px'
  if ((shift[0] + shift[1]) % 2 === 0) {
    cellShift[shift[1]].style.backgroundColor = `${boardColor}`
  } else {
    cellShift[shift[1]].style.backgroundColor = `${boardColor2}`
  }
}

const addApple = () => {
  //syntax from MDN web
  do {
    let c = Math.floor(Math.random() * width)
    let r = Math.floor(Math.random() * height)
    apple = [c, r]
    appleExist = true
  } while (sandworm.find(isThere))
  appleShape = document.querySelector(
    `#c${apple[0]} :nth-child(${apple[1] + 1})`
  )
  appleShape.innerHTML = '<i class="fa-solid fa-apple-whole"></i>'
}

const isThere = (position) => {
  //Source: MDN
  if (position[0] === apple[0] && position[1] === apple[1]) {
    return true
  } else return false
}

const checkEatSelf = () => {
  let mouth = sandworm[sandworm.length - 1]
  for (let i = 0; i < sandworm.length - 1; i++) {
    if (mouth[0] === sandworm[i][0] && mouth[1] === sandworm[i][1]) {
      gameOverLabel.style.display = 'flex'
      moving = false
      clearInterval(upInterval)
      clearInterval(downInterval)
      clearInterval(rightInterval)
      clearInterval(leftInterval)
      break
    }
  }
}

const appleEaten = () => {
  if (
    sandworm[sandworm.length - 1][0] === apple[0] &&
    sandworm[sandworm.length - 1][1] === apple[1]
  ) {
    appleShape.innerHTML = ''
    score += 10
    scoreLabel.innerText = `Score: ${score}`
    if (level === 'Desert Wanderer' && score > snakeBest) {
      bestScoreLabel.innerText = `Desert Wanderer: ${score}`
    } else if (level === 'Spice Hunter' && score > sandwormBest) {
      bestScoreLabel.innerText = `Spice Hunter: ${score}`
    } else if (level === 'Lisan al-Gaib' && score > pythonBest) {
      bestScoreLabel.innerText = `Lisan al-Gaib: ${score}`
    }
    addApple()
  } else if (counter >= sandwormLenght) {
    sandwormEnds()
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
    counter++
  } else {
    gameOverLabel.style.display = 'flex'
    moving = false
    clearInterval(rightInterval)
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
    counter++
  } else {
    gameOverLabel.style.display = 'flex'
    moving = false
    clearInterval(upInterval)
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
    counter++
  } else {
    gameOverLabel.style.display = 'flex'
    moving = false
    clearInterval(leftInterval)
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
    counter++
  } else {
    gameOverLabel.style.display = 'flex'
    moving = false
    clearInterval(downInterval)
  }
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

  if (level === 'Desert Wanderer' && score > snakeBest) {
    snakeBest = score
    bestScoreLabel.innerText = `Desert Wanderer: ${score}`
  } else if (level === 'Spice Hunter' && score > sandwormBest) {
    sandwormBest = score
    bestScoreLabel.innerText = `Spice Hunter: ${score}`
  } else if (level === 'Lisan al-Gaib' && score > pythonBest) {
    pythonBest = score
    bestScoreLabel.innerText = `Lisan al-Gaib: ${score}`
  }
  score = 0
  gameOverLabel.style.display = 'none'
}

restartBtn.addEventListener('click', restart)

//source: geeksforgeeks
window.addEventListener('keydown', (arrow) => {
  console.log(arrow.key)
  if (moving) {
    if (
      (arrow.key === 'ArrowRight' || arrow.key === 'd') &&
      direction != 'right' &&
      direction != 'left'
    ) {
      direction = 'right'
      clearInterval(upInterval)
      clearInterval(downInterval)
      rightInterval = setInterval(moveRight, sandwormSpeed)
    } else if (
      (arrow.key === 'ArrowLeft' || arrow.key === 'a') &&
      direction != 'left' &&
      direction != 'right'
    ) {
      direction = 'left'
      clearInterval(upInterval)
      clearInterval(downInterval)
      leftInterval = setInterval(moveLeft, sandwormSpeed)
    } else if (
      (arrow.key === 'ArrowUp' || arrow.key === 'w') &&
      direction != 'up' &&
      direction != 'down'
    ) {
      direction = 'up'
      clearInterval(rightInterval)
      clearInterval(leftInterval)
      upInterval = setInterval(moveUp, sandwormSpeed)
    } else if (
      (arrow.key === 'ArrowDown' || arrow.key === 's') &&
      direction != 'down' &&
      direction != 'up'
    ) {
      direction = 'down'
      clearInterval(rightInterval)
      clearInterval(leftInterval)
      downInterval = setInterval(moveDown, sandwormSpeed)
    }
  }
})
