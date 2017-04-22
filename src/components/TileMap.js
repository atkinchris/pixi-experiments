import createTileMap from '../utils/tileMap'

class Map extends PIXI.Container {
  constructor() {
    super()

    const { texture } = PIXI.loader.resources.tile

    this.map = createTileMap()
    this.map.forEach((x, y, tile, size) => {
      if (tile === 1) {
        const t = new PIXI.Sprite(texture)

        t.x = x * size
        t.y = y * size

        this.addChild(t)
      }
    })
  }

  getAdjacentTile(...args) {
    return this.map.getAdjacentTile(...args)
  }

  getTile(...args) {
    return this.map.getTileAtCoordinates(...args)
  }
}

export default Map
