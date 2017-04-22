import interpolate from '../interpolate'

describe('interpolate', () => {
  it('returns a value closer to the target by the distance', () => {
    const target = 13
    const distance = 1
    const values = [
      { current: 16, expected: 15 },
      { current: 15, expected: 14 },
      { current: 14, expected: 13 },
      { current: 13, expected: 13 },
      { current: 12, expected: 13 },
      { current: 11, expected: 12 },
      { current: 10, expected: 11 },
    ]

    expect.assertions(values.length)
    values.forEach(({ current, expected }) => {
      expect(interpolate(current, target, distance).value).toBe(expected)
    })
  })

  it('does not go beyond the target', () => {
    const target = 13
    const distance = 4
    const values = [
      { current: 16 },
      { current: 15 },
      { current: 14 },
      { current: 13 },
      { current: 12 },
      { current: 11 },
      { current: 10 },
    ]

    expect.assertions(values.length)
    values.forEach(({ current }) => {
      expect(interpolate(current, target, distance).value).toBe(target)
    })
  })

  it('returns the distance it would go beyond the target', () => {
    const target = 13
    const distance = 4
    const values = [
      { current: 16, expected: 1 },
      { current: 15, expected: 2 },
      { current: 14, expected: 3 },
      { current: 13, expected: 4 },
      { current: 12, expected: 3 },
      { current: 11, expected: 2 },
      { current: 10, expected: 1 },
    ]

    expect.assertions(values.length)
    values.forEach(({ current, expected }) => {
      expect(interpolate(current, target, distance).remaining).toBe(expected)
    })
  })

  it('returns "reached=true" if at target', () => {
    const target = 13
    const values = [
      { current: 16, distance: 0, expected: false },
      { current: 16, distance: 1, expected: false },
      { current: 16, distance: 2, expected: false },
      { current: 16, distance: 3, expected: true },
      { current: 16, distance: 4, expected: true },
      { current: 13, distance: 0, expected: true },
      { current: 13, distance: 4, expected: true },
    ]

    expect.assertions(values.length)
    values.forEach(({ current, expected, distance }) => {
      expect(interpolate(current, target, distance).reached).toBe(expected)
    })
  })
})
