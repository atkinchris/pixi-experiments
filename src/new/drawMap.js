import { mapToWorld } from '../utils/coordinates'

const tileTypes = {
  '1111': 'fourway',
  '0101': 'straight-1',
  '1010': 'straight-2',
  '1101': 'tjunction-1',
  '1110': 'tjunction-2',
  '0111': 'tjunction-3',
  '1011': 'tjunction-4',
  '0110': 'corner-1',
  '0011': 'corner-2',
  '1001': 'corner-3',
  '1100': 'corner-4',
}

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
