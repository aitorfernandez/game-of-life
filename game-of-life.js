export default (p) => {
  const resolution = 20

  const width = 1020 + resolution
  const height = 760 + resolution

  let grid
  let cols
  let rows

  let update = true

  function createCell(x, y, state) {
    const color = state ? 'black' : 'white'
    const pos = p.createVector(x * resolution, y * resolution)

    function draw() {
      p.noStroke()
      p.fill(color)
      p.circle(pos.x + (resolution / 2), pos.y + (resolution / 2), resolution)
    }

    return {
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
        let col = (x + i + cols) % cols
        let row = (y + j + rows) % rows

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

  function setup() {
    p.createCanvas(width, height)
    p.frameRate(6)

    cols = p.int(p.width / resolution)
    rows = p.int(p.height / resolution)

    grid = make2dArray()

    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        grid[i][j] = createCell(i, j, p.floor(p.random(2)))
      }
    }
  }

  function draw() {
    p.background('whiteSmoke')

    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        grid[i][j].draw()
      }
    }

    // generate next grid
    let next = make2dArray(cols, rows)

    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const state = grid[i][j].state

        const neighbours = countNeighbours(grid, i, j)

        // rules https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules

        // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        if (state === 1 && neighbours < 2) {
          next[i][j] = createCell(i, j, 0)

        // Any live cell with two or three live neighbours lives on to the next generation.
        } else if (state === 1 && (neighbours === 2 || neighbours === 3)) {
          next[i][j] = createCell(i, j, 1)

        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        } else if (state === 1 && neighbours > 3) {
          next[i][j] = createCell(i, j, 0)

        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        }  else if (state === 0 && neighbours === 3) {
          next[i][j] = createCell(i, j, 1)
        } else {
          next[i][j] = createCell(i, j, state)
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

  p.setup = setup
  p.draw = draw
  p.windowResized = windowResized
}
