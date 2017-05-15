import { NONE, isOpposite } from '../utils/directions'
import { mapToWorld, worldToMap } from '../utils/coordinates'

function handler({ width = 64, height = 64, position, map }) {
  const speed = 3
  let direction = NONE
  let currentTile = map.getTile(position)

  return ({ x = 0, y = 0 } = {}) => {
    const nextPosition = {
      x: x + (direction.x * speed),
      y: y + (direction.y * speed),
    }
    const leadingEdge = {
      x: nextPosition.x + (direction.x * (width / 2)),
      y: nextPosition.y + (direction.y * (height / 2)),
    }
    const nextTile = map.getTile(worldToMap(leadingEdge))

    if (nextTile.passable && direction !== NONE) {
      currentTile = nextTile
      return nextPosition
    }

    direction = currentTile.exits.find(e => !isOpposite(e, direction))
    return mapToWorld(currentTile)
  }
}

export default handler
