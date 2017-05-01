const NONE = { x: 0, y: 0, id: 'NONE' }
const LEFT = { x: -1, y: 0, id: 'LEFT' }
const RIGHT = { x: 1, y: 0, id: 'RIGHT' }
const UP = { x: 0, y: -1, id: 'UP' }
const DOWN = { x: 0, y: 1, id: 'DOWN' }

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
