import buildMap from '../components/buildMap'
import drawMap from '../components/drawMap'
import Actor from '../components/Actor'
import Player from '../components/player'

import mapData from '../map.json'

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
