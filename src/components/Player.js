import setupInputHandler from '../utils/inputHandler'
import { directionToVector } from '../utils/directions'
import interpolate from '../utils/interpolate'

class Player extends PIXI.Sprite {
  constructor(x, y, map) {
    super(PIXI.loader.resources.player.texture)

    this.currentHeading = { x: 0, y: 0 }
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
    const distance = dt * this.speed

    if (!this.currentTile) {
      this.currentTile = this.map.getTile(this.posX, this.posY)
    }

    if (this.currentHeading.x === 0 && this.currentHeading.y === 0) {
      const inputDirection = this.inputHandler()
      this.currentHeading = directionToVector(inputDirection)
    }

    const nextTile = this.map.getNextTile(this.currentTile, this.currentHeading)
    const nextX = interpolate(this.posX, nextTile.x, distance)
    const nextY = interpolate(this.posY, nextTile.y, distance)

    this.posX = nextX.value
    this.posY = nextY.value

    if (nextY.reached && nextX.reached) {
      this.currentTile = nextTile
    }

    this.x = Math.round(this.posX)
    this.y = Math.round(this.posY)
  }
}

export default Player
