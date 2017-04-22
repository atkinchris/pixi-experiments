const TEST_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
const SIZE = 32

function createTileMap(map = TEST_MAP, size = SIZE) {
  const height = map.length
  const width = map[0].length

  const getTile = (x, y) => {
    if (x < 0 || y < 0 || x > width - 1 || y > height - 1) {
      return { passable: false }
    }

    return {
      passable: map[y][x] === 0,
      x,
      y,
      worldX: x * size,
      worldY: y * size,
    }
  }

  const getAdjacentTile = (target, direction) => {
    const x = target.x + direction.x
    const y = target.y + direction.y

    return getTile(x, y)
  }

  const getTileAtCoordinates = (coordinates) => {
    const x = Math.round(coordinates.x / size)
    const y = Math.round(coordinates.y / size)

    return getTile(x, y)
  }

  const forEach = (action) => {
    map.forEach((row, y) => {
      row.forEach((tile, x) => action(x, y, tile, size))
    })
  }

  return {
    forEach,
    getAdjacentTile,
    getTileAtCoordinates,
  }
}

export default createTileMap
