export default (p) => {
  const resolution = 24

  const colors = [
    '#878787',
    '#444444',
    '#969696',
    '#9e9e9e',
    '#8c8c8c',
    '#636363',
    '#aaaaaa',
    '#878787',
    '#727272',
    '#cccccc',
    '#686868',
    '#999999',
    '#666666',
    '#333333',
    '#a5a5a5',
    '#8e8e8e',
    '#515151',
    '#232323'
  ]

  let grid, cols, rows

  function createCell(x, y, state, deaths) {
    const pos = p.createVector(x * resolution, y * resolution)

    function draw() {
      const opacity = 1 - (((deaths < 0 ? 0 : deaths > 100 ? 100 : deaths) / 100) * 2.4)
      const color = state ? colors[p.floor(p.random() * colors.length)] : p.color(`rgba(245, 245, 245, ${opacity})`)

      p.noStroke()

      p.fill(color)
      p.smooth()

      const offset = resolution / 2

      let radius = resolution - (opacity * 24)
      if (radius < 0) {
        radius *= -1
      }

      p.circle(pos.x + offset, pos.y + offset, radius > resolution ? offset : radius)
    }

    return {
      deaths,
      draw,
      state
    }
  }

  function make2dArray() {
    return Array.from(
      Array(cols), () => Array(rows)
    )
  }

  function countNeighbours(grid, x, y) {
    let sum = 0

    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        const col = (x + i + cols) % cols
        const row = (y + j + rows) % rows

        sum += grid[col][row].state
      }
    }

    sum -= grid[x][y].state
    return sum
  }

  function play() {
    p.loop()
  }

  function stop() {
    p.noLoop()
  }

  function reset() {
    cols = p.int(p.width / resolution)
    rows = p.int(p.height / resolution)

    grid = make2dArray()

    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const state = p.floor(p.random(2))
        grid[i][j] = createCell(i, j, state, state ? 0 : 1)
      }
    }
  }

  function setup() {
    p.createCanvas(
      p.windowWidth - resolution, p.windowHeight - resolution
    )
    p.frameRate(3)
    reset()
  }

  function draw() {
    p.background('white')

    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        grid[i][j].draw()
      }
    }

    // generate next grid
    const next = make2dArray(cols, rows)

    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const {
          deaths,
          state
        } = grid[i][j]

        const neighbours = countNeighbours(grid, i, j)

        // rules https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules

        // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        if (state === 1 && neighbours < 2) {
          next[i][j] = createCell(i, j, 0, deaths + 1)

        // Any live cell with two or three live neighbours lives on to the next generation.
        } else if (state === 1 && (neighbours === 2 || neighbours === 3)) {
          next[i][j] = createCell(i, j, 1, deaths - 1)

        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        } else if (state === 1 && neighbours > 3) {
          next[i][j] = createCell(i, j, 0, deaths + 1)

        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        } else if (state === 0 && neighbours === 3) {
          next[i][j] = createCell(i, j, 1, deaths - 1)
        } else {
          next[i][j] = createCell(i, j, state, state ? deaths - 1 : deaths + 1)
        }
      }
    }

    grid = next
  }

  function windowResized() {
    // ...
  }

  p.play = play
  p.stop = stop

  p.reset = reset

  p.setup = setup
  p.draw = draw
  p.windowResized = windowResized
}
