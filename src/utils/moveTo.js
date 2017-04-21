import interpolate from './interpolate'

function moveTo(current, target, distance) {
  const { value: x } = interpolate(current.x, target.x, distance)
  const { value: y } = interpolate(current.y, target.y, distance)

  return { x, y, remaining: 0 }
}

export default moveTo
