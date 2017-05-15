import Phaser from 'phaser'

import { mapToWorld } from '../coordinates'

class Actor extends Phaser.Sprite {
  constructor(game, name, position, map, handler) {
    super(game, position.x, position.y, 'sprites', `${name}.png`)

    const { width, height } = this

    this.anchor.set(0.5, 0.5)
    this.updatePosition(mapToWorld(position))
    this.handler = handler({ width, height, position, map })
  }

  updatePosition({ x, y }) {
    this.x = x
    this.y = y
  }

  update() {
    const { x, y } = this
    const newPosition = this.handler({ x, y })

    this.updatePosition(newPosition)
  }
}

export default Actor
