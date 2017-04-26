import arrayToMap from './arrayToMap'
import { calculateAdjacents } from './mapper'
import mapData from './map.json'

const TEST_MAP = arrayToMap(mapData)

function createTileMap(map = TEST_MAP) {
  const tiles = calculateAdjacents(map)

  function getTile(coordinates) {
    const x = Math.round(coordinates.x)
    const y = Math.round(coordinates.y)

    return tiles.find(t => t.x === x && t.y === y) || { passable: false, x, y }
  }

  const getAdjacentTile = (target, direction) => {
    const x = target.x + direction.x
    const y = target.y + direction.y

    return getTile({ x, y })
  }

  const getDestination = (position, currentDirection, newDirection) => {
    const newDestination = getAdjacentTile(position, newDirection)

    if (newDestination.passable) {
      return newDestination
    }

    const nextDestination = getAdjacentTile(position, currentDirection)

    if (nextDestination.passable) {
      return nextDestination
    }

    return getTile(position)
  }

  const each = fn => tiles.map(fn)

  return {
    each,
    getAdjacentTile,
    getDestination,
    getTile,
  }
}

export default createTileMap
