import { ALL_DIRECTIONS, NONE, isOpposite } from '../utils/directions'

function getDistanceSquared(a, b) {
  const x = a.x - b.x
  const y = a.y - b.y
  return (x * x) + (y * y)
}

function handler(player) {
  return ({ x, y, currentTile: { exits }, direction = NONE }) => {
    const target = { x: player.x, y: player.y }
    const byDistance = ALL_DIRECTIONS
      .filter(d => !isOpposite(d, direction))
      .map(d => ({
        distance: getDistanceSquared({ x: x + d.x, y: y + d.y }, target),
        direction: d,
      }))
      .sort((a, b) => a.distance > b.distance)

    return byDistance[0].direction
  }
}

export default handler
