import { calculateAdjacents, getTile } from '../mapper'

describe('mapper', () => {
  let map

  beforeEach(() => {
    map = [
      { x: 1, y: 1, passable: true },
      { x: 2, y: 1, passable: true },
      { x: 1, y: 2, passable: true },
      { x: 2, y: 2, passable: true },
    ]
  })

  it('adds adjacent tiles to the map', () => {
    const expected = [
      { x: 1, y: 1, passable: true, adjacent: { LEFT: false, RIGHT: true, UP: false, DOWN: true } },
      { x: 2, y: 1, passable: true, adjacent: { LEFT: true, RIGHT: false, UP: false, DOWN: true } },
      { x: 1, y: 2, passable: true, adjacent: { LEFT: false, RIGHT: true, UP: true, DOWN: false } },
      { x: 2, y: 2, passable: true, adjacent: { LEFT: true, RIGHT: false, UP: true, DOWN: false } },
    ]

    expect(calculateAdjacents(map)).toEqual(expected)
  })

  it('gets a tile at coordinates', () => {
    expect(getTile(map, 1, 1)).toEqual({ x: 1, y: 1, passable: true })
    expect(getTile(map, 0, 1)).toEqual(undefined)
  })
})
