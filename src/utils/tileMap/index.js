import arrayToMap from './arrayToMap'
import mapData from './map.json'

import { LEFT, RIGHT, UP, DOWN } from '../directions'

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
  const map = mapObjects.map((tile) => {
    const adjacents = [
      { ...getAdjacentTile(mapObjects, tile, UP), direction: UP },
      { ...getAdjacentTile(mapObjects, tile, LEFT), direction: LEFT },
      { ...getAdjacentTile(mapObjects, tile, RIGHT), direction: RIGHT },
      { ...getAdjacentTile(mapObjects, tile, DOWN), direction: DOWN },
    ]

    return { ...tile, adjacents }
  })

  return {
    each: fn => map.map(fn),
    getTile: coordinates => getTile(map, coordinates),
    getAdjacentTile: (coordinates, direction) => getAdjacentTile(map, coordinates, direction),
  }
}

export default createTileMap
export { arrayToMap }
