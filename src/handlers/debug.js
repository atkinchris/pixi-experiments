import { NONE, isOpposite } from '../utils/directions'

function createHandler(map, initialPosition, playerHandler) {
  let currentDestination = initialPosition
  let currentDirection = NONE

  const getNewDestination = (position, reachedDestination) => {
    if (reachedDestination) {
      const currentTile = map.getTile(position)

      const nextNode = currentTile.nodes.find(
        node => !isOpposite(currentDirection, node.direction),
      )

      if (nextNode) {
        console.log('Moving to', nextNode)
        currentDestination = nextNode
        currentDirection = nextNode.direction
      } else {
        console.log('Impass')
      }
    }

    return currentDestination
  }

  return {
    getNewDestination,
  }
}

export default createHandler
