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
  const cell = document.querySelectorAll(`#c${startPosition[0]} div`)
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

const moveRight = () => {
  if (startPosition[0] + 1 < 15) {
    startPosition[0]++
    sandworm.push([...startPosition]) //from geek
    sandwormMove()
    if (appleExist === false) {
      addApple()
    }
    if (
      sandworm[sandworm.length - 1][0] === apple[0] &&
      sandworm[sandworm.length - 1][1] === apple[1]
    ) {
      console.log('collected')
      addApple()
    } else if (counter >= sandwormLenght) {
      sandwormEnds()
    }
    console.log('-----------------')
    counter++
  } else {
    console.log('Game Over:  Right Edge')
    clearInterval(rightInterval)
  }
}
const moveUp = () => {
  if (startPosition[1] - 1 > -1) {
    startPosition[1]--
    sandworm.push([...startPosition]) //from geek
    sandwormMove()
    if (appleExist === false) {
      addApple()
    }
    if (
      sandworm[sandworm.length - 1][0] === apple[0] &&
      sandworm[sandworm.length - 1][1] === apple[1]
    ) {
      console.log('collected')
      addApple()
    } else if (counter >= sandwormLenght) {
      sandwormEnds()
    }
    counter++
  } else {
    console.log('Game Over:  Upper Edge')
    clearInterval(upInterval)
  }
}

const moveLeft = () => {
  if (startPosition[0] - 1 > -1) {
    startPosition[0]--
    sandworm.push([...startPosition]) //from geek
    sandwormMove()
    if (appleExist === false) {
      addApple()
    }
    if (
      sandworm[sandworm.length - 1][0] === apple[0] &&
      sandworm[sandworm.length - 1][1] === apple[1]
    ) {
      console.log('collected')
      addApple()
    } else if (counter >= sandwormLenght) {
      sandwormEnds()
    }
    counter++
  } else {
    console.log('Game Over:  Left Edge')
    clearInterval(leftInterval)
  }
}

const moveDown = () => {
  if (startPosition[1] + 1 < 11) {
    startPosition[1]++
    sandworm.push([...startPosition]) //from geek
    sandwormMove()
    if (appleExist === false) {
      addApple()
    }
    if (
      sandworm[sandworm.length - 1][0] === apple[0] &&
      sandworm[sandworm.length - 1][1] === apple[1]
    ) {
      console.log('collected')
      addApple()
    } else if (counter >= sandwormLenght) {
      sandwormEnds()
    }
    counter++
  } else {
    console.log('Game Over:  Bottom Edge')
    clearInterval(downInterval)
  }
}

if (moving) {
  //source: geeksforgeeks
  window.addEventListener('keydown', (arrow) => {
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
  })
}
