import buildMap from '../utils/buildMap'
import drawMap from '../utils/drawMap'
import Actor from '../components/Actor'
import createEnemyHandler from '../handlers/enemyHandler'
import createPlayerHandler from '../handlers/playerHandler'

import mapData from '../map.json'

function gameState(game) {
  function create() {
    // eslint-disable-next-line no-param-reassign
    game.time.advancedTiming = true

    const map = buildMap(mapData)
    drawMap(game, map)

    const playerHandler = createPlayerHandler()
    const player = new Actor(game, 'player', playerHandler, map, { x: 1, y: 1 })
    game.add.existing(player)

    const enemyHandler = createEnemyHandler(player)
    const enemy = new Actor(game, 'enemy', enemyHandler, map, { x: 1, y: 2 })
    game.add.existing(enemy)
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
