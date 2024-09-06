let sandworm = []
let direction = ''

const main = document.querySelector('main')
for (let i = 0; i < 15; i++) {
  let section = document.createElement('section')
  section.setAttribute('id', `${i}`)
  main.appendChild(section)
  for (let j = 0; j < 10; j++) {
    let div = document.createElement('div')
    section.appendChild(div)
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.border = '1px solid black'
    if ((j + i) % 2 === 0) {
      div.style.backgroundColor = '#ff3333'
    } else {
      div.style.backgroundColor = '#ff9999'
    }
  }
}

window.addEventListener('keydown', (arrow) => {
  if (arrow.key === 'ArrowRight' && (direction === '' || direction != 'left')) {
    direction = 'right'
    console.log('right')
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
