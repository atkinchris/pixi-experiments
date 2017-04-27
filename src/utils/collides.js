const toSides = rect => ({
  left: rect.x - (rect.width / 2),
  right: rect.x + (rect.width / 2),
  top: rect.y - (rect.height / 2),
  bottom: rect.y + (rect.height / 2),
})

function collides(a, b) {
  const rectA = toSides(a)
  const rectB = toSides(b)

  return !(
    rectA.bottom < rectB.top ||
    rectB.bottom < rectA.top ||
    rectA.right < rectB.left ||
    rectB.right < rectB.left
  )
}

export default collides
