import createTileMap from '../utils/tileMap'
import tileTypes from '../utils/tileTypes'

import { mapToWorld } from '../utils/coordinates'

const degToRad = degrees => degrees * (Math.PI / 180)

class Map extends PIXI.Container {
  constructor() {
    super()

    this.map = createTileMap()
    this.map.each((tile) => {
      if (tile.passable) {
        const { UP, RIGHT, DOWN, LEFT } = tile.adjacent
        const type = tileTypes[`${UP ? 1 : 0}${RIGHT ? 1 : 0}${DOWN ? 1 : 0}${LEFT ? 1 : 0}`]
        const t = PIXI.Sprite.fromFrame(`${type.tile}.png`)

        t.anchor.set(0.5, 0.5)
        t.rotation = degToRad(type.rotation)

        const worldCoords = mapToWorld(tile)
        t.x = worldCoords.x
        t.y = worldCoords.y

        this.addChild(t)
      }
    })
  }

  getAdjacentTile(...args) {
    return this.map.getAdjacentTile(...args)
  }

  getTile(coordinates) {
    return this.map.getTile(coordinates)
  }
}

export default Map
