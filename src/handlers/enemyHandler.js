import { ALL_DIRECTIONS } from '../utils/directions'

function handler(player) {
  const relative = (position, rel) => {
    if (position < rel) {
      return 1
    }

    if (position > rel) {
      return -1
    }

    return 0
  }

  return ({ x, y }) => {
    const direction = {
      x: relative(x, player.x),
      y: relative(y, player.y),
    }

    return ALL_DIRECTIONS.find(({ x, y }) => x === direction.x && y === direction.y)
  }
}

export default handler
