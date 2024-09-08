let sandworm = []
let direction = ''
let startPosition = [7, 5] //middle of the grid
let counter = 1
let sandwormLenght = 4
let sandwormSpeed = 100
let rightInterval
let upInterval
let leftInterval
let downInterval
let moving = true
let apple = []
let appleExist = false //  indicator to see if there is an apple in the grid
let shift //the shifted value
let head
let score = 0

const scoreLabel = document.createElement('h1')
document.body.append(scoreLabel)
const main = document.querySelector('main')
for (let i = 0; i < 15; i++) {
  let section = document.createElement('section')
  section.setAttribute('id', `c${i}`)
  main.appendChild(section)
  for (let j = 0; j < 11; j++) {
    let div = document.createElement('div')
    section.appendChild(div)
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.border = '1px solid black'
    div.innerText = `${i},${j}`
    if ((j + i) % 2 === 0) {
      div.style.backgroundColor = '#ff3333'
    } else {
      div.style.backgroundColor = '#ff9999'
    }
  }
}

// const columns = document.querySelectorAll('section')

const sandwormMove = () => {
  sandworm.push([...startPosition]) //from geek
  const cell = document.querySelectorAll(`#c${startPosition[0]} div`)
  // for (let i = 0; i < sandworm.length; i++) {

  // const cell = document.querySelector(`#c${startPosition[0]} :nth-child(${startPosition[1]+1})`)
  // if (
  //   startPosition[0] === sandworm[sandworm.length - 1][0] &&
  //   startPosition[1] === sandworm[sandworm.length - 1][1]
  // ) {
  //   console.log(
  //     `${startPosition[0]} === ${sandworm[sandworm.length - 1][0]}
  //       ${startPosition[1]} === ${sandworm[sandworm.length - 1][1]}`
  //   )
  //   cell[startPosition[1]].style.backgroundColor = 'blue'
  // }
  // }
  cell[startPosition[1]].style.backgroundColor = 'yellow'
}

const sandwormEnds = () => {
  shift = sandworm.shift()
  const cellShift = document.querySelectorAll(`#c${shift[0]} div`)
  if ((shift[1] + shift[0]) % 2 === 0) {
    //CSS return to grid color
    cellShift[shift[1]].style.backgroundColor = '#ff3333'
  } else {
    cellShift[shift[1]].style.backgroundColor = '#ff9999'
  }
}

const addApple = () => {
  //syntax from MDN web
  do {
    let c = Math.floor(Math.random() * 15)
    let r = Math.floor(Math.random() * 11)
    apple = [c, r]
    appleExist = true
  } while (sandworm.find(isThere))
  let appleShape = document.querySelector(
    `#c${apple[0]} :nth-child(${apple[1] + 1})`
  )
  appleShape.style.backgroundColor = 'green'
}

const isThere = (position) => {
  //Source: MDN
  if (position[0] === apple[0] && position[1] === apple[1]) {
    return true
  } else return false
}

const checkEatSelf = () => {
  let mouth = sandworm[sandworm.length - 1]
  console.log(mouth)
  for (let i = 0; i < sandworm.length - 1; i++) {
    if (mouth[0] === sandworm[i][0] && mouth[1] === sandworm[i][1]) {
      moving = false
      clearInterval(upInterval)
      clearInterval(downInterval)
      clearInterval(rightInterval)
      clearInterval(leftInterval)
      console.log('just eat it')
    }
  }
}

const moveRight = () => {
  if (startPosition[0] + 1 < 15) {
    startPosition[0]++
    sandwormMove()
    checkEatSelf()
    if (appleExist === false) {
      addApple()
    }
    if (
      sandworm[sandworm.length - 1][0] === apple[0] &&
      sandworm[sandworm.length - 1][1] === apple[1]
    ) {
      score += 10
      scoreLabel.innerText = score
      addApple()
    } else if (counter >= sandwormLenght) {
      sandwormEnds()
    }
    counter++
  } else {
    moving = false
    clearInterval(rightInterval)
  }
}
const moveUp = () => {
  if (startPosition[1] - 1 > -1) {
    startPosition[1]--
    checkEatSelf()
    sandwormMove()
    if (appleExist === false) {
      addApple()
    }
    if (
      sandworm[sandworm.length - 1][0] === apple[0] &&
      sandworm[sandworm.length - 1][1] === apple[1]
    ) {
      score += 10
      scoreLabel.innerText = score
      addApple()
    } else if (counter >= sandwormLenght) {
      sandwormEnds()
    }
    counter++
  } else {
    moving = false
    clearInterval(upInterval)
  }
}

const moveLeft = () => {
  if (startPosition[0] - 1 > -1) {
    startPosition[0]--
    checkEatSelf()
    sandwormMove()
    if (appleExist === false) {
      addApple()
    }
    if (
      sandworm[sandworm.length - 1][0] === apple[0] &&
      sandworm[sandworm.length - 1][1] === apple[1]
    ) {
      score += 10
      scoreLabel.innerText = score
      addApple()
    } else if (counter >= sandwormLenght) {
      sandwormEnds()
    }
    counter++
  } else {
    moving = false
    clearInterval(leftInterval)
  }
}

const moveDown = () => {
  if (startPosition[1] + 1 < 11) {
    startPosition[1]++
    checkEatSelf()
    sandwormMove()
    if (appleExist === false) {
      addApple()
    }
    if (
      sandworm[sandworm.length - 1][0] === apple[0] &&
      sandworm[sandworm.length - 1][1] === apple[1]
    ) {
      score += 10
      scoreLabel.innerText = score
      addApple()
    } else if (counter >= sandwormLenght) {
      sandwormEnds()
    }
    counter++
  } else {
    moving = false
    clearInterval(downInterval)
  }
}

//source: geeksforgeeks
window.addEventListener('keydown', (arrow) => {
  if (moving) {
    if (
      arrow.key === 'ArrowRight' &&
      (direction === '' || (direction != 'right' && direction != 'left'))
    ) {
      direction = 'right'
      clearInterval(upInterval)
      clearInterval(downInterval)
      rightInterval = setInterval(moveRight, sandwormSpeed)
    } else if (
      arrow.key === 'ArrowLeft' &&
      (direction === '' || (direction != 'left' && direction != 'right'))
    ) {
      direction = 'left'
      clearInterval(upInterval)
      clearInterval(downInterval)
      leftInterval = setInterval(moveLeft, sandwormSpeed)
    } else if (
      arrow.key === 'ArrowUp' &&
      (direction === '' || (direction != 'up' && direction != 'down'))
    ) {
      direction = 'up'
      clearInterval(rightInterval)
      clearInterval(leftInterval)
      upInterval = setInterval(moveUp, sandwormSpeed)
    } else if (
      arrow.key === 'ArrowDown' &&
      (direction === '' || (direction != 'down' && direction != 'up'))
    ) {
      direction = 'down'
      clearInterval(rightInterval)
      clearInterval(leftInterval)
      downInterval = setInterval(moveDown, sandwormSpeed)
    }
  }
})
