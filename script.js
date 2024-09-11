let sandworm = [] // the snake nested array [[column, row], [column, row], [column, row]]
let direction = ''
let counter = 0 //counter for the initial length of the snake
let sandwormLenght = 3 //the length for the counter
let moving = false //to indicate if the snake can move

//apple variables
let apple = [] //to store the apple position [column, row]
let appleExist = false //  indicator to see if there is an apple in the grid
let score = 0
let appleShape //apple position queryselector

//double point variables
let double = []
let doublePointExist = false
let doublePointActive //to indicate that the double point is activated
let doubleRate
let doubleShape

//police variables
let police = []
let policeExist = false
let policeShape //double shape
let caught = false //check if the player has been caught for the gameover text

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
const cowboyBtn = document.querySelector('.cowboy')
const levelselector = document.querySelector('.level')

const main = document.querySelector('main')
const soundtrack = document.querySelector('.soundtrack')
const busted = document.querySelector('.busted')
const eatSound = document.querySelector('.eat-apple')
const moneySound = document.querySelector('.eat-money')

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
  const background = document.querySelector('.game-part')
  background.style.backgroundImage = 'url(images/home.jpg)'
  document.querySelector('.title h1').innerText = 'Sandworm'
  soundtrack.pause()
}

const snakeLevel = () => {
  sandwormSpeed = 250
  level = 'Snake'
  bestScoreLabel.innerText = `Snake: ${snakeBest}`
  boardColor = '#3A2C1D'
  boardColor2 = '#4E3B2D'
  headColor = '#A65C3A'
  bodyColor = '#D4B49D'
  gridColor()
}
const sandwormLevel = () => {
  sandwormSpeed = 175
  level = 'Sandworm'
  bestScoreLabel.innerText = `Sandworm: ${sandwormBest}`
  boardColor = '#3A2C1D'
  boardColor2 = '#4E3B2D'
  headColor = '#A65C3A'
  bodyColor = '#D4B49D'
  gridColor()
}
const pythonLevel = () => {
  sandwormSpeed = 100
  level = 'Python'
  bestScoreLabel.innerText = `Python: ${pythonBest}`
  boardColor = '#3A2C1D'
  boardColor2 = '#4E3B2D'
  headColor = '#A65C3A'
  bodyColor = '#D4B49D'
  gridColor()
}

const cowboyLevel = () => {
  sandwormSpeed = 100
  level = 'Cowboy'
  bestScoreLabel.innerText = `Cowboy: $${cowboyBest}`
  boardColor = '#E1C8A8'
  boardColor2 = '#DCC3A2 '
  headColor = 'brown'
  bodyColor = 'white'
  gridColor()
  const background = document.querySelector('.game-part')
  background.style.backgroundImage = 'url(images/rdr2.jpg)'
  document.querySelector('.title h1').innerText = 'Cowboy'
  soundtrack.currentTime = 0
  soundtrack.play()
  scoreLabel.innerText = `Money: $00`
}
snakeBtn.addEventListener('click', snakeLevel)
sandwormBtn.addEventListener('click', sandwormLevel)
pythonBtn.addEventListener('click', pythonLevel)
cowboyBtn.addEventListener('click', cowboyLevel)

const scoreLabel = document.querySelector('.score-label')
scoreLabel.innerText = 'Score: 00'
const bestScoreLabel = document.querySelector('.best-score-label')
bestScoreLabel.innerText = `Best score: 0`
const restartBtn = document.querySelector('.restart-btn')

//craete the grid
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

//move the sandworm into the next position
const sandwormMove = () => {
  sandworm.push([...startPosition]) //push the new position into the sandworm array
  const cell = document.querySelector(
    `#c${startPosition[0]} div:nth-child(${startPosition[1] + 1})`
  )
  cell.style.backgroundColor = headColor
  cell.style.borderRadius = '10px'
  for (let i = 0; i < sandworm.length - 1; i++) {
    const cell = document.querySelector(
      `#c${sandworm[i][0]} div:nth-child(${sandworm[i][1] + 1})`
    )
    if (level === 'Cowboy') {
      cell.innerHTML = `<i class="fa-solid fa-sack-dollar"></i>`
    }
    cell.style.backgroundColor = bodyColor
  }
}
let shift
const sandwormEnds = () => {
  shift = sandworm.shift()
  const cellShift = document.querySelectorAll(`#c${shift[0]} div`)
  cellShift[shift[1]].style.borderRadius = '0px'
  if ((shift[0] + shift[1]) % 2 === 0) {
    cellShift[shift[1]].style.backgroundColor = `${boardColor}`
  } else {
    cellShift[shift[1]].style.backgroundColor = `${boardColor2}`
  }
  if (level === 'Cowboy') {
    cellShift[shift[1]].innerHTML = ``
  }
}

const addApple = () => {
  do {
    let c = Math.floor(Math.random() * width)
    let r = Math.floor(Math.random() * height)
    apple = [c, r]
    appleExist = true
  } while (sandworm.find(isThereApple)) //if the apple position is above the sandworm body, keep generating new position
  appleShape = document.querySelector(
    `#c${apple[0]} :nth-child(${apple[1] + 1})`
  )
  appleShape.innerHTML = '<i class="fa-solid fa-bug"></i>' //apple icon
  if (level === 'Cowboy')
    appleShape.innerHTML = '<i class="fa-solid fa-sack-dollar"></i>' //money bag icon
}

//this function check if the generated apple position is the same as the sandworm body
const isThereApple = (position) => {
  if (position[0] === apple[0] && position[1] === apple[1]) {
    return true
  } else return false
}

//add the double point randomly in the grid
const addDouble = () => {
  do {
    let c = Math.floor(Math.random() * width)
    let r = Math.floor(Math.random() * height)
    double = [c, r]
    doublePointExist = true
  } while (sandworm.find(isThereDouble))
  doubleShape = document.querySelector(
    `#c${double[0]} :nth-child(${double[1] + 1})`
  )
  doubleShape.innerHTML = 'X2'
  doubleShape.style.fontSize = '17px'
  doubleShape.style.color = 'gold'
  if (level === 'Cowboy') doubleShape.style.color = 'red'
}
const isThereDouble = (position) => {
  if (position[0] === double[0] && position[1] === double[1]) {
    return true
  } else return false
}

//add the police randomly in the grid
const addPolice = () => {
  do {
    let c = Math.floor(Math.random() * width)
    let r = Math.floor(Math.random() * height)
    police = [c, r]
    policeExist = true
  } while (sandworm.find(isTherePolice))
  policeShape = document.querySelector(
    `#c${police[0]} :nth-child(${police[1] + 1})`
  )
  policeShape.innerHTML = '<i class="fa-solid fa-handcuffs"></i>'
}
const isTherePolice = (position) => {
  if (position[0] === police[0] && position[1] === police[1]) {
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
  let gameOverText = document.querySelector('.game-over h1')
  if (caught === true) {
    //if the player hit the police show this game over messagw
    gameOverText.innerText = ''
    gameOverText.style.width = '555px'
    gameOverText.style.height = '150px'
    gameOverText.style.backgroundImage = 'url(images/wasted.png)'
    gameOverText.style.backgroundSize = 'cover'
    caught = false
  } else {
    gameOverText.style.backgroundImage = 'none'
    gameOverText.innerText = 'Game Over!'
    gameOverText.style.width = 'auto'
    gameOverText.style.height = 'auto'
  }
  moving = false //stop moving and clear all interval
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
      sandworm.unshift([...shift]) //unshif the shifted position so it will increase the sandworm lenght by 2
    }
    score += 10

    scoreLabel.innerText = `Score: ${score}` //update score in html and best score
    if (level === 'Snake' && score > snakeBest) {
      eatSound.play()
      bestScoreLabel.innerText = `Snake: ${score}`
    } else if (level === 'Sandworm' && score > sandwormBest) {
      eatSound.play()
      bestScoreLabel.innerText = `Sandworm: ${score}`
    } else if (level === 'Python' && score > pythonBest) {
      eatSound.play()
      bestScoreLabel.innerText = `Python: ${score}`
    } else if (level === 'Cowboy') {
      moneySound.play()
      scoreLabel.innerText = `Money: $${score}`
      if (score > cowboyBest) {
        //update score in html and best score
        bestScoreLabel.innerText = `Cowboy: $${score}`
      }
    }
    addApple()
    doubleRate = Math.floor(Math.random() * 10) //generate the double point rate and call the function
    if (doubleRate === 1 && doublePointExist === false) addDouble()
    if (level === 'Cowboy' && doubleRate < 3 && policeExist === false)
      addPolice()
  } else if (counter >= sandwormLenght) {
    sandwormEnds()
  }
}

//check if the double point is collected
const doubleMeter = document.querySelector('.double-meter')
const doubleCollected = () => {
  if (
    sandworm[sandworm.length - 1][0] === double[0] &&
    sandworm[sandworm.length - 1][1] === double[1]
  ) {
    doubleShape.innerHTML = ''
    doublePointActive = true //activate double point, deactivate after 7 seconds
    doubleMeter.style.backgroundColor = 'gold'
    if (level === 'Cowboy') doubleMeter.style.backgroundColor = 'red'
    let meterWidth = 630 //interval to decrease the meter by 1 for 7 seconds
    let doubleInterval = setInterval(() => {
      doubleMeter.style.width = `${meterWidth--}px`
    }, 7000 / 630)
    setTimeout(() => {
      doublePointActive = false
      doublePointExist = false
      clearInterval(doubleInterval)
      meterWidth = 630
    }, 7000)
  }
}

//check if the double point is collected
let policeTime = true
const policeCaught = () => {
  if (policeTime) {
    setTimeout(() => {
      //make the police appears for 10 seconds
      policeShape.innerHTML = ''
      policeExist = false
      police = []
      policeTime = true
    }, 10000)
  }
  policeTime = false
  if (
    //if the player hit the police icon
    sandworm[sandworm.length - 1][0] === police[0] &&
    sandworm[sandworm.length - 1][1] === police[1]
  ) {
    soundtrack.pause()
    busted.play()
    caught = true
    gameOver()
  }
}

//move functions, check if the next position is outside the grid 'game over'
const moveRight = () => {
  if (startPosition[0] + 1 < width) {
    startPosition[0]++ //increase the column [c,r]
    sandwormMove()
    checkEatSelf()
    if (appleExist === false) {
      //don't add apple if there is apple in the grid
      addApple()
    }
    appleEaten()
    doubleCollected()
    if (policeExist === true) {
      //don't add apple if there is police in the grid
      policeCaught()
    }
    counter++
  } else {
    gameOver()
  }
}
const moveUp = () => {
  if (startPosition[1] - 1 > -1) {
    startPosition[1]-- //decrease the row [c,r]
    sandwormMove()
    checkEatSelf()
    if (appleExist === false) {
      addApple()
    }
    appleEaten()
    doubleCollected()
    if (policeExist === true) {
      policeCaught()
    }
    counter++
  } else {
    gameOver()
  }
}

const moveLeft = () => {
  if (startPosition[0] - 1 > -1) {
    startPosition[0]-- //decrease the column [c,r]
    sandwormMove()
    checkEatSelf()
    if (appleExist === false) {
      addApple()
    }
    appleEaten()
    doubleCollected()
    if (policeExist === true) {
      policeCaught()
    }
    counter++
  } else {
    gameOver()
  }
}

const moveDown = () => {
  if (startPosition[1] + 1 < height) {
    startPosition[1]++ //increase the row [c,r]
    sandwormMove()
    checkEatSelf()
    if (appleExist === false) {
      addApple()
    }
    appleEaten()
    doubleCollected()
    if (policeExist === true) {
      policeCaught()
    }
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
  // to always make sure that the time display as 00:00 double digits
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
  counter = 0
  appleExist = false
  doublePointExist = false
  policeExist = false
  doublePointActive = false
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
  } else if (level === 'Cowboy' && score > cowboyBest) {
    cowboyBest = score
    bestScoreLabel.innerText = `Cowboy: $${score}`
  }
  if (pythonBest > 100) {
    cowboyBtn.style.display = 'block'
  }
  score = 0
  gameOverLabel.style.display = 'none'
}

restartBtn.addEventListener('click', restart)

let keyPress = 0 //to delay the input
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
