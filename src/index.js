import 'pixi.js'
import setupStats from './utils/setupStats'
import Player from './components/Player'
import TileMap from './components/TileMap'

const size = 320
const stats = setupStats()
const renderer = new PIXI.WebGLRenderer(size, size)
document.body.appendChild(renderer.view)

const stage = new PIXI.Container()

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
  player = new Player(32, 32, map)

  stage.addChild(map)
  stage.addChild(player)

  animate()
}

PIXI.loader
    .add('player', 'assets/oval.png')
    .add('tile', 'assets/tile.png')
    .load(onLoad)
