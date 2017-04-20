const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
const size = 32

class Map extends PIXI.Container {
  constructor() {
    super()

    const { texture } = PIXI.loader.resources.tile

    this.map = map
    this.map.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === 1) {
          const t = new PIXI.Sprite(texture)

          t.x = x * size
          t.y = y * size

          this.addChild(t)
        }
      })
    })
  }

  getTile(x, y) {
    const coordX = Math.round(x / size)
    const coordY = Math.round(y / size)

    return this.map[coordY][coordX]
  }
}

export default Map
