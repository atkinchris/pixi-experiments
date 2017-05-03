import buildMap from '../buildMap'
import { RIGHT, DOWN } from '../../utils/directions'

const mapData = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
]

describe('tilemap', () => {
  describe('getTile', () => {
    it('gets the tile at the position', () => {
      const { getTile } = buildMap(mapData)

      expect(getTile({ x: 1, y: 1 })).toMatchObject({ x: 1, y: 1, passable: true })
      expect(getTile({ x: 2, y: 1 })).toMatchObject({ x: 2, y: 1, passable: true })
      expect(getTile({ x: 3, y: 0 })).toMatchObject({ x: 3, y: 0, passable: false })
      expect(getTile({ x: 6, y: 4 })).toMatchObject({ x: 6, y: 4, passable: false })
    })

    it('contains all the adjacent tiles', () => {
      const { getTile } = buildMap(mapData)
      const position = { x: 1, y: 1 }
      const adjacents = {
        LEFT: { passable: false },
        RIGHT: { passable: true },
        UP: { passable: false },
        DOWN: { passable: true },
      }

      expect(getTile(position)).toMatchObject({ adjacents })
    })

    it('contains the available exits from the tile', () => {
      const { getTile } = buildMap(mapData)
      const position = { x: 1, y: 1 }
      const exits = [RIGHT, DOWN]

      expect(getTile(position)).toMatchObject({ exits })
    })

    it('has "isNode" if tile has more than two exits', () => {
      const { getTile } = buildMap(mapData)

      expect(getTile({ x: 1, y: 1 })).toMatchObject({ isNode: false })
      expect(getTile({ x: 3, y: 1 })).toMatchObject({ isNode: true })
      expect(getTile({ x: 5, y: 1 })).toMatchObject({ isNode: false })
    })
  })
})
