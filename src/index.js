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

  player.update(dt)

  renderer.render(stage)
  stats.end()
}

function onLoad() {
  player = new Player(size / 2, size / 2)
  map = new TileMap()

  stage.addChild(map)
  stage.addChild(player)

  animate()
}

PIXI.loader
    .add('player', 'assets/oval.png')
    .add('tile', 'assets/tile.png')
    .load(onLoad)
