import setupInputHandler from '../utils/inputHandler'
import { directionToVector } from '../utils/directions'

class Player extends PIXI.Sprite {
  constructor(x, y, map) {
    super(PIXI.loader.resources.player.texture)

    this.posX = x
    this.posY = y
    this.x = x
    this.y = y
    this.map = map

    this.minX = 0 - this.width
    this.minY = 0 - this.height
    this.speed = 30

    this.inputHandler = setupInputHandler()
  }

  update(dt) {
    const direction = this.inputHandler()
    const heading = directionToVector(direction)

    const newX = this.posX + (dt * this.speed * heading.x)
    const newY = this.posY - (dt * this.speed * heading.y)

    const nextTile = this.map.getTile(newX, newY)

    if (nextTile === 0) {
      this.posX = newX
      this.posY = newY
      this.x = Math.round(this.posX)
      this.y = Math.round(this.posY)
    }

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

export default Player
