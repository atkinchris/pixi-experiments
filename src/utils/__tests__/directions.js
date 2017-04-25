import { isOpposite, LEFT, RIGHT, UP, DOWN, NONE } from '../directions'

describe('directions', () => {
  it('returns "true" if the directions are opposite', () => {
    expect(isOpposite(LEFT, RIGHT)).toBe(true)
    expect(isOpposite(RIGHT, LEFT)).toBe(true)

    expect(isOpposite(UP, DOWN)).toBe(true)
    expect(isOpposite(DOWN, UP)).toBe(true)
  })

  it('returns "false" if the directions are not opposite', () => {
    expect(isOpposite(LEFT, UP)).toBe(false)
    expect(isOpposite(LEFT, DOWN)).toBe(false)
    expect(isOpposite(RIGHT, UP)).toBe(false)
    expect(isOpposite(RIGHT, DOWN)).toBe(false)

    expect(isOpposite(UP, LEFT)).toBe(false)
    expect(isOpposite(UP, RIGHT)).toBe(false)
    expect(isOpposite(DOWN, LEFT)).toBe(false)
    expect(isOpposite(DOWN, RIGHT)).toBe(false)

    expect(isOpposite(NONE, NONE)).toBe(false)
  })
})
