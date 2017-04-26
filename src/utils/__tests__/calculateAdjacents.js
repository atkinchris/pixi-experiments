import calculateAdjacents from '../calculateAdjacents'

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
    const expected = {
      x: 1,
      y: 1,
      passable: true,
      adjacent: {
        LEFT: { x: 0, y: 1, passable: false },
        RIGHT: { x: 2, y: 1, passable: true },
        UP: { x: 1, y: 0, passable: false },
        DOWN: { x: 1, y: 2, passable: true },
      },
    }

    expect(calculateAdjacents(map)[0]).toEqual(expected)
  })
})
