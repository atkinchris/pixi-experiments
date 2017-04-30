import { mapToWorld, worldToMap } from '../utils/coordinates'
import moveTo from '../utils/moveTo'

const SPEED = 60

class Actor extends PIXI.Sprite {
  constructor(name, position, handler) {
    super(PIXI.loader.resources.sprites.textures[`${name}.png`])

    this.handler = handler
    this.anchor.set(0.5, 0.5)
    this.reached = false
    this.updatePosition(mapToWorld(position))
  }

  updatePosition({ x, y }) {
    this.posX = x
    this.posY = y
    this.x = Math.round(this.posX)
    this.y = Math.round(this.posY)
  }

  update(dt) {
    const mapPosition = worldToMap({ x: this.posX, y: this.posY })
    const destination = this.handler.getNewDestination(mapPosition, this.reached)
    const distance = dt * SPEED
    const here = { x: this.posX, y: this.posY }
    const newPosition = moveTo(here, mapToWorld(destination), distance)

    this.reached = newPosition.reached

    this.updatePosition(newPosition)
  }
}

export default Actor
