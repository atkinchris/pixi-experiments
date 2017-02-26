import 'pixi.js'
import Stats from 'stats.js'
import './LightSpriteRenderer'
import { DirectionalLight, AmbientLight, PointLight } from './lights'

const viewWidth = window.innerWidth
const viewHeight = window.innerHeight

const renderer = new PIXI.WebGLRenderer(viewWidth, viewHeight)

document.body.appendChild(renderer.view)

const carContainer = new PIXI.Container()
const stage = new PIXI.Container()
const stats = new Stats()

const lightHeight = 150
const allLights = []

const amLight = new AmbientLight({
  color: 0x555555,
  brightness: 0.6,
})

// const dirLight = new DirectionalLight({
//   color: 0xffdd66,
//   brightness: 1,
//   ambientColor: 0x555555,
//   ambientBrightness: 0.6,
//   position: {
//     x: 300,
//     y: 0,
//     z: lightHeight,
//   },
//   target: {
//     x: 300,
//     y: 700,
//     z: 0,
//   },
// })

const mouseLight = new PointLight({
  color: 0xffffff,
  brightness: 4,
  position: {
    x: viewWidth / 2,
    y: viewHeight / 2,
    z: lightHeight,
  },
})

allLights.push(amLight)
// allLights.push(dirLight)
// allLights.push(mouseLight)


function createClickLight(x, y) {
  const clickLight = new PointLight({
    color: 0xee3311,
    brightness: 8,
    falloff: [0.3, 6, 60],
    position: {
      x,
      y,
      z: lightHeight,
    },
  })
  allLights.push(clickLight)
}

stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.top = '0px'
document.body.appendChild(stats.domElement)

function animate() {
  requestAnimationFrame(animate)
  stats.begin()
  // carContainer.rotation += 0.005
  renderer.render(stage)
  stats.end()
}

function onLoad(loader, res) {
  const car = new PIXI.Sprite(res.car_diffuse.texture)

  carContainer.position.set(viewWidth / 2, viewHeight / 2)
  carContainer.pivot = new PIXI.Point(41, 101)

  car.normalTexture = res.car_normal.texture
  car.pluginName = 'lightSprite'
  car.lights = allLights

  const leftHeadlight = new DirectionalLight({
    color: 0xffdd66,
    brightness: 1,
    ambientColor: 0x555555,
    ambientBrightness: 0.6,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    target: {
      x: 300,
      y: 700,
      z: 0,
    },
  })

  allLights.push(leftHeadlight)

  carContainer.addChild(car)
  carContainer.addChild(leftHeadlight)

  stage.addChild(carContainer)

  renderer.view.addEventListener('mousemove', (e) => {
    const rect = e.target.getBoundingClientRect()

    mouseLight.position.x = e.clientX - rect.left
    mouseLight.position.y = e.clientY - rect.top
  })

  renderer.view.addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect()

    createClickLight(e.clientX - rect.left, e.clientY - rect.top)
  })

  animate()
}

PIXI.loader
    .add('car_diffuse', 'assets/car.png')
    .add('car_normal', 'assets/car_normal.png')
    .load(onLoad)
