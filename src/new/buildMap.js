import { ALL_DIRECTIONS } from '../utils/directions'

const getTile = ({ x, y }, tiles) => tiles.find(t => t.x === x && t.y === y) || {}

function buildMap(data) {
  const tiles = []

  data.forEach((row, y) => {
    row.forEach((value, x) => {
      tiles.push({ x, y, passable: value === 1 })
    })
  })

  const map = tiles.map((tile) => {
    const adjacents = ALL_DIRECTIONS.reduce((out, direction) => ({
      ...out,
      [direction.id]: {
        ...getTile({ x: tile.x + direction.x, y: tile.y + direction.y }, tiles),
        direction,
      },
    }), {})
    const exits = Object.values(adjacents).filter(a => a.passable).map(a => a.direction)
    const isNode = exits.length > 2

    return {
      ...tile,
      adjacents,
      exits,
      isNode,
    }
  })

  return {
    getTile: position => getTile(position, map),
    getTiles: () => map,
  }
}

export default buildMap
