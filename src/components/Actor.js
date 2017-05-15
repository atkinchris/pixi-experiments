import Phaser from 'phaser'

class Actor extends Phaser.Sprite {
  constructor(game, name, handler) {
    super(game, 0, 0, 'sprites', `${name}.png`)

    this.anchor.set(0.5, 0.5)
    this.handler = handler
    this.updatePosition(this.handler())
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
