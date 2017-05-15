import collides from '../collides'

describe('collides', () => {
  it('returns "true" if two rectangles overlap vertically', () => {
    const rectA = { x: 2, y: 3, height: 2, width: 2 }
    const rectB = { x: 2, y: 4, height: 2, width: 2 }

    expect(collides(rectA, rectB)).toBe(true)
  })

  it('returns "false" if two rectangles do not overlap vertically', () => {
    const rectA = { x: 2, y: 3, height: 2, width: 2 }
    const rectB = { x: 2, y: 6, height: 2, width: 2 }

    expect(collides(rectA, rectB)).toBe(false)
  })

  it('returns "true" if two rectangles overlap horizontally', () => {
    const rectA = { x: 3, y: 2, height: 2, width: 2 }
    const rectB = { x: 4, y: 2, height: 2, width: 2 }

    expect(collides(rectA, rectB)).toBe(true)
  })

  it('returns "false" if two rectangles do not overlap horizontally', () => {
    const rectA = { x: 3, y: 2, height: 2, width: 2 }
    const rectB = { x: 6, y: 2, height: 2, width: 2 }

    expect(collides(rectA, rectB)).toBe(false)
  })
})
