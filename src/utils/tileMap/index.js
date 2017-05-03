import { ALL } from '../directions'

import arrayToMap from './arrayToMap'
import mapData from './map.json'

const TEST_MAP = arrayToMap(mapData)
const impassable = ({ x, y }) => ({ x, y, passable: false, adjacents: [] })

function getTile(map, coordinates) {
  const x = Math.round(coordinates.x)
  const y = Math.round(coordinates.y)

  return map.find(t => t.x === x && t.y === y) || impassable(coordinates)
}

function getAdjacentTile(map, coordinates, direction) {
  const x = coordinates.x + direction.x
  const y = coordinates.y + direction.y

  return getTile(map, { x, y })
}

function createTileMap(mapObjects = TEST_MAP) {
  const map = mapObjects.map(tile => ({
    ...tile,
    adjacents: ALL.map(d => ({ ...getAdjacentTile(mapObjects, tile, d), direction: d })).filter(({ passable }) => passable),
  }))

  return {
    each: fn => map.map(fn),
    getTile: coordinates => getTile(map, coordinates),
    getAdjacentTile: (coordinates, direction) => getAdjacentTile(map, coordinates, direction),
  }
}

export default createTileMap
export { arrayToMap }
