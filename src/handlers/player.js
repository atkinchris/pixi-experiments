import setupInputHandler from '../utils/inputHandler'
import { NONE, isOpposite } from '../utils/directions'

function createHandler(map) {
  const getInputDirection = setupInputHandler()
  let destination = { x: 1, y: 1 }
  let direction = NONE

  return (position, reachedDestination) => {
    const inputDirection = getInputDirection()

    if (reachedDestination || isOpposite(inputDirection, direction)) {
      const newDestination = map.getAdjacentTile(position, inputDirection)

      if (newDestination !== destination && newDestination.passable) {
        direction = inputDirection
        destination = newDestination
      }
    }

    return destination
  }
}

export default createHandler
