import createTileMap from '../'
import arrayToMap from '../arrayToMap'
import { LEFT, RIGHT, UP, DOWN } from '../../directions'

const TEST_MAP = arrayToMap([
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
])

describe('tileMap', () => {
  let map

  beforeEach(() => {
    map = createTileMap(TEST_MAP)
  })

  it('gets a tile at coordinates', () => {
    expect(map.getTile({ x: 1, y: 1 })).toMatchObject({ x: 1, y: 1, passable: true })
    expect(map.getTile({ x: 0, y: 1 })).toMatchObject({ x: 0, y: 1, passable: false })
  })

  it('returns the adjacent tile in the direction from the passed tile', () => {
    const currentTile = { x: 1, y: 1 }

    expect(map.getAdjacentTile(currentTile, LEFT)).toMatchObject({ x: 0, y: 1, passable: false })
    expect(map.getAdjacentTile(currentTile, RIGHT)).toMatchObject({ x: 2, y: 1, passable: true })
    expect(map.getAdjacentTile(currentTile, UP)).toMatchObject({ x: 1, y: 0, passable: false })
    expect(map.getAdjacentTile(currentTile, DOWN)).toMatchObject({ x: 1, y: 2, passable: true })
  })

  it('returns an unpassable tile if there is no adjacent tile in the direction', () => {
    expect(map.getAdjacentTile({ x: 0, y: 3 }, LEFT)).toMatchObject({ passable: false })
    expect(map.getAdjacentTile({ x: 3, y: 1 }, RIGHT)).toMatchObject({ passable: false })
    expect(map.getAdjacentTile({ x: 1, y: 0 }, UP)).toMatchObject({ passable: false })
    expect(map.getAdjacentTile({ x: 3, y: 3 }, DOWN)).toMatchObject({ passable: false })
  })

  describe('isPassable', () => {
    it('returns "true" if the direction is passable', () => {
      const position = { x: 1, y: 1 }
      const direction = RIGHT
      const passable = map.isPassable(position, direction)

      expect(passable).toBe(true)
    })

    it('returns "false" if the direction is not passable', () => {
      const position = { x: 1, y: 1 }
      const direction = UP
      const passable = map.isPassable(position, direction)

      expect(passable).toBe(false)
    })
  })

  describe('getDestination', () => {
    it('returns the tile in the new direction, if passable', () => {
      const currentDirection = RIGHT
      const newDirection = DOWN
      const position = { x: 1, y: 1 }
      const destination = map.getDestination(position, currentDirection, newDirection)

      expect(destination).toMatchObject({ x: 1, y: 2 })
    })

    it('returns the tile in the current direction, if new destination is not passable', () => {
      const currentDirection = RIGHT
      const newDirection = UP
      const position = { x: 1, y: 1 }
      const destination = map.getDestination(position, currentDirection, newDirection)

      expect(destination).toMatchObject({ x: 2, y: 1 })
    })

    it('returns the current tile if neither directions are passable', () => {
      const currentDirection = LEFT
      const newDirection = UP
      const position = { x: 1, y: 1 }
      const destination = map.getDestination(position, currentDirection, newDirection)

      expect(destination).toMatchObject({ x: 1, y: 1 })
    })
  })
})
