import arrayToMap from './arrayToMap'
import { calculateAdjacents, getTile } from './mapper'
import { worldToMap } from './coordinates'
import mapData from './map.json'

const TEST_MAP = arrayToMap(mapData)

function createTileMap(map = TEST_MAP) {
  const mapObjects = calculateAdjacents(map)

  const getTileFromMap = (x, y) => {
    const tile = getTile(mapObjects, x, y)

    return tile || { passable: false, x, y }
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
