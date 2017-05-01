import Actor from '../components/Actor'
import drawMap from '../components/TileMap'
import createHandler from '../handlers/player'
import createEnemyHandler from '../handlers/debug'
import createTileMap from '../utils/tileMap'

function gameState(game) {
  let player
  let enemy

  function create() {
    // eslint-disable-next-line no-param-reassign
    game.time.advancedTiming = true

    const tileMap = createTileMap()
    drawMap(game, tileMap)

    const playerStartPosition = { x: 1, y: 1 }
    const playerHandler = createHandler(tileMap, playerStartPosition)
    player = new Actor(game, 'player', playerStartPosition, playerHandler)
    game.add.existing(player)

    const enemyStartPosition = { x: 8, y: 8 }
    const enemyHander = createEnemyHandler(tileMap, enemyStartPosition, playerHandler)
    enemy = new Actor(game, 'enemy', enemyStartPosition, enemyHander)
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
