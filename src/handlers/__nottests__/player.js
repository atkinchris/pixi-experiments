import arrayToMap from '../../utils/arrayToMap'
import tileMap from '../../utils/tileMap'

import createPlayerHandler from '../player'
import { NONE, RIGHT, LEFT } from '../../utils/directions'

const MAP = arrayToMap([
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
])
const INITIAL_POSITION = { x: 1, y: 1 }
const getDirection = jest.fn(() => NONE)

describe('Player Handler', () => {
  let handler

  beforeEach(() => {
    getDirection.mockImplementation(() => NONE)
    handler = createPlayerHandler(tileMap(MAP), INITIAL_POSITION, getDirection)

    handler(INITIAL_POSITION, true)
  })

  it('returns a function', () => {
    expect(typeof handler).toBe('function')
  })

  it('returns the initial position if no input direction has been set', () => {
    expect(handler(INITIAL_POSITION, true)).toMatchObject(INITIAL_POSITION)
  })

  it('returns a new destination in the direction if the current destination is reached', () => {
    getDirection.mockImplementation(() => RIGHT)

    expect(handler(INITIAL_POSITION, true)).toMatchObject({ x: 2, y: 1 })
  })

  it('returns the current destination in the current direction if it is not reached', () => {
    getDirection.mockImplementation(() => RIGHT)

    const firstDestination = handler({ x: 1, y: 1 }, true)
    const secondDestination = handler({ x: 1.5, y: 1 }, false)

    expect(firstDestination).toMatchObject({ x: 2, y: 1 })
    expect(firstDestination).toEqual(secondDestination)
  })

  it('returns a new destination if the input direction is the opposite of the current direction', () => {
    getDirection.mockImplementation(() => RIGHT)
    const firstDestination = handler({ x: 1, y: 1 }, true)

    getDirection.mockImplementation(() => LEFT)
    const secondDestination = handler({ x: 1.5, y: 1 }, false)

    expect(secondDestination).toMatchObject({ x: 1, y: 1 })
    expect(secondDestination).not.toEqual(firstDestination)
  })

  it('returns a new destination in the current direction if the new direction is not passable')
  it('returns the current destination if the next destination in the current direction is not passable')
})
