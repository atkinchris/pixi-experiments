import tileTypes from '../utils/tileTypes'
import { mapToWorld } from '../utils/coordinates'
import { LEFT, RIGHT, UP, DOWN } from '../utils/directions'

function drawMap(game, map) {
  map.each((tile) => {
    if (tile.passable) {
      const typeId = [
        map.getAdjacentTile(tile, UP).passable ? 1 : 0,
        map.getAdjacentTile(tile, RIGHT).passable ? 1 : 0,
        map.getAdjacentTile(tile, DOWN).passable ? 1 : 0,
        map.getAdjacentTile(tile, LEFT).passable ? 1 : 0,
      ].join('')

      const type = tileTypes[typeId]
      const { x, y } = mapToWorld(tile)

      const t = game.add.sprite(x, y, 'sprites', `${type.tile}.png`)

      t.anchor.set(0.5, 0.5)
    }
  })
}

export default drawMap
