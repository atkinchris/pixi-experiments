import setupInputHandler from '../utils/inputHandler'
import moveTo from '../utils/moveTo'
import { mapToWorld } from '../utils/coordinates'

import { NONE } from '../utils/directions'

class Player extends PIXI.Sprite {
  constructor(x, y, map) {
    super(PIXI.loader.resources.sprites.textures['player.png'])

    this.currentHeading = { x: 0, y: 0 }
    this.x = x + (this.width / 2)
    this.y = y + (this.height / 2)
    this.posX = this.x
    this.posY = this.y
    this.map = map
    this.anchor.set(0.5, 0.5)

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
      const next = moveTo(this, mapToWorld(nextTile), distance)

      this.posX = next.x
      this.posY = next.y

      if (next.reached) {
        this.currentTile = nextTile
        this.currentHeading = NONE
      }

      this.x = Math.round(this.posX)
      this.y = Math.round(this.posY)
    }
  }
}

export default Player
