import setupInputHandler from '../utils/input'
import { NONE, isOpposite } from '../utils/directions'
import { mapToWorld, worldToMap } from '../utils/coordinates'

function handler({ width, height, position, map }) {
  const inputHandler = setupInputHandler()
  const speed = 3
  let direction = NONE
  let currentTile = map.getTile(position)

  return ({ x, y }) => {
    const newDirection = inputHandler()
    if (isOpposite(newDirection, direction)) {
      direction = newDirection
    }

    let nextPosition = {
      x: x + (direction.x * speed),
      y: y + (direction.y * speed),
    }
    const leadingEdge = {
      x: nextPosition.x + (direction.x * (width / 2)),
      y: nextPosition.y + (direction.y * (height / 2)),
    }
    const nextTile = map.getTile(worldToMap(leadingEdge))

    if (
      nextTile !== currentTile &&
      newDirection !== direction &&
      currentTile.exits.includes(newDirection)
    ) {
      console.log('turn')
      nextPosition = mapToWorld(currentTile)
      direction = newDirection
      currentTile = nextTile
    } else if (nextTile.passable && direction !== NONE) {
      console.log('keep going')
      // nextPosition = nextPosition
      // Don't change the current direction
      currentTile = nextTile
    } else if (currentTile.exits.includes(newDirection)) {
      console.log('go')
      nextPosition = mapToWorld(currentTile)
      direction = newDirection
      currentTile = nextTile
    } else {
      console.log('stop')
      nextPosition = mapToWorld(currentTile)
      direction = NONE
    }

    return nextPosition
  }
}

export default handler
