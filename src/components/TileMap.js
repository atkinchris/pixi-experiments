import tileTypes from '../utils/tileTypes'
import { mapToWorld } from '../utils/coordinates'
import { LEFT, RIGHT, UP, DOWN } from '../utils/directions'

const degToRad = degrees => degrees * (Math.PI / 180)

class Map extends PIXI.Container {
  constructor(map) {
    super()

    map.each((tile) => {
      if (tile.passable) {
        const typeId = [
          map.getAdjacentTile(tile, UP).passable ? 1 : 0,
          map.getAdjacentTile(tile, RIGHT).passable ? 1 : 0,
          map.getAdjacentTile(tile, DOWN).passable ? 1 : 0,
          map.getAdjacentTile(tile, LEFT).passable ? 1 : 0,
        ].join('')

        const type = tileTypes[typeId]
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
}

export default Map
