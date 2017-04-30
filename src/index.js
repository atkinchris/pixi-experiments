import 'pixi.js'
import setupStats from './utils/setupStats'
import Actor from './components/Actor'
import TileMap from './components/TileMap'
import { spritesheet } from './assets'
import createHandler from './handlers/player'
import createEnemyHandler from './handlers/enemy'
import createTileMap from './utils/tileMap'

const size = 640
const stats = setupStats()

const app = new PIXI.Application({ width: size, height: size, transparent: true })
const { renderer, stage } = app

document.body.appendChild(renderer.view)

let player
let enemy
let map
let lastTime = performance.now()

function animate(timestamp) {
  requestAnimationFrame(animate)
  stats.begin()

  const dt = 1 / (timestamp - lastTime)
  lastTime = timestamp

  if (!isNaN(dt)) {
    player.update(dt)
    enemy.update(dt)
  }

  renderer.render(stage)
  stats.end()
}

function onLoad() {
  const tileMap = createTileMap()
  map = new TileMap(tileMap)
  stage.addChild(map)

  const playerStartPosition = { x: 1, y: 1 }
  const playerHandler = createHandler(tileMap, playerStartPosition)
  player = new Actor('player', playerStartPosition, playerHandler)
  stage.addChild(player)

  const enemyStartPosition = { x: 8, y: 8 }
  const enemyHander = createEnemyHandler(tileMap, enemyStartPosition, playerHandler)
  enemy = new Actor('enemy', enemyStartPosition, enemyHander)
  stage.addChild(enemy)

  animate()
}

PIXI.loader.add('sprites', spritesheet).load(onLoad)
