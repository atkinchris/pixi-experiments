import buildMap from '../components/buildMap'
import drawMap from '../components/drawMap'
import Actor from '../components/handlers/Actor'
import enemyHandler from '../components/handlers/enemyHandler'
import playerHandler from '../components/handlers/playerHandler'

import mapData from '../map.json'

function gameState(game) {
  function create() {
    // eslint-disable-next-line no-param-reassign
    game.time.advancedTiming = true

    const tileMap = buildMap(mapData)
    drawMap(game, tileMap)

    const enemy = new Actor(game, 'enemy', { x: 1, y: 2 }, tileMap, enemyHandler)
    game.add.existing(enemy)

    const player = new Actor(game, 'player', { x: 1, y: 1 }, tileMap, playerHandler)
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
