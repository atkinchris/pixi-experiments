import arrayToMap from './arrayToMap'
import mapData from './map.json'

const TEST_MAP = arrayToMap(mapData)

function createTileMap(map = TEST_MAP) {
  function getTile(coordinates) {
    const x = Math.round(coordinates.x)
    const y = Math.round(coordinates.y)

    return map.find(t => t.x === x && t.y === y) || { passable: false, x, y }
  }

  function getAdjacentTile(tile, direction) {
    const x = tile.x + direction.x
    const y = tile.y + direction.y

    return getTile({ x, y })
  }

  const each = fn => map.map(fn)

  return {
    each,
    getAdjacentTile,
    getTile,
  }
}

export default createTileMap
export { arrayToMap }
