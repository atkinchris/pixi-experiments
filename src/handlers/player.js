import setupInputHandler from '../utils/inputHandler'
import { NONE } from '../utils/directions'

function createHandler(map) {
  const getInputDirection = setupInputHandler()
  let direction = NONE
  let destination = { x: 1, y: 1 }

  return (position, reachedDestination) => {
    const inputDirection = getInputDirection()

    if (direction !== inputDirection || reachedDestination) {
      direction = inputDirection
      const newDestination = map.getAdjacentTile(position, inputDirection)

      if (newDestination.passable) {
        destination = newDestination
      }
    }

    return destination
  }
}

export default createHandler
