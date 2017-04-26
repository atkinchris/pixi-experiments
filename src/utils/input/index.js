import { NONE, LEFT, RIGHT, UP, DOWN } from '../directions'
import bindKey from './bindKey'

const KEY_MAP = [
  { key: 65, direction: LEFT },
  { key: 68, direction: RIGHT },
  { key: 87, direction: UP },
  { key: 83, direction: DOWN },
]

function inputHandler() {
  let currentDirection = NONE

  KEY_MAP.forEach(({ key, direction }) => {
    bindKey(key, () => { currentDirection = direction })
  })

  return () => currentDirection
}

export default inputHandler
