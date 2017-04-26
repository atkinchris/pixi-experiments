import arrayToMap from './arrayToMap'
import calculateAdjacents from './calculateAdjacents'
import mapData from './map.json'

const TEST_MAP = arrayToMap(mapData)

function createTileMap(map = TEST_MAP) {
  const tiles = calculateAdjacents(map)

  function getTile(coordinates) {
    const x = Math.round(coordinates.x)
    const y = Math.round(coordinates.y)

    return tiles.find(t => t.x === x && t.y === y) || { passable: false, x, y }
  }

  function getAdjacentTile(target, direction) {
    const x = target.x + direction.x
    const y = target.y + direction.y

    return getTile({ x, y })
  }

  function isPassable(position, direction) {
    const tile = getTile(position)
    const adjacent = tile.adjacent[direction.id]

    return adjacent ? adjacent.passable : tile.passable
  }

  function getDestination(position, currentDirection, newDirection) {
    const tile = getTile(position)
    const newDestination = tile.adjacent[newDirection.id]

    if (newDestination.passable) {
      return newDestination
    }

    const nextDestination = tile.adjacent[currentDirection.id]

    if (nextDestination.passable) {
      return nextDestination
    }

    return tile
  }

  const each = fn => tiles.map(fn)

  return {
    each,
    getAdjacentTile,
    getDestination,
    getTile,
    isPassable,
  }
}

export default createTileMap
