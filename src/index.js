import 'pixi.js'
import shader from './shader.frag'

const { WebGLRenderer, Container, loader, Sprite } = PIXI
const { innerWidth, innerHeight } = window

const renderer = new WebGLRenderer(innerWidth, innerHeight, { backgroundColor: 0x1099bb })
document.body.appendChild(renderer.view)

const stage = new Container()
const uniforms = {
  mouse: { type: 'v2', value: { x: 0, y: 0 } },
  time: { type: 'f', value: 0 },
  resolution: { type: 'v2', value: { x: innerWidth, y: innerHeight } },
}
const simpleShader = new PIXI.Filter('', shader, uniforms)

loader.baseUrl = 'assets'
loader.add('road', 'road.png')

loader.load((ldr, resources) => {
  const road = new Sprite(resources.road.texture)

  road.filters = [simpleShader]
  road.x = renderer.width / 2
  road.y = renderer.height / 2
  road.anchor.x = 0.5
  road.anchor.y = 0.5

  stage.addChild(road)
})

function animate() {
  requestAnimationFrame(animate)
  renderer.render(stage)
  simpleShader.uniforms.time += 0.1
}
animate()

document.onmousemove = function (evt) {
  simpleShader.uniforms.mouse.x = evt.clientX
  simpleShader.uniforms.mouse.y = evt.clientY
}
