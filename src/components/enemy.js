import Phaser from 'phaser'

import { NONE, isOpposite } from './directions'
import { mapToWorld, worldToMap } from './coordinates'

class Enemy extends Phaser.Sprite {
  constructor(game, name, position, map) {
    super(game, position.x, position.y, 'sprites', `${name}.png`)

    this.map = map
    this.anchor.set(0.5, 0.5)
    this.updatePosition(mapToWorld(position))

    this.currentTile = map.getTile(position)

    this.speed = 3
    this.direction = NONE
  }

  updatePosition({ x, y }) {
    this.x = x
    this.y = y
  }

  update() {
    const { direction, speed, width, height, x, y, currentTile } = this

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
      this.currentTile = nextTile
      this.updatePosition(nextPosition)
    } else {
      // Get another direction
      this.direction = currentTile.exits.find(e => !isOpposite(e, direction))

      this.updatePosition(mapToWorld(currentTile))
    }
  }
}

export default Enemy
