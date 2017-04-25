import setupInputHandler from '../utils/inputHandler'
import { mapToWorld } from '../utils/coordinates'
import moveTo from '../utils/moveTo'

const SPEED = 30

class Actor extends PIXI.Sprite {
  constructor(position, map) {
    super(PIXI.loader.resources.sprites.textures['player.png'])

    this.anchor.set(0.5, 0.5)
    this.updatePosition(position)

    // TODO: Extract These
    this.getInputDirection = setupInputHandler()
    this.map = map
  }

  getDestination(position) {
    const direction = this.getInputDirection()
    const currentTile = this.map.getTile(position)
    const nextTile = this.map.getAdjacentTile(currentTile, direction)

    if (!nextTile.passable) {
      return currentTile
    }

    this.currentDirection = direction
    return nextTile
  }

  updatePosition({ x, y }) {
    this.posX = x
    this.posY = y
    this.x = Math.round(this.posX)
    this.y = Math.round(this.posY)
  }

  update(dt) {
    if (!this.destination) {
      this.destination = this.getDestination({ x: this.posX, y: this.posY })
    }

    const distance = dt * SPEED
    const here = { x: this.posX, y: this.posY }
    const newPosition = moveTo(here, mapToWorld(this.destination), distance)

    this.updatePosition(newPosition)

    if (newPosition.reached) {
      this.destination = undefined
    }
  }
}

export default Actor
