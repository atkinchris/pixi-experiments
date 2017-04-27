const SIZE = 64
const ORIGIN = 0.5

function worldToMap({ x, y }) {
  return {
    x: Math.round((x / SIZE) - ORIGIN),
    y: Math.round((y / SIZE) - ORIGIN),
  }
}

function mapToWorld({ x, y }) {
  return {
    x: (x + ORIGIN) * SIZE,
    y: (y + ORIGIN) * SIZE,
  }
}

export {
  worldToMap,
  mapToWorld,
}
