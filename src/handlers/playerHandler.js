import setupInputHandler from '../utils/input'

function handler() {
  const inputHandler = setupInputHandler()

  return () => inputHandler()
}

export default handler
