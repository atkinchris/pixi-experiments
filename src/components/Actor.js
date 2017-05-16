import Phaser from 'phaser'
import { NONE } from '../utils/directions'
import { mapToWorld, worldToMap } from '../utils/coordinates'

class Actor extends Phaser.Sprite {
  constructor(game, name, handler, map, initialPosition) {
    super(game, 0, 0, 'sprites', `${name}.png`)

    this.anchor.set(0.5, 0.5)
    this.handler = handler
    this.direction = NONE
    this.speed = 3
    this.map = map
    this.currentTile = map.getTile(initialPosition)

    this.updatePosition(mapToWorld(initialPosition))
  }

  updatePosition({ x, y }) {
    this.x = x
    this.y = y
  }

  update() {
    const { x, y } = this
    const newDirection = this.handler(this)

    let nextPosition = {
      x: x + (this.direction.x * this.speed),
      y: y + (this.direction.y * this.speed),
    }
    const leadingEdge = {
      x: nextPosition.x + (this.direction.x * (this.width / 2)),
      y: nextPosition.y + (this.direction.y * (this.height / 2)),
    }
    const nextTile = this.map.getTile(worldToMap(leadingEdge))

    if (
      nextTile !== this.currentTile &&
      newDirection !== this.direction &&
      this.currentTile.exits.includes(newDirection)
    ) {
      nextPosition = mapToWorld(this.currentTile)
      this.direction = newDirection
      this.currentTile = nextTile
    } else if (nextTile.passable && this.direction !== NONE) {
      // nextPosition = nextPosition
      // direction = direction
      this.currentTile = nextTile
    } else if (this.currentTile.exits.includes(newDirection)) {
      nextPosition = mapToWorld(this.currentTile)
      this.direction = newDirection
      this.currentTile = nextTile
    } else {
      nextPosition = mapToWorld(this.currentTile)
      this.direction = NONE
      // this.currentTile = this.currentTile
    }

    this.updatePosition(nextPosition)
  }
}

export default Actor
