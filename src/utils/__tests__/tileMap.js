import createTileMap from '../tileMap'
import { LEFT, RIGHT, UP, DOWN } from '../directions'

const TEST_MAP = [
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 1, 1, 1],
]

describe('tileMap', () => {
  let map

  beforeEach(() => {
    map = createTileMap(TEST_MAP)
  })

  describe('getAdjacentTile', () => {
    it('returns the adjacent tile in the direction from the passed tile', () => {
      const currentTile = { x: 1, y: 1 }

      expect(map.getAdjacentTile(currentTile, LEFT)).toMatchObject({ x: 0, y: 1, passable: false })
      expect(map.getAdjacentTile(currentTile, RIGHT)).toMatchObject({ x: 2, y: 1, passable: true })
      expect(map.getAdjacentTile(currentTile, UP)).toMatchObject({ x: 1, y: 0, passable: false })
      expect(map.getAdjacentTile(currentTile, DOWN)).toMatchObject({ x: 1, y: 2, passable: true })
    })

    it('returns an unpassable tile if there is no adjacent tile in the direction', () => {
      expect(map.getAdjacentTile({ x: 0, y: 3 }, LEFT).passable).toBe(false)
      expect(map.getAdjacentTile({ x: 3, y: 1 }, RIGHT).passable).toBe(false)
      expect(map.getAdjacentTile({ x: 1, y: 0 }, UP).passable).toBe(false)
      expect(map.getAdjacentTile({ x: 3, y: 3 }, DOWN).passable).toBe(false)
    })
  })
})