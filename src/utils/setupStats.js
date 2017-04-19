import Stats from 'stats.js'

export default () => {
  const stats = new Stats()
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'
  document.body.appendChild(stats.domElement)

  return stats
}
