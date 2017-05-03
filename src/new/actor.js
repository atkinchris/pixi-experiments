import Phaser from 'phaser'

import { mapToWorld } from '../utils/coordinates'

class Actor extends Phaser.Sprite {
  constructor(game, name, position, map) {
    super(game, position.x, position.y, 'sprites', `${name}.png`)

    this.map = map
    this.anchor.set(0.5, 0.5)
    this.updatePosition(mapToWorld(position))
  }

  updatePosition({ x, y }) {
    this.x = x
    this.y = y
  }
}

export default Actor
