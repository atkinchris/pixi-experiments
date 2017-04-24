import { worldToMap, mapToWorld } from '../coordinates'

describe('coordinates', () => {
  it('converts world coordinates to nearest map coordinates', () => {
    expect(worldToMap({ x: 32, y: 32 })).toEqual({ x: 1, y: 1 })
    expect(worldToMap({ x: 64, y: 64 })).toEqual({ x: 2, y: 2 })
    expect(worldToMap({ x: 48, y: 12 })).toEqual({ x: 1, y: -0 })
    expect(worldToMap({ x: 0, y: 0 })).toEqual({ x: -0, y: -0 })
  })

  it('converts map coordinates to world coordinates', () => {
    expect(mapToWorld({ x: 1, y: 1 })).toEqual({ x: 48, y: 48 })
    expect(mapToWorld({ x: 2, y: 1 })).toEqual({ x: 80, y: 48 })
    expect(mapToWorld({ x: 1, y: 6 })).toEqual({ x: 48, y: 208 })
    expect(mapToWorld({ x: 0, y: 0 })).toEqual({ x: 16, y: 16 })
  })
})
