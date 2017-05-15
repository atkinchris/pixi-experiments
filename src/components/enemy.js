import Phaser from 'phaser'

import { NONE, isOpposite } from './directions'
import { mapToWorld, worldToMap } from './coordinates'

function handler({ width, height, position, map }) {
  const speed = 3
  let direction = NONE
  let currentTile = map.getTile(position)

  return ({ x, y }) => {
    const nextPosition = {
      x: x + (direction.x * speed),
      y: y + (direction.y * speed),
    }
    const leadingEdge = {
      x: nextPosition.x + (direction.x * (width / 2)),
      y: nextPosition.y + (direction.y * (height / 2)),
    }
    const nextTile = this.map.getTile(worldToMap(leadingEdge))

    if (nextTile.passable && direction !== NONE) {
      currentTile = nextTile
      return nextPosition
    }

    direction = currentTile.exits.find(e => !isOpposite(e, direction))
    return mapToWorld(currentTile)
  }
}

class Enemy extends Phaser.Sprite {
  constructor(game, name, position, map) {
    super(game, position.x, position.y, 'sprites', `${name}.png`)

    const { width, height } = this

    this.anchor.set(0.5, 0.5)
    this.updatePosition(mapToWorld(position))
    this.handler = handler({ width, height, position, map })
  }

  updatePosition({ x, y }) {
    this.x = x
    this.y = y
  }

  update() {
    const { x, y } = this
    const newPosition = this.handler({ x, y })

    this.updatePosition(newPosition)
  }
}

export default Enemy
