import interpolate from './interpolate'

function moveTo(current, target, distance) {
  const x = interpolate(current.x, target.x, distance)
  const y = interpolate(current.y, target.y, distance)

  return {
    x: x.value,
    y: y.value,
    reached: x.reached && y.reached,
    distance: {
      x: x.remaining,
      y: y.remaining,
    },
  }
}

export default moveTo
