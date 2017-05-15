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

    const enemyHandler = createEnemyHandler({ position: { x: 1, y: 2 }, map })
    const enemy = new Actor(game, 'enemy', enemyHandler)
    game.add.existing(enemy)

    const playerHandler = createPlayerHandler({ position: { x: 1, y: 1 }, map })
    const player = new Actor(game, 'player', playerHandler)
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
