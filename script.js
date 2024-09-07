let sandworm = []
let direction = ''
let startPosition = [7, 5]
let counter = 1
let sandwormLenght = 4
let sandwormSpeed = 200
let rightInterval
let upInterval
let leftInterval
let downInterval

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

const columns = document.querySelectorAll('section')

const sandwormEnds = () => {
  let shift = sandworm.shift()
  const cellShift = document.querySelectorAll(`#c${shift[0]} div`)
  if ((shift[1] + shift[0]) % 2 === 0) {
    cellShift[shift[1]].style.backgroundColor = '#ff3333'
  } else {
    cellShift[shift[1]].style.backgroundColor = '#ff9999'
  }
}

const moveRight = () => {
  sandworm.push([...startPosition])
  const cell = document.querySelectorAll(`#c${startPosition[0]} div`)
  cell[startPosition[1]].style.backgroundColor = 'yellow'
  startPosition[0]++
  if (counter >= sandwormLenght) {
    sandwormEnds()
  }
  counter++
  if (startPosition[0] + 1 === 16) {
    clearInterval(rightInterval)
    // console.log('right edge')
  }
  // for (let i = 0; i < sandworm.length; i++) {
  //   console.log(sandworm[i])
  // }
  // console.log('-------------------------------')
}
const moveUp = () => {
  sandworm.push([...startPosition])
  const cell = document.querySelectorAll(`#c${startPosition[0]} div`)
  cell[startPosition[1]].style.backgroundColor = 'yellow'
  startPosition[1]--
  if (counter >= sandwormLenght) {
    sandwormEnds()
  }
  counter++
  if (startPosition[1] - 1 === -2) {
    clearInterval(upInterval)
  }
}

const moveLeft = () => {
  sandworm.push([...startPosition])
  const cell = document.querySelectorAll(`#c${startPosition[0]} div`)
  cell[startPosition[1]].style.backgroundColor = 'yellow'
  startPosition[0]--
  if (counter >= sandwormLenght) {
    sandwormEnds()
  }
  counter++
  if (startPosition[0] - 1 === -2) {
    clearInterval(leftInterval)
  }
}

const moveDown = () => {
  sandworm.push([...startPosition])
  const cell = document.querySelectorAll(`#c${startPosition[0]} div`)
  cell[startPosition[1]].style.backgroundColor = 'yellow'
  startPosition[1]++
  if (counter >= sandwormLenght) {
    sandwormEnds()
  }
  counter++
  if (startPosition[0] - 1 === -2) {
    clearInterval(downInterval)
  }
}

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
