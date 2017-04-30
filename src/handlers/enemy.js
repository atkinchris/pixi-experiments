import { NONE, LEFT, RIGHT, UP, DOWN, isOpposite } from '../utils/directions'

function getDistanceSquared(a, b) {
  const x = a.x - b.x
  const y = a.y - b.y
  return (x * x) + (y * y)
}

function createHandler(map, initialPosition, playerHandler) {
  let currentDestination = initialPosition
  let currentDirection = NONE

  const getNewDestination = (position, reachedDestination) => {
    if (reachedDestination) {
      const playerDestination = playerHandler.getCurrentDestination()
      const directions = [LEFT, RIGHT, UP, DOWN].filter(d => !isOpposite(d, currentDirection))
      const adjacents = directions.map(direction => ({
        destination: map.getAdjacentTile(position, direction),
        direction,
        distance: 0,
      })).filter(({ destination }) => destination.passable)

      if (adjacents.length === 1) {
        currentDestination = adjacents[0].destination
        currentDirection = adjacents[0].direction
      }

      if (adjacents.length > 1) {
        const byDistance = adjacents.map((choice) => {
          const { destination } = choice
          const distance = getDistanceSquared(destination, playerDestination)

          return { ...choice, distance }
        }).sort((a, b) => a.distance > b.distance)

        currentDestination = byDistance[0].destination
        currentDirection = byDistance[0].direction
      }
    }

    return currentDestination
  }

  return {
    getNewDestination,
  }
}

export default createHandler
