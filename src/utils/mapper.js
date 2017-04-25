import { LEFT, RIGHT, UP, DOWN } from './directions'

function getTile(map, x, y) {
  return map.find(tile => tile.x === x && tile.y === y)
}

function getInDirection(map, x, y, direction) {
  return getTile(map, x + direction.x, y + direction.y)
}

function calculateAdjacents(mapObjects) {
  return mapObjects.map((tile) => {
    const { x, y } = tile
    const directions = {
      LEFT: getInDirection(mapObjects, x, y, LEFT),
      RIGHT: getInDirection(mapObjects, x, y, RIGHT),
      UP: getInDirection(mapObjects, x, y, UP),
      DOWN: getInDirection(mapObjects, x, y, DOWN),
    }

    return {
      ...tile,
      adjacent: {
        LEFT: directions.LEFT ? directions.LEFT.passable : false,
        RIGHT: directions.RIGHT ? directions.RIGHT.passable : false,
        UP: directions.UP ? directions.UP.passable : false,
        DOWN: directions.DOWN ? directions.DOWN.passable : false,
      },
    }
  })
}

export {
  calculateAdjacents,
  getTile,
}
