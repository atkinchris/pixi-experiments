import setupInputHandler from '../utils/inputHandler'
import { directionToVector } from '../utils/directions'

class Player extends PIXI.Sprite {
  constructor(x, y) {
    super(PIXI.loader.resources.player.texture)

    this.posX = x
    this.posY = y
    this.x = x
    this.y = y


    this.minX = 0 - this.width
    this.minY = 0 - this.height
    this.speed = 30

    this.inputHandler = setupInputHandler()
  }

  update(dt) {
    const direction = this.inputHandler()
    const heading = directionToVector(direction)

    if (!isNaN(dt)) {
      this.posX += dt * this.speed * heading.x
      this.posY -= dt * this.speed * heading.y

      this.x = Math.round(this.posX)
      this.y = Math.round(this.posY)

      if (this.posX < this.minX) {
        this.posX = 320
      }

      if (this.posX > 320) {
        this.posX = this.minX
      }

      if (this.posY < this.minY) {
        this.posY = 320
      }

      if (this.posY > 320) {
        this.posY = this.minY
      }
    }
  }
}

export default Player
