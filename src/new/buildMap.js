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
    const adjacents = ALL_DIRECTIONS.reduce((out, d) => ({
      ...out,
      [d.id]: getTile({ x: tile.x + d.x, y: tile.y + d.y }, tiles),
    }), {})
    const exits = Object.entries(adjacents).filter(([, t]) => t.passable).map(([key]) => key)
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
  }
}

export default buildMap
