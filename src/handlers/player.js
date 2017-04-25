import setupInputHandler from '../utils/inputHandler'
import { NONE } from '../utils/directions'

function createHandler(map) {
  const getInputDirection = setupInputHandler()
  let direction = NONE
  let destination = { x: 1, y: 1 }

  const hasReachedDestination = ({ x, y }) => destination.x === x && destination.y === y

  return (position) => {
    const inputDirection = getInputDirection()

    if (direction !== inputDirection || hasReachedDestination(position)) {
      const currentTile = map.getTile(position)
      const newDestination = map.getAdjacentTile(currentTile, inputDirection)

      if (newDestination.passable) {
        direction = inputDirection
        destination = newDestination
      }
    }

    return destination
  }
}

export default createHandler
