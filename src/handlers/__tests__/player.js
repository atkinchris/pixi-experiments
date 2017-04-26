import createPlayerHandler from '../player'
import { NONE, RIGHT } from '../../utils/directions'

const MAP = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
]
const INITIAL_POSITION = { x: 1, y: 1 }
const getDirection = jest.fn(() => NONE)

describe('Player Handler', () => {
  let handler

  beforeEach(() => {
    handler = createPlayerHandler(MAP, INITIAL_POSITION, getDirection)
  })

  it('returns a function', () => {
    expect(typeof handler).toBe('function')
  })

  it('returns the initial position if no input direction has been set', () => {
    expect(handler()).toEqual(INITIAL_POSITION)
  })

  it('returns the current destination if it is not reached and the input is not opposite', () => {
    getDirection.mockImplementation(() => RIGHT)
  })

  it('returns a new destination if the input direction is the opposite of the current direction')
  it('returns a new destination if the current destination is reached')
  it('returns a new destination in the current direction if the new direction is not passable')
  it('returns the current destination if the next destination in the current direction is not passable')
})
