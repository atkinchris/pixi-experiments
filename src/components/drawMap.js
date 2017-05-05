import { mapToWorld } from './coordinates'
import tileTypes from './tileTypes'

function drawMap(game, map) {
  const tiles = map.getTiles()

  tiles.forEach((tile) => {
    if (!tile.passable) return

    const { adjacents: a } = tile

    const typeId = `${a.UP.passable ? 1 : 0}${a.RIGHT.passable ? 1 : 0}${a.DOWN.passable ? 1 : 0}${a.LEFT.passable ? 1 : 0}`
    const type = tileTypes[typeId]

    const { x, y } = mapToWorld(tile)
    const t = game.add.sprite(x, y, 'sprites', `${type}.png`)

    t.anchor.set(0.5, 0.5)
  })
}

export default drawMap
