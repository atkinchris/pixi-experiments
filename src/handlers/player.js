import setupInputHandler from '../utils/inputHandler'
import { NONE, isOpposite } from '../utils/directions'

function createHandler(map, initialPosition) {
  const getInputDirection = setupInputHandler()
  let destination = initialPosition
  let direction = NONE

  return (position, reachedDestination) => {
    const inputDirection = getInputDirection()

    if (reachedDestination || isOpposite(inputDirection, direction)) {
      const newDestination = map.getAdjacentTile(position, inputDirection)

      if (newDestination !== destination && newDestination.passable) {
        direction = inputDirection
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
