let sandworm = []
let direction = ''
let counter = 1
let sandwormLenght = 4
let moving = true
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
let boardColor = '#DDDDDD'

const snakeBtn = document.querySelector('.snake')
const sandwormBtn = document.querySelector('.sandworm')
const pythonBtn = document.querySelector('.python')
const levelselector = document.querySelector('.level')

const main = document.querySelector('main')
main.style.width = '630px'
main.style.height = '480px'
main.style.border = '1px solid black'
main.style.boxShadow = '8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25)'

const gridColor = () => {
  main.style.backgroundColor = boardColor
  levelselector.style.display = 'none'
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const cell = document.querySelector(`#c${i} :nth-child(${j + 1})`)
      cell.style.backgroundColor = `${boardColor}`
    }
  }
}

const snakeLevel = () => {
  sandwormSpeed = 250
  boardColor = '#4BA803'
  gridColor()
}
const sandwormLevel = () => {
  sandwormSpeed = 175
  boardColor = '#DDDDDD'
  gridColor()
}
const pythonLevel = () => {
  sandwormSpeed = 100
  boardColor = '#74832A'
  gridColor()
}
snakeBtn.addEventListener('click', snakeLevel)
sandwormBtn.addEventListener('click', sandwormLevel)
pythonBtn.addEventListener('click', pythonLevel)

const scoreLabel = document.querySelector('.score-label')
scoreLabel.innerText = 'Score: 00'
const bestScoreLabel = document.querySelector('.best-score-label')
bestScoreLabel.innerText = 'Best score: 00'
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
  cell.style.backgroundColor = '#111111'
  cell.style.borderRadius = '10px'
  for (let i = 0; i < sandworm.length - 1; i++) {
    const cell = document.querySelector(
      `#c${sandworm[i][0]} div:nth-child(${sandworm[i][1] + 1})`
    )
    cell.style.backgroundColor = '#FF6347'
  }
}

const sandwormEnds = () => {
  shift = sandworm.shift()
  const cellShift = document.querySelectorAll(`#c${shift[0]} div`)
  cellShift[shift[1]].style.backgroundColor = `${boardColor}`
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
      moving = false
      clearInterval(upInterval)
      clearInterval(downInterval)
      clearInterval(rightInterval)
      clearInterval(leftInterval)
      console.log('just eat it')
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
    if (score > bestScore) {
      console.log(bestScore, score)
      bestScoreLabel.innerText = `Best score: ${score}`
    }
    addApple()
  } else if (counter >= sandwormLenght) {
    sandwormEnds()
  }
}

const timer = () => {
  score += 10
  scoreLabel.innerText = `Score: ${score}`
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

const restart = () => {
  console.log('restart')
  scoreLabel.innerText = `Score: 00`
  moving = true
  sandworm = []
  direction = ''
  startPosition = [Math.floor(width / 2), Math.floor(height / 2)]
  counter = 1
  appleExist = false
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const cell = document.querySelector(`#c${i} :nth-child(${j + 1})`)
      cell.innerHTML = ''
    }
  }
  levelselector.style.display = 'flex'

  if (score > bestScore) {
    bestScore = score
    bestScoreLabel.innerText = `Best score: ${score}`
  }
  score = 0
  gameOverLabel.style.display = 'none'
}

restartBtn.addEventListener('click', restart)

//source: geeksforgeeks
let startTime = true
let keyPress = 0
let cooldown = sandwormSpeed
window.addEventListener('keydown', (arrow) => {
  const currentTime = Date.now()

  if (currentTime - keyPress < cooldown) {
    return
  }
  lastKeyPressTime = currentTime
  if (moving) {
    if (
      arrow.key === 'ArrowRight' &&
      direction != 'right' &&
      direction != 'left'
    ) {
      direction = 'right'
      clearInterval(upInterval)
      clearInterval(downInterval)
      rightInterval = setInterval(moveRight, sandwormSpeed)
    } else if (
      arrow.key === 'ArrowLeft' &&
      direction != 'left' &&
      direction != 'right'
    ) {
      direction = 'left'
      clearInterval(upInterval)
      clearInterval(downInterval)
      leftInterval = setInterval(moveLeft, sandwormSpeed)
    } else if (
      arrow.key === 'ArrowUp' &&
      direction != 'up' &&
      direction != 'down'
    ) {
      direction = 'up'
      clearInterval(rightInterval)
      clearInterval(leftInterval)
      upInterval = setInterval(moveUp, sandwormSpeed)
    } else if (
      arrow.key === 'ArrowDown' &&
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
