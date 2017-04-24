import { convertArray, calculateAdjacents } from '../mapper'

describe('mapper', () => {
  it('converts an array to map objects', () => {
    const array = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]
    const map = [
      { x: 1, y: 1, passable: true },
      { x: 2, y: 1, passable: true },
      { x: 1, y: 2, passable: true },
      { x: 2, y: 2, passable: true },
    ]

    expect(convertArray(array)).toEqual(map)
  })

  it('adds adjacent tiles to the map', () => {
    const map = [
      { x: 1, y: 1, passable: true },
      { x: 2, y: 1, passable: true },
      { x: 1, y: 2, passable: true },
      { x: 2, y: 2, passable: true },
    ]
    const expected = [
      { x: 1, y: 1, passable: true, adjacent: { LEFT: false, RIGHT: true, UP: false, DOWN: true } },
      { x: 2, y: 1, passable: true, adjacent: { LEFT: true, RIGHT: false, UP: false, DOWN: true } },
      { x: 1, y: 2, passable: true, adjacent: { LEFT: false, RIGHT: true, UP: true, DOWN: false } },
      { x: 2, y: 2, passable: true, adjacent: { LEFT: true, RIGHT: false, UP: true, DOWN: false } },
    ]

    expect(calculateAdjacents(map)).toEqual(expected)
  })
})
