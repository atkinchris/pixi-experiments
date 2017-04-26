import setupInputHandler from '../utils/input'
import { NONE, isOpposite } from '../utils/directions'

function createHandler(map, initialPosition, getDirection = setupInputHandler()) {
  let destination = initialPosition
  let direction = NONE

  return (position, reachedDestination) => {
    const newDirection = getDirection()

    if (reachedDestination || isOpposite(newDirection, direction)) {
      const newDestination = map.getAdjacentTile(position, newDirection)

      if (newDestination !== destination && newDestination.passable) {
        direction = newDirection
        destination = newDestination
      } else {
        const nextDestination = map.getAdjacentTile(position, direction)
        if (nextDestination !== destination && nextDestination.passable) {
          destination = nextDestination
        }
      }
    }

    return destination
  }
}

export default createHandler
