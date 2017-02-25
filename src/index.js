import 'pixi.js'
// import LightSpriteRenderer from './LightSpriteRenderer'
import { AmbientLight, DirectionalLight, PointLight } from './lights'

const viewWidth = 1024
const viewHeight = 512

const renderer = new PIXI.WebGLRenderer(viewWidth, viewHeight)

document.body.appendChild(renderer.view)

const stage = new PIXI.Container()
// const stats = new Stats()

const lightHeight = 90
const allLights = []

const amLight = new AmbientLight({
  color: 0x555555,
  brightness: 0.6,
})

const dirLight = new DirectionalLight({
  color: 0xffdd66,
  brightness: 1,
  ambientColor: 0x555555,
  ambientBrightness: 0.6,
  position: {
    x: 0,
    y: 0,
    z: lightHeight,
  },
  target: {
    x: 0,
    y: 0,
    z: 0,
  },
})

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
allLights.push(dirLight)
allLights.push(mouseLight)


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

// stats.domElement.style.position = 'absolute'
// stats.domElement.style.left = '0px'
// stats.domElement.style.top = '0px'
// document.body.appendChild(stats.domElement)

function animate() {
  // requestAnimationFrame(animate)
  // stats.begin()
  renderer.render(stage)
  // stats.end()
}

function onLoad(loader, res) {
  const rock = new PIXI.Sprite(res.rock_diffuse.texture)

  rock.position.set(640, 280)
  rock.scale.set(0.5, 0.5)

  rock.normalTexture = res.rock_normal.texture
  rock.pluginName = 'lightSprite'
  rock.lights = allLights

  stage.addChild(rock)

  // canvas.addEventListener('mousemove', (e) => {
  //   const rect = e.target.getBoundingClientRect()
  //
  //   mouseLight.position.x = e.clientX - rect.left
  //   mouseLight.position.y = e.clientY - rect.top
  // })
  //
  // canvas.addEventListener('click', (e) => {
  //   const rect = e.target.getBoundingClientRect()
  //
  //   createClickLight(e.clientX - rect.left, e.clientY - rect.top)
  // })

  animate()
}

PIXI.loader
    .add('rock_diffuse', 'assets/rock.png')
    .add('rock_normal', 'assets/rock_normal.png')
    .load(onLoad)
