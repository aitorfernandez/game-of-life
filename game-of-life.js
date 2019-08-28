export default (p) => {
  const size = 72

  function getWidth() {
    return p.windowWidth - size
  }

  function getHeight() {
    return p.windowHeight - size
  }

  function drawRect(column, row) {
    p.noStroke()
    p.fill(235)

    const padding = size / 6

    p.rect(
      (column * size) + (padding / 2), (row * size) + (padding / 2), size - padding, size - padding
    )
  }

  function drawLines(column, row) {
    p.strokeWeight(1)
    p.stroke(205)

    const center = p.createVector(
      column * size, row * size
    )

    p.line(center.x - (size / 12), center.y, center.x + (size / 12), center.y)
    p.line(center.x, center.y - (size / 12), center.x, center.y + (size / 12))
  }

  const columns = Math.floor(getWidth() / size)
  const rows = Math.floor(getHeight() / size)

  const board = Array.from(
    Array(columns), () => Array(rows).fill(0)
  )

  function play() {
    console.log('play')
  }

  function stop() {
    console.log('stop')
  }

  function setup() {
    p.createCanvas(getWidth(), getHeight())
    p.background(255)
    p.noLoop()
    // p.frameRate(1)

    for (let column = 0; column < columns; column += 1) {
      for (let row = 0; row < rows; row += 1) {
        board[column][row] = Math.floor(p.random(2))
      }
    }
  }

  function draw() {
    for (let column = 0; column < columns; column += 1) {
      for (let row = 0; row < rows; row += 1) {
        if (board[column][row]) {
          drawRect(column, row)
        }
        if (
          column > 0
          && row > 0
        ) {
          drawLines(column, row)
        }
      }
    }
  }

  function windowResized() {
    // TODO: don't forget this
    p.resizeCanvas(getWidth(), getHeight())
  }

  p.play = play
  p.stop = stop

  p.setup = setup
  p.draw = draw
  p.windowResized = windowResized
}
