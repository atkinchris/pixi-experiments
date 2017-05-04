import buildMap from '../new/buildMap'
import drawMap from '../new/drawMap'
import Actor from '../new/actor'
import Player from '../new/player'

import mapData from '../utils/tileMap/map.json'

function gameState(game) {
  function create() {
    // eslint-disable-next-line no-param-reassign
    game.time.advancedTiming = true

    const tileMap = buildMap(mapData)
    drawMap(game, tileMap)

    const enemy = new Actor(game, 'enemy', { x: 1, y: 2 }, tileMap)
    game.add.existing(enemy)

    const player = new Player(game, 'player', { x: 1, y: 1 }, tileMap)
    game.add.existing(player)
  }


  function render() {
    game.debug.text(game.time.fps || '--', 2, 14, '#00ff00')
  }

  return {
    create,
    render,
  }
}

export default gameState
