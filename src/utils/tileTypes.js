/* eslint-disable quote-props */

// NORTH EAST SOUTH WEST
// UP LEFT DOWN RIGHT

const tileTypes = {
  '1111': { tile: 'fourway', rotation: 0 },
  '0101': { tile: 'straight', rotation: 0 },
  '1010': { tile: 'straight', rotation: 90 },
  '0111': { tile: 'tjunction', rotation: 0 },
  '1110': { tile: 'tjunction', rotation: 90 },
  '1101': { tile: 'tjunction', rotation: 180 },
  '1011': { tile: 'tjunction', rotation: 270 },
  '0110': { tile: 'corner', rotation: 0 },
  '1100': { tile: 'corner', rotation: 90 },
  '1001': { tile: 'corner', rotation: 180 },
  '0011': { tile: 'corner', rotation: 270 },
}

export default tileTypes
