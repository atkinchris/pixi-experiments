import LightWithAmbient from '../light/LightWithAmbient'
import fragSrc from './directional.frag'

export default class DirectionalLight extends LightWithAmbient {
  constructor(options = {}) {
    super(options)

    this.target = options.target || {
      x: 0,
      y: 0,
    }

    if (!('z' in this.target)) {
      this.target.z = 10
    }

    this.directionArray = new Float32Array(3)
    this.updateDirection()

    this.shaderName = 'directionalLightShader'
  }

  getFragmentSource() {
    return fragSrc
  }

  updateDirection() {
    const arr = this.directionArray
    const tx = this.target.x
    const ty = this.target.y
    const tz = this.target.z

    arr[0] = this.position.x - tx
    arr[1] = this.position.y - ty
    arr[2] = this.position.z - tz
  }

  syncShader(sprite) {
    super.syncShader(sprite)

    this.shader.uniforms.uLightDirection = this.directionArray
  }
}
