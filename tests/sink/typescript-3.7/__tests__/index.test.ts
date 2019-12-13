import { f, OptChainType } from '../index'

describe('optional chaining and nullish coalesing', () => {
  it('returns Infinity if any of the paths of OptChainType is undefined', () => {
    const optChainObject: OptChainType = {
      a: {}
    }
    expect(f(optChainObject)).toEqual(Infinity)
  })
  it('returns a.b.c if all of the paths of OptChainType is defined', () => {
    const optChainObject: OptChainType = {
      a: {
        b: {
          c: 0
        }
      }
    }
    expect(f(optChainObject)).toEqual(optChainObject.a!.b!.c)
  })
})