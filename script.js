let sandworm = []
let direction = ''
let startPosition = [7, 5]
let counter = 1
let sandwormLenght = 4

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

const moveRight = () => {
  sandworm.push([...startPosition])
  const cell = document.querySelectorAll(`#c${startPosition[0]} div`)
  cell[startPosition[1]].style.backgroundColor = 'yellow'
  startPosition[0]++
  if (counter >= sandwormLenght) {
    let shift = sandworm.shift()
    const cellShift = document.querySelectorAll(`#c${shift[0]} div`)
    if ((shift[1] + shift[0]) % 2 === 0) {
      cellShift[shift[1]].style.backgroundColor = '#ff3333'
    } else {
      cellShift[shift[1]].style.backgroundColor = '#ff9999'
    }
  }
  counter++
  for (let i = 0; i < sandworm.length; i++) {
    console.log(sandworm[i])
  }
  console.log('-------------------------------')
}

window.addEventListener('keydown', (arrow) => {
  if (
    arrow.key === 'ArrowRight' &&
    (direction === '' || (direction != 'left' && direction != 'right'))
  ) {
    direction = 'right'
    setInterval(moveRight, 2000)
  } else if (
    arrow.key === 'ArrowLeft' &&
    (direction === '' || direction != 'right')
  ) {
    direction = 'left'
    console.log('left')
  } else if (
    arrow.key === 'ArrowUp' &&
    (direction === '' || direction != 'down')
  ) {
    direction = 'up'
    console.log('up')
  } else if (
    arrow.key === 'ArrowDown' &&
    (direction === '' || direction != 'up')
  ) {
    direction = 'down'
    console.log('down')
  }
})
