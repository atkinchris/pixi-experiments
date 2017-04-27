/* eslint-disable quote-props */

// NORTH EAST SOUTH WEST
// UP LEFT DOWN RIGHT

const tileTypes = {
  '1111': { tile: 'fourway' },
  '0101': { tile: 'straight-1' },
  '1010': { tile: 'straight-2' },
  '1101': { tile: 'tjunction-1' },
  '1110': { tile: 'tjunction-2' },
  '0111': { tile: 'tjunction-3' },
  '1011': { tile: 'tjunction-4' },
  '0110': { tile: 'corner-1' },
  '0011': { tile: 'corner-2' },
  '1001': { tile: 'corner-3' },
  '1100': { tile: 'corner-4' },
}

export default tileTypes
