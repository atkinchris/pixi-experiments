import setupInputHandler from '../utils/input'
import { NONE, isOpposite } from '../utils/directions'

function createHandler(map, initialPosition, getDirection = setupInputHandler()) {
  let destination = initialPosition
  let direction = NONE

  const getNewDestination = (position, reachedDestination) => {
    const newDirection = getDirection()

    if (reachedDestination || isOpposite(newDirection, direction)) {
      const newDestination = map.getAdjacentTile(position, newDirection)

      if (newDestination && newDestination.passable) {
        destination = newDestination
        direction = newDirection
      }

      const nextDestination = map.getAdjacentTile(position, direction)

      if (nextDestination && nextDestination.passable) {
        destination = nextDestination
      }
    }

    return destination
  }

  const getCurrentDestination = () => destination

  return {
    getNewDestination,
    getCurrentDestination,
  }
}

export default createHandler
