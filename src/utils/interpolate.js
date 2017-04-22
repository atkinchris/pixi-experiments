function interpolate(current, target, distance) {
  if (current === target) {
    return { value: current, remaining: distance }
  }

  const direction = current < target ? 1 : -1
  const next = current + (distance * direction)
  const remaining = (next - target) * direction

  return {
    value: remaining > 0 ? target : next,
    remaining: remaining > 0 ? remaining : 0,
  }
}

export default interpolate
