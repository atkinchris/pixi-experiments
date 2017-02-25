precision mediump float;

uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;

void main(){
  gl_FragColor = vec4(sin(time), mouse.x/resolution.x, mouse.y/resolution.y, 1.0);
}
