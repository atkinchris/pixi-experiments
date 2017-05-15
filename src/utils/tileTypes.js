/* eslint-disable quote-props */

// NORTH EAST SOUTH WEST
// UP LEFT DOWN RIGHT

const tileTypes = {
  '1111': 'fourway',
  '0101': 'straight-1',
  '1010': 'straight-2',
  '1101': 'tjunction-1',
  '1110': 'tjunction-2',
  '0111': 'tjunction-3',
  '1011': 'tjunction-4',
  '0110': 'corner-1',
  '0011': 'corner-2',
  '1001': 'corner-3',
  '1100': 'corner-4',
}

export default tileTypes
