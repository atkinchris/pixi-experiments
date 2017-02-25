import glslify from 'glslify'
import Light from '../light/Light'

const { BLEND_MODES } = PIXI

export default class AmbientLight extends Light {
  constructor(options = {}) {
    super(options)

    this.position.x = 0
    this.position.y = 0
    this.position.z = 0

    // x + y * D + z * D * D
    this.falloff = new Float32Array([1, 0, 0])

    this.blendMode = BLEND_MODES.NORMAL

    this.shaderName = 'ambientLightShader'
  }

  getVertexSource() {
    const vertexSrc = glslify('./ambient.vert')

    return vertexSrc
  }

  getFragmentSource() {
    const fragmentSrc = glslify('./ambient.frag')

    return fragmentSrc
  }
}
