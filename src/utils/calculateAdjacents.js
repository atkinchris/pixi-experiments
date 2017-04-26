import { LEFT, RIGHT, UP, DOWN } from './directions'

function getTile(tiles, x, y) {
  return tiles.find(t => t.x === x && t.y === y) || { passable: false, x, y }
}

function getInDirection(tiles, x, y, direction) {
  return getTile(tiles, x + direction.x, y + direction.y)
}

function calculateAdjacents(tiles) {
  return tiles.map((tile) => {
    const { x, y } = tile

    return {
      ...tile,
      adjacent: {
        LEFT: getInDirection(tiles, x, y, LEFT),
        RIGHT: getInDirection(tiles, x, y, RIGHT),
        UP: getInDirection(tiles, x, y, UP),
        DOWN: getInDirection(tiles, x, y, DOWN),
      },
    }
  })
}

export default calculateAdjacents
