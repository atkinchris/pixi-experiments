import moveTo from '../moveTo'

describe('moveTo', () => {
  it('returns the coordinates nearer to the target by the distance', () => {
    const current = { x: 15, y: 21 }
    const target = { x: 16, y: 32 }
    const distance = 4

    const expected = { x: 16, y: 25 }

    expect(moveTo(current, target, distance)).toMatchObject(expected)
  })

  it('returns "reached=true" when at the target', () => {
    const current = { x: 15, y: 29 }
    const target = { x: 16, y: 32 }
    const distance = 4

    const expected = { reached: true }

    expect(moveTo(current, target, distance)).toMatchObject(expected)
  })
})
