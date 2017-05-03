import Phaser from 'phaser'

import { mapToWorld, worldToMap } from '../utils/coordinates'
import { NONE, isOpposite } from '../utils/directions'

class Actor extends Phaser.Sprite {
  constructor(game, name, position, map) {
    super(game, position.x, position.y, 'sprites', `${name}.png`)

    this.map = map
    this.anchor.set(0.5, 0.5)
    this.reached = false
    this.updatePosition(mapToWorld(position))

    this.direction = NONE

    this.currentTile = map.getTile(position)
  }

  updatePosition({ x, y }) {
    this.posX = x
    this.posY = y
    this.x = Math.round(this.posX)
    this.y = Math.round(this.posY)
  }

  update() {
    const here = { x: this.posX, y: this.posY }
    const distance = 3

    const nextPosition = {
      x: this.posX + (this.direction.x * distance),
      y: this.posY + (this.direction.y * distance),
    }

    const leadingEdge = {
      x: (this.posX + (this.direction.x * (this.width / 2))) + (this.direction.x * distance),
      y: (this.posY + (this.direction.y * (this.height / 2))) + (this.direction.y * distance),
    }

    const nextTile = this.map.getTile(worldToMap(leadingEdge))

    if (nextTile.passable && this.direction !== NONE) {
      this.updatePosition(nextPosition)
      this.currentTile = nextTile
    } else {
      this.updatePosition(mapToWorld(this.currentTile))

      const possible = this.currentTile.adjacents.filter(
        ({ passable, direction }) => passable && !isOpposite(direction, this.direction),
      )

      this.direction = possible[0].direction
    }
  }
}

export default Actor
