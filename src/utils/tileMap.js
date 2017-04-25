import arrayToMap from './arrayToMap'
import { calculateAdjacents } from './mapper'
import mapData from './map.json'

const TEST_MAP = arrayToMap(mapData)

function createTileMap(map = TEST_MAP) {
  function getTile(x, y) {
    return map.find(t => t.x === x && t.y === y) || { passable: false, x, y }
  }

  const getAdjacentTile = (target, direction) => {
    const x = target.x + direction.x
    const y = target.y + direction.y

    return getTile(x, y)
  }

  const each = fn => calculateAdjacents(map).map(fn)

  return {
    each,
    getAdjacentTile,
    getTile,
  }
}

export default createTileMap
