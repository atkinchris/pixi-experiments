import arrayToMap from '../arrayToMap'

describe('arrayToMap', () => {
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

    expect(arrayToMap(array)).toEqual(map)
  })
})
