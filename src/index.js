import 'pixi.js'
import shader from './shader.frag'

const app = new PIXI.Application(1200, 800, { backgroundColor: 0x1099bb })

document.body.appendChild(app.view)

const { loader, Sprite } = PIXI

loader.baseUrl = 'assets'
loader.add('road', 'road.png')

console.log(shader)

loader.load((ldr, resources) => {
  const road = new Sprite(resources.road.texture)
  const simpleShader = new PIXI.AbstractFilter('', shader)

  road.filters = [simpleShader]
  road.x = app.renderer.width / 2
  road.y = app.renderer.height / 2
  road.anchor.x = 0.5
  road.anchor.y = 0.5

  app.stage.addChild(road)
})

function animate() {
  requestAnimationFrame(animate)
  app.render(app.stage)
}
animate()
