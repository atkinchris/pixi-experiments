import 'pixi.js'
import setupStats from './utils/setupStats'
import setupInputHandler from './utils/inputHandler'
import { directionToVector } from './utils/directions'

const size = 320
const stats = setupStats()
const renderer = new PIXI.WebGLRenderer(size, size)
document.body.appendChild(renderer.view)

const getDirection = setupInputHandler()
const stage = new PIXI.Container()
const tiles = new PIXI.Container()
stage.addChild(tiles)
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

let player
let lastTime = performance.now()

function animate(timestamp) {
  requestAnimationFrame(animate)
  stats.begin()

  const dt = 1 / (timestamp - lastTime)
  lastTime = timestamp

  const speed = 30
  const direction = getDirection()
  const heading = directionToVector(direction)

  if (!isNaN(dt)) {
    player.x += dt * speed * heading.x
    player.y -= dt * speed * heading.y
  }

  const minX = 0 - player.width
  const minY = 0 - player.height

  if (player.x < minX) {
    player.x = size
  }

  if (player.x > size) {
    player.x = minX
  }

  if (player.y < minY) {
    player.y = size
  }

  if (player.y > size) {
    player.y = minY
  }

  renderer.render(stage)
  stats.end()
}

function onLoad(loader, res) {
  player = new PIXI.Sprite(res.player.texture)

  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 1) {
        const t = new PIXI.Sprite(res.tile.texture)

        t.x = x * 32
        t.y = y * 32

        tiles.addChild(t)
      }
    })
  })

  player.x = size / 2
  player.y = size / 2

  stage.addChild(player)

  animate()
}

PIXI.loader
    .add('player', 'assets/oval.png')
    .add('tile', 'assets/tile.png')
    .load(onLoad)
