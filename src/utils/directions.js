const NONE = { x: 0, y: 0 }
const LEFT = { x: -1, y: 0 }
const RIGHT = { x: 1, y: 0 }
const UP = { x: 0, y: -1 }
const DOWN = { x: 0, y: 1 }

LEFT.opposite = RIGHT
RIGHT.opposite = LEFT
UP.opposite = DOWN
DOWN.opposite = UP

const isOpposite = (a, b) => a !== NONE && b !== NONE && a.x === (b.x * -1) && a.y === (b.y * -1)
const ALL = [LEFT, RIGHT, UP, DOWN]

export {
  NONE,
  LEFT,
  RIGHT,
  UP,
  DOWN,
  ALL,
  isOpposite,
}
