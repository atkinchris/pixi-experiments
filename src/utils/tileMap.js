import { convertArray, calculateAdjacents, getTile } from './mapper'
import { worldToMap } from './coordinates'

const TEST_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

function createTileMap(map = TEST_MAP) {
  const height = map.length
  const width = map[0].length

  const mapObjects = calculateAdjacents(convertArray(map))

  const getTileFromMap = (x, y) => {
    const tile = getTile(mapObjects, x, y)

    if (!tile || x < 0 || y < 0 || x > width - 1 || y > height - 1) {
      return { passable: false, x, y }
    }

    return tile
  }

  const getAdjacentTile = (target, direction) => {
    const x = target.x + direction.x
    const y = target.y + direction.y

    return getTileFromMap(x, y)
  }

  const getTileAtCoordinates = (coordinates) => {
    const { x, y } = worldToMap(coordinates)

    return getTileFromMap(x, y)
  }

  const each = fn => mapObjects.map(fn)

  return {
    each,
    getAdjacentTile,
    getTileAtCoordinates,
  }
}

export default createTileMap
