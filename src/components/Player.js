import setupInputHandler from '../utils/inputHandler'
import interpolate from '../utils/interpolate'

import { NONE } from '../utils/directions'

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

    this.getInputDirection = setupInputHandler()
  }

  update(dt) {
    const distance = dt * this.speed

    if (!this.currentTile) {
      this.currentTile = this.map.getTile({ x: this.posX, y: this.posY })
    }

    if (this.currentHeading === NONE || this.currentTile.passable) {
      this.currentHeading = this.getInputDirection()
    }

    const nextTile = this.map.getAdjacentTile(this.currentTile, this.currentHeading)

    if (nextTile.passable) {
      const nextX = interpolate(this.posX, nextTile.worldX, distance)
      const nextY = interpolate(this.posY, nextTile.worldY, distance)

      this.posX = nextX.value
      this.posY = nextY.value

      if (nextY.reached && nextX.reached) {
        this.currentTile = nextTile
        this.currentHeading = NONE
      }

      this.x = Math.round(this.posX)
      this.y = Math.round(this.posY)
    }
  }
}

export default Player
