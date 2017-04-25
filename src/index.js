import 'pixi.js'
import setupStats from './utils/setupStats'
import Player from './components/Actor'
import TileMap from './components/TileMap'
import { spritesheet } from './assets'
import { mapToWorld } from './utils/coordinates'
import createHandler from './handlers/player'

const size = 320
const stats = setupStats()

const app = new PIXI.Application({ width: size, height: size, transparent: true })
const { renderer, stage } = app

document.body.appendChild(renderer.view)

let player
let map
let lastTime = performance.now()

function animate(timestamp) {
  requestAnimationFrame(animate)
  stats.begin()

  const dt = 1 / (timestamp - lastTime)
  lastTime = timestamp

  if (!isNaN(dt)) {
    player.update(dt)
  }

  renderer.render(stage)
  stats.end()
}

function onLoad() {
  map = new TileMap()
  player = new Player(mapToWorld({ x: 1, y: 1 }), createHandler(map))

  stage.addChild(map)
  stage.addChild(player)

  animate()
}

PIXI.loader.add('sprites', spritesheet).load(onLoad)
