function arrayToMap(array) {
  const map = []

  array.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        map.push({ x, y, passable: true })
      }
    })
  })

  return map
}

export default arrayToMap
