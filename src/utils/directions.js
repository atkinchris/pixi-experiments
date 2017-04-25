const NONE = { x: 0, y: 0 }
const LEFT = { x: -1, y: 0 }
const RIGHT = { x: 1, y: 0 }
const UP = { x: 0, y: -1 }
const DOWN = { x: 0, y: 1 }

const isOpposite = (a, b) => a !== NONE && b !== NONE && a.x === (b.x * -1) && a.y === (b.y * -1)

export {
  NONE,
  LEFT,
  RIGHT,
  UP,
  DOWN,
  isOpposite,
}
