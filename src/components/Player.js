import setupInputHandler from '../utils/inputHandler'
import { directionToVector } from '../utils/directions'

class Player extends PIXI.Sprite {
  constructor(x, y) {
    super(PIXI.loader.resources.player.texture)

    this.x = x
    this.y = y

    this.inputHandler = setupInputHandler()
  }

  update(dt) {
    const speed = 30
    const direction = this.inputHandler()
    const heading = directionToVector(direction)

    if (!isNaN(dt)) {
      this.x += dt * speed * heading.x
      this.y -= dt * speed * heading.y
    }

    const minX = 0 - this.width
    const minY = 0 - this.height

    if (this.x < minX) {
      this.x = 320
    }

    if (this.x > 320) {
      this.x = minX
    }

    if (this.y < minY) {
      this.y = 320
    }

    if (this.y > 320) {
      this.y = minY
    }
  }
}

export default Player
