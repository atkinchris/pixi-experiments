import Phaser from 'phaser'

import setupInputHandler from '../utils/input'
import { NONE, isOpposite } from '../utils/directions'
import { mapToWorld, worldToMap } from '../utils/coordinates'

class Actor extends Phaser.Sprite {
  constructor(game, name, position, map) {
    super(game, position.x, position.y, 'sprites', `${name}.png`)

    this.map = map
    this.anchor.set(0.5, 0.5)
    this.updatePosition(mapToWorld(position))

    this.currentTile = map.getTile(position)

    this.speed = 3
    this.direction = NONE

    this.handler = setupInputHandler()
  }

  updatePosition({ x, y }) {
    this.x = x
    this.y = y
  }

  update() {
    const newDirection = this.handler()
    if (isOpposite(newDirection, this.direction)) {
      this.direction = newDirection
    }

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
      this.direction = newDirection

      this.updatePosition(mapToWorld(currentTile))
    }
  }
}

export default Actor
