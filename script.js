const main = document.querySelector('main')
for (let i = 0; i < 10; i++) {
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
