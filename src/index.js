import 'pixi.js'
import setupStats from './utils/setupStats'
import setupInputHandler from './utils/inputHandler'
import { directionToVector } from './utils/directions'

const stats = setupStats()
const renderer = new PIXI.WebGLRenderer(640, 640)
document.body.appendChild(renderer.view)

const getDirection = setupInputHandler()
const stage = new PIXI.Container()

let player
let lastTime = performance.now()

function animate(timestamp) {
  requestAnimationFrame(animate)
  stats.begin()

  const dt = 1 / (timestamp - lastTime)
  lastTime = timestamp

  const speed = 60
  const direction = getDirection()
  const heading = directionToVector(direction)

  if (!isNaN(dt)) {
    player.x += dt * speed * heading.x
    player.y -= dt * speed * heading.y
  }

  const minX = 0 - player.width
  const maxX = 640 + player.width
  const minY = 0 - player.height
  const maxY = 640 + player.height

  if (player.x < minX) {
    player.x = 640
  }

  if (player.x > maxX) {
    player.x = 0
  }

  if (player.y < minY) {
    player.y = 640
  }

  if (player.y > maxY) {
    player.y = 0
  }

  renderer.render(stage)
  stats.end()
}

function onLoad(loader, res) {
  player = new PIXI.Sprite(res.player.texture)

  player.x = 320
  player.y = 320

  stage.addChild(player)

  animate()
}

PIXI.loader
    .add('player', 'assets/oval.png')
    .load(onLoad)
