import { NONE, LEFT, RIGHT, UP, DOWN } from './directions'
import bindKey from './bindKey'

const KEY_MAP = [
  { key: 65, direction: 'left' },
  { key: 68, direction: 'right' },
  { key: 87, direction: 'up' },
  { key: 83, direction: 'down' },
]

function inputHandler() {
  let currentDirection = NONE

  const directions = {}

  KEY_MAP.forEach(({ key, direction }) => {
    directions[direction] = false
    bindKey(key, () => { directions[direction] = true }, () => { directions[direction] = false })
  })

  return () => {
    const { left, right, up, down } = directions

    if (left && currentDirection !== LEFT) {
      currentDirection = LEFT
    } else if (right && currentDirection !== RIGHT) {
      currentDirection = RIGHT
    } else if (up && currentDirection !== UP) {
      currentDirection = UP
    } else if (down && currentDirection !== DOWN) {
      currentDirection = DOWN
    }

    return currentDirection
  }
}

export default inputHandler
