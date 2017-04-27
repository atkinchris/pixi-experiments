import { worldToMap, mapToWorld } from '../coordinates'

describe('coordinates', () => {
  it('converts world coordinates to nearest map coordinates', () => {
    expect(worldToMap({ x: 64, y: 64 })).toEqual({ x: 1, y: 1 })
    expect(worldToMap({ x: 128, y: 128 })).toEqual({ x: 2, y: 2 })
    expect(worldToMap({ x: 96, y: 24 })).toEqual({ x: 1, y: -0 })
    expect(worldToMap({ x: 0, y: 0 })).toEqual({ x: -0, y: -0 })
  })

  it('converts map coordinates to world coordinates', () => {
    expect(mapToWorld({ x: 1, y: 1 })).toEqual({ x: 96, y: 96 })
    expect(mapToWorld({ x: 2, y: 1 })).toEqual({ x: 160, y: 96 })
    expect(mapToWorld({ x: 1, y: 6 })).toEqual({ x: 96, y: 416 })
    expect(mapToWorld({ x: 0, y: 0 })).toEqual({ x: 32, y: 32 })
  })
})
