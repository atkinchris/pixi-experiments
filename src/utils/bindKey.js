function bindKey(keyCode, onDown, onUp) {
  let isDown = false

  const downHandler = (event) => {
    if (event.keyCode === keyCode) {
      if (!isDown && onDown) onDown()
      isDown = true
    }
    event.preventDefault()
  }

  const upHandler = (event) => {
    if (event.keyCode === keyCode) {
      if (isDown && onUp) onUp()
      isDown = false
    }
    event.preventDefault()
  }

  window.addEventListener('keydown', downHandler, false)
  window.addEventListener('keyup', upHandler, false)
}

export default bindKey
