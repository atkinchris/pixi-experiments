import { NONE, LEFT, isOpposite } from '../utils/directions'
import { mapToWorld } from '../utils/coordinates'

function createHandler(map, initialPosition) {
  let currentDestination = initialPosition
  let currentDirection = LEFT

  const getNewDestination = (position, reachedDestination, distance) => {
    const nextPosition = {
      x: position.x + (currentDirection.x * distance),
      y: position.y + (currentDirection.y * distance),
    }
    const nextTile = map.getTileAtWorldCoordinates(nextPosition)
    const nextTileWorld = mapToWorld(nextTile)

    console.log(reachedDestination)

    if (
      currentDestination.x !== nextTileWorld.x &&
      currentDestination.y !== nextTileWorld.y &&
      nextTile.passable
    ) {
      currentDestination = mapToWorld(nextTile)
    } else {
      currentDestination = nextPosition
    }

    return currentDestination
  }

  return {
    getNewDestination,
  }
}

export default createHandler
