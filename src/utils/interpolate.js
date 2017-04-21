function interpolate(current, target, distance) {
  let direction = 0

  if (current !== target) {
    direction = current < target ? 1 : -1
  }

  const next = current + (distance * direction)
  const remaining = (next - target) * direction

  return {
    value: remaining > 0 ? target : next,
    remaining: remaining > 0 ? remaining : 0,
  }
}

export default interpolate
