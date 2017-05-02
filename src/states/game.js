import Actor from '../components/Actor'
import drawMap from '../components/TileMap'
import createEnemyHandler from '../handlers/debug'
import createTileMap from '../utils/tileMap'

function gameState(game) {
  let enemy

  function create() {
    // eslint-disable-next-line no-param-reassign
    game.time.advancedTiming = true

    const tileMap = createTileMap()
    drawMap(game, tileMap)

    const enemyStartPosition = { x: 8, y: 8 }
    const enemyHander = createEnemyHandler(tileMap, enemyStartPosition)
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
